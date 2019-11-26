var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cors = require('cors');
var redis = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var client = redis.createClient();

var authRouter = require('./routes/authentication');
var booksRouter = require('./routes/books');
var genresRouter = require('./routes/genres');
var userRouter = require('./routes/users');
var reviewRouter = require('./routes/review');

var USERS = require('./models/user.model');

var app = express();

//DB CONNECTION
var url = "mongodb://localhost:27017/bookstore";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  } else {
    next();
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Redis Setup
app.use(session({
  secret: config.redisSecret,
  // create new redis store.
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: (60000 * 24 * 30) }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: (60000 * 24 * 30)
  }
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, done) {
  USERS.findById(id, function (err, user) {
    done(err, user);
  });
});

// Passport local strategy to authenticate user
passport.use(new LocalStrategy(
  function (username, password, done) {
    USERS.findOne({
      name: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

// Middleware
var redisAuthorizationMiddleware = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    return res.json({status: false, message: "You are not logged in, please login and try again"});
  }
}

app.use('/', authRouter);
app.use('/books', redisAuthorizationMiddleware, booksRouter);
app.use('/genres', redisAuthorizationMiddleware, genresRouter);
app.use('/users', redisAuthorizationMiddleware, userRouter);
app.use('/review', redisAuthorizationMiddleware, reviewRouter);

module.exports = app;
