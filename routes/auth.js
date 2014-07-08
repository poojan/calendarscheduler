'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var models = require('../models');

passport.use(new LocalStrategy(
  function (username, password, done) {
    models.User.findOne({ username: username, password: password }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  models.User.findById(id, function (err, user) {
    done(null, user);
  });
});

var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res) {
  //res.render('index', { title: 'Auth' });
//});

//router.post('/login', passport.authenticate('local', {
  //successRedirect: '/..',
  //failureRedirect: '/login'
//}));

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user) {

    if (err) { return next(err); }
    if (!user) { return res.send(400); }

    req.logIn(user, function(err) {
      if (err) { return next(err); }

      if (req.body.rememberme) { req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7; }
      res.json(200, { "role": user.role, "username": user.username });
    });
  })(req, res, next);
});

router.post('/logout', function (req, res) {
  req.logout();
  res.send(200);
});

router.post('/register', function (req, res) {
  //var newUser = new models.User(req.body);
  var newUser = new models.User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  newUser.save(function (err, newUser, numberAffected) {
    if (err) { return res.json(err); }
    return res.redirect('/');
    //return res.send(200);
  });
});


module.exports = router;
