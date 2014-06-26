'use strict';

var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
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

router.get('/book', function(req, res) {
  if (!req.user) { res.redirect('/login'); }

  var username = req.user ? req.user.username : '';

  //var teachers = models.Teacher.getAll();
  var teachers = models.User.getTeam(req.user._id);

  res.render('book', { username: username, title: 'Express', teachers: teachers });
});

router.get('/note', function(req, res) {
  if (!req.user) { res.redirect('/login'); }
  var username = req.user ? req.user.username : '';
  res.render('note', { username: username });
});

router.get('/chat', function(req, res) {
  if (!req.user) { res.redirect('/login'); }
  var username = req.user ? req.user.username : '';
  res.render('chat', { username: username });
});

router.get('/faq', function(req, res) {
  if (!req.user) { res.redirect('/login'); }
  var username = req.user ? req.user.username : '';
  res.render('faq', { username: username });
});

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

module.exports = router;
