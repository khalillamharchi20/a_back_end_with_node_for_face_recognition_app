"use strict";

var _require = require("express"),
    request = _require.request,
    response = _require.response;

var bodyParser = require('body-parser');

var express = require("express");

var app = express();

var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
var database = {
  users: [{
    id: 1,
    name: "john",
    email: "john@gmail.com",
    password: "password",
    entries: 0,
    joined: new Date()
  }, {
    id: 2,
    name: "khalil",
    email: "khalil@gmail.com",
    password: "password",
    entries: 0,
    joined: new Date()
  }]
};
app.get('/', function (request, response) {
  response.send(database.users);
});
app.post('/signin', function (request, response) {
  var temoin = false;
  var index = 0;

  for (var k = 0; k < database.users.length; k++) {
    if (request.body.email === database.users[k].email && request.body.password === database.users[k].password) {
      temoin = true;
      index = k;
    }
  }

  if (temoin === true) {
    response.json(database.users[index]);
  } else {
    response.json('failed');
  }
});
app.post('/register', function (request, response) {
  var _request$body = request.body,
      password = _request$body.password,
      email = _request$body.email,
      name = _request$body.name;
  var temoin = true;

  for (var k = 0; k < database.users.length; k++) {
    if (email === database.users[k].email) {
      temoin = false;
    }
  }

  if (name === '' || email === '' || password === '') {
    return response.json("empty shamps is not allowed");
  }

  if (temoin === true) {
    var user = {
      id: database.users[database.users.length - 1].id + 1,
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    };
    database.users.push({
      id: database.users[database.users.length - 1].id + 1,
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    });
    response.json(user);
  } else {
    response.json('email already in use');
  }
});
app.get('/register', function (request, response) {
  response.json(database);
});
app.get('/profile/:id', function (request, response) {
  var id = request.params.id;
  var temoin = false;
  database.users.forEach(function (user) {
    if (user.id == id) {
      temoin = true;
      return response.json(user);
    }
  });

  if (temoin === false) {
    response.status(404).json("user not found");
  }
});
app.put('/image', function (request, response) {
  var id = request.body.id;
  var temoin = false;
  database.users.forEach(function (user) {
    if (user.id == id) {
      temoin = true;
      user.entries = user.entries + 1;
      response.json(user);
    }
  });

  if (temoin === false) {
    response.status(404).json("user not found");
  }
});
app.listen(3000, function () {
  console.log("app is runing");
});