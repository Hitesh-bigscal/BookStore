var express = require('express');
var router = express.Router();
var REVIEW = require('../models/review.model');
var RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ({ host: "127.0.0.1", port: 6379, ns: "rsmq" });

// Provide list of all reviews of perticular book
router.get('/:id', function (req, res, next) {
  var bookId = req.params.id;
  REVIEW.find({
    bookId: bookId,
  }, (err, reviewsList) => {
    if (err) {
      return res.json({ status: false, message: "something went wrong while fetching all books" });
    }
    return res.json({ status: true, data: reviewsList });
  });
});

// Save reviews of perticular book
router.post('/', function (req, res, next) {
  var review = new REVIEW({
    rating: req.body.rating,
    description: req.body.description,
    userId: req.body.userId,
    bookId: req.body.bookId
  });

  review.save(function (err, newReview) {
    if (err)
      return res.json({ status: false, message: "something went wrong while adding review" });

    return res.json({ status: true, data: newReview });

  });
});

module.exports = router;

