'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  genreId: {
    type: String,
  },
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;