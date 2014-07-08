'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();

var userRoles = require('../views/js/routingConfig').userRoles;

var models = require('../models');

/* GET home page. */
/*
router.get('/', function(req, res) {
  if (!req.user) { return res.redirect('/login'); }

  var username = req.user ? req.user.username : '';

  var teachers = models.Teacher.getAll();

  var team = models.User.getTeam(req.user._id);

  res.render('index', {
    user: req.user,
    username: username,
    title: 'Express',
    teachers: teachers,
    team: team
  });
});
*/

router.get('/partials/*', function (req, res) {
  var requestedView = path.join('./', req.url);
  res.render(requestedView);
});

router.get('/templates/*', function (req, res) {
  var requestedView = path.join('./', req.url);
  res.render(requestedView);
});


router.get('/', function (req, res) {
  var username = req.user ? req.user.username : '';
  console.log('username', username);
  res.render('index', {
    username: username
  });
});

//router.get('/book', function(req, res) {
  //if (!req.user) { res.redirect('/login'); }

  //var username = req.user ? req.user.username : '';

  ////var teachers = models.Teacher.getAll();
  //var teachers = models.User.getTeam(req.user._id);

  //res.render('book', { username: username, title: 'Express', teachers: teachers });
//});

//router.get('/note', function(req, res) {
  //if (!req.user) { res.redirect('/login'); }
  //var username = req.user ? req.user.username : '';
  //res.render('note', { username: username });
//});

//router.get('/chat', function(req, res) {
  //if (!req.user) { res.redirect('/login'); }
  //var username = req.user ? req.user.username : '';
  //res.render('chat', { username: username });
//});

//router.get('/faq', function(req, res) {
  //if (!req.user) { res.redirect('/login'); }
  //var username = req.user ? req.user.username : '';
  //res.render('faq', { username: username });
//});

router.get('/fixtures/:cmd', function(req, res) {
  var cmd = req.params.cmd;
  if (cmd === 'reset' || cmd == 'remove') {
    var exec = require('child_process').exec;
    exec('./node_modules/mongoose-fixture/bin/mongoose-fixture --fixture="all" --' + cmd, function (error, stdout, stderr) {
      return res.send(stderr);
    });
  } else {
    res.redirect('/');
  }
});

router.get('/*', function (req, res) {
  //var role = userRoles.public, username = '';
  //if (req.user) {
    //role = req.user.role;
    //username = req.user.username;
  //}
  //res.cookie('user', JSON.stringify({
    //'username': username,
    //'role': role
  //}));
  res.render('index');
});

module.exports = router;
