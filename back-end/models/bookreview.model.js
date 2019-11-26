'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookReviewSchema = new Schema({
  user: {
    type: String,
  },
  rating: {
    type: String
  },
  status: {
    type: String,
    enum: ['Submitted', 'Accepted', 'Rejected'],
    default: 'Submitted'
  },
  description: {
    type: String,
  }
});

var Bookreview = mongoose.model('Bookreview', BookReviewSchema);

module.exports = Bookreview;