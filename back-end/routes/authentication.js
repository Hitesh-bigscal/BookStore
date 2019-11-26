var express = require('express');
var router = express.Router();
var USERS = require('../models/user.model');
var passport = require('passport');


//  Render login page
router.get('/login', function (req, res, next) {
  res.render("login");
});


router.post('/login', passport.authenticate('local', { failWithError: true }), function (req, res, next) {
  // PASSPORT VALIDATION SUCCESS    
  req.session.user = req.user;
  res.send({ status: true, data: req.user });
},
  function (err, req, res, next) {
    // PASSPORT VALIDATION FAILURE
    return res.json(err);
  }
);

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.json({ status: false, message: "Error while destroying session" });
    } else {
      return res.json({ status: true, message: "User logged out successfully" });
    }
  });
})
module.exports = router;
