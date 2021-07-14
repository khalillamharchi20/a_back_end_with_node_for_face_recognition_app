"use strict";

var user = require('./mongodb.js');

var mongoose = require('mongoose');

function main() {
  var url, con;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "mongodb+srv://khalil:realmadrid1999@cluster0.1jhnu.mongodb.net/khalil?retryWrites=true&w=majority";
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          con = _context.sent;

          if (con) {
            console.log('conected');
          } else {
            console.log("error");
          }

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

var list = function list(req, res, next) {
  var li;
  return regeneratorRuntime.async(function list$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          main();
          _context2.next = 3;
          return regeneratorRuntime.awrap(user.find());

        case 3:
          li = _context2.sent;

          if (li) {
            li.json();
          } else {
            console.log("error");
          }

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  list: list
};