'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({

  rating: {
    type: Number
  },

  status: {
    type: String,
    default: "Submitted"
  },

  description: {
    type: String
  },

  userId: {
    type: String
  },

  bookId: {
    type: String
  },

});

var Review = mongoose.model('REVIEW', ReviewSchema);

module.exports = Review;