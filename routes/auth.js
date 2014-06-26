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
router.get('/', function(req, res) {
  res.render('index', { title: 'Auth' });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/..',
  failureRedirect: '/login'
}));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/..');
});

router.post('/register', function (req, res) {
  var newUser = new models.User(req.body);

  newUser.save(function (err, newUser, numberAffected) {
    if (err) { return res.json(err); }
    return res.send(200);
  });
});


module.exports = router;
