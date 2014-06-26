'use strict';

var express = require('express');
var router = express.Router();

var models = require('../models');

/* GET home page. */
router.get('/', function(req, res) {
  if (!req.user) { return res.redirect('/login'); }

  var username = req.user ? req.user.username : '';

  var teachers = models.Teacher.getAll();

  var teamIds = req.user.team;
  var team = models.User.getTeam(teamIds);

  res.render('index', {
    username: username,
    title: 'Express',
    teachers: teachers,
    team: team
  });
});

router.get('/book', function(req, res) {
  if (!req.user) { res.redirect('/login'); }

  var username = req.user ? req.user.username : '';

  var teachers = models.Teacher.getAll();
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

module.exports = router;
