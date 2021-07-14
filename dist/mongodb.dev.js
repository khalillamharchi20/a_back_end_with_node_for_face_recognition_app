"use strict";

var mongoose = require('mongoose');

var schema = mongoose.Schema;
var userschema = new schema({
  _id: {
    type: Number
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  entries: {
    type: Number
  },
  joined: {
    type: String
  }
});