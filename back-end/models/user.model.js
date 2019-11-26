'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client'
  },
  name: {
    type: String
  },
  password: {
    type: String,
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;