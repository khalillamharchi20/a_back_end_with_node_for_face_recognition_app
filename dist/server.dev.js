"use strict";

var _require = require("express"),
    request = _require.request,
    response = _require.response;

var bodyParser = require('body-parser');

var express = require("express");

var app = express();

var cors = require('cors');

var bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(cors());

var knex = require('knex');

var db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'realmadrid1999;;',
    database: 'khalil'
  }
});
app.get('/', function (request, response) {
  db.select('*').from('users').then(function (data) {
    response.json(data);
  })["catch"](function (err) {
    response.status(404).json("error");
  });
});
app.post('/signin', function (request, response) {
  db.select('email', 'hash').from('login').where('email', '=', request.body.email).then(function (data) {
    if (request.body.password === data[0].hash) {
      db.select('*').from('users').where('email', '=', request.body.email).then(function (user) {
        response.json(user);
      })["catch"](function (err) {
        response.status(404).json('failed');
      });
    }
  });
});
app.post('/register', function (request, response) {
  var _request$body = request.body,
      password = _request$body.password,
      email = _request$body.email,
      name = _request$body.name;
  var temoin = true;

  if (name === '' || email === '' || password === '') {
    return response.json("empty shamps is not allowed");
  }

  if (temoin === true) {
    db.transaction(function (trx) {
      trx.insert({
        hash: password,
        email: email
      }).into('login').returning('email').then(function (e) {
        return trx('users').returning('*').insert({
          email: e[0],
          name: name,
          joined: new Date()
        }).then(function (resp) {
          response.json(resp[0]);
          console.log(resp);
        });
      }).then(trx.commit)["catch"](trx.rollback);
    })["catch"](function (err) {
      response.json('email already in use');
    });
  }
});
app.put('/image', function (request, response) {
  var id = request.body.id;
  db('users').where('id', id).increment('entries', 1).then(function (resp) {
    console.log(resp);
  })["catch"](function (err) {
    response.status(404).json("user not found");
  });
});
app.listen(3000, function () {
  console.log("app is runing");
});