'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookGenreSchema = new Schema({
  name: {
    type: String
  }
});

var Bookgenre = mongoose.model('Bookgenre', BookGenreSchema);

module.exports = Bookgenre;