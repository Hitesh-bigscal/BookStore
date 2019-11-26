var express = require('express');
var router = express.Router();
var BOOKS = require('../models/books.model');

//Provide list of alll the books in database
router.get('/', function (req, res, next) {
  BOOKS.find({}, (err, booksList) => {
    if (err) {
      return res.json({ status: false, message: "something went wrong while fetching all books" });
    }

    return res.json({ status: true, data: booksList });
  });
});



// Fetch individual according to id
router.get('/:id', function (req, res, next) {
  var bookId = req.params.id;
  BOOKS.find({ _id: bookId }, (err, book) => {
    if (err) {
      return res.json({ status: false, message: "something went wrong while fetching all books" });
    }

    return res.json({ status: true, data: book });
  });
});



// Update book according to id
router.put('/:id', function (req, res, next) {
  var bookId = req.params.id;
  BOOKS.updateOne({ _id: bookId }, {
    name: req.body.name,
    description: req.body.description,
    genreId: req.body.genreId
  }, function (err, result) {
    if (err) return res.json({ status: false, message: "something went wrong while updating book" });

    return res.json({ status: true, data: result });
  })
});


router.post('/', function (req, res, next) {
  // Validation
  var mybook = new BOOKS({
    name: req.body.name,
    description: req.body.description,
    genreId: req.body.genreId
  });

  mybook.save(function (err, newBook) {
    if (err)
      return res.json({ status: false, message: "something went wrong while adding book" });

    return res.json({ status: true, data: newBook });
  });
});


router.delete('/:id', function (req, res, next) {
  var bookId = req.params.id;

  BOOKS.remove({ _id: bookId }, function (err, result) {
    if (err)
      return res.json({ status: false, message: "something went wrong while deleting book" });

    return res.json({ status: true, data: 'Book Deleted Successfully' });
  })
});

module.exports = router;
