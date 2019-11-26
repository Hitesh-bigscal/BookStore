var mongoose = require('mongoose')
var books = require('./models/books.model')
var users = require('./models/user.model')
var genere = require('./models/bookgenre.model')
var review = require('./models/bookreview.model')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/bookstore";

mongoose.connect(url, function (err, db) {
    if (err) throw err;
});

// Seeds

var mybook = new books({
    name: 'Book 1',
    description: 'My first book',
    genreId: 'A'
});
mybook.save(function (err, newBook) {
    if (err) throw err;
});

var user = new users({
    role: "admin",
    name: 'hitesh',
    password: 'test123@'
});
user.save(function (err, newUser) {
    if (err) throw err;
});


