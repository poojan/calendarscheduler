'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
//router.get('/register', function(req, res) {
  //res.send('respond with a resource');
//});

//module.exports = router;

var register = function (req, res) {
  res.render('register');
};

var login = function (req, res) {
  res.render('login');
};

exports.register = register;
exports.login = login;
