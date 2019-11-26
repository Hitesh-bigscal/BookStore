var express = require('express');
var router = express.Router();
var USERS = require('../models/user.model');

/* GET users listing. */
router.get('/', function (req, res, next) {
  USERS.find({}, (err, userList) => {
    if (err) {
      return res.json({ status: false, message: "something went wrong while fetching all users" });
    }

    return res.json({ status: true, data: userList });
  });
});

router.post('/', function (req, res, next) {
  USERS.findOne({ name: req.body.name }, function (err, existuser) {
    if (err) {
      return res.json({ status: false, message: "something went wrong while adding new users" })
    } else if (existuser) {
      return res.json({ status: false, message: "User name already exist" });
    } else {
      var newUser = new USERS({
        name: req.body.name,
        password: req.body.password
      });

      newUser.save(function (err, user) {
        if (err)
          return res.json({ status: false, message: "something went wrong while adding user" });

        return res.json({ status: true, data: user });
      });
    }
  })
});

module.exports = router;
