var express = require('express');
var router = express.Router();
var GENRES = require('../models/bookgenre.model');
var BOOKS = require('./../models/books.model');

//Provide list of alll the genres in database
router.get('/', function (req, res, next) {
  GENRES.find({}, (err, genresList) => {
    if (err) {
      return res.json({ status: false, message: "something went wrong while fetching all genres" });
    }

    return res.json({ status: true, data: genresList });
  });
});



// Fetch individual according to id
router.get('/:id', function (req, res, next) {
  var genresId = req.params.id;
  GENRES.find({ _id: genresId }, (err, genres) => {
    if (err) {
      return res.json({ status: false, message: "something went wrong while fetching all genres" });
    }

    return res.json({ status: true, data: genres });
  });
});

router.get('/books/:id', function (req, res, next) {
  var genresId = req.params.id;
  BOOKS.find({ genreId: genresId }, (err, booksList) => {
    if (err) {
      return res.json({ status: false, message: "something went wrong while fetching all booksList" });
    }

    return res.json({ status: true, data: booksList });
  });
});

// Update genres according to id
router.put('/:id', function (req, res, next) {
  var genresId = req.params.id;

  GENRES.update({ _id: genresId }, {
    name: req.body.name,
  }, function (err, result) {
    if (err) throw err;

    return res.json({ status: true, data: result });
  })
});

//Add new genres
router.post('/', function (req, res, next) {
  var mygenres = new GENRES({
    name: req.body.name
  });

  mygenres.save(function (err, newGenre) {
    if (err)
      return res.json({ status: false, message: "something went wrong while adding book" + err });

    return res.json({ status: true, data: newGenre });
  });
});

// Delete genres
router.delete('/:id', function (req, res, next) {
  var genresId = req.params.id;

  GENRES.remove({ _id: genresId }, function (err, result) {
    if (err)
      return res.json({ status: false, message: "something went wrong while deleting genre" });
    return res.json({ status: true, data: 'Genres Deleted Successfully' });
  })
});

module.exports = router;
