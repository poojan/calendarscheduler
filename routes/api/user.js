'use strict';

var express = require('express');
var router = express.Router();

var models = require('../../models');

/* GET users listing. */
router.get('/', function(req, res) {
  var fields = '_id username team';
  models.User.find({}, fields).exec().then(function (users) {
    res.json(users);
  });
});

router.post('/', function (req, res) {
  var newUser = new models.User(req.body);

  newUser.save(function (err, newUser, numberAffected) {
    if (err) { return res.json(err); }
    return res.send(200);
  });
});

router.get('/:id', function (req, res) {
  var fields = '_id username team';
  var userId = req.params.id;
  var user = models.User.findById(userId, fields).exec()
    .then(function (err, user) {
      if (err) { return res.send(err); }
      if (!user) { return res.send(204); }

      return res.send(user);
    });
});

router.put('/:id', function (req, res) {
  var userId = req.params.id;
  models.User.update({ _id: userId }, req.body, { multi: false }, function (err, numberAffected, raw) {
    if (!numberAffected) { return res.send(204); }
    if (err) { return res.send(err); }

    return res.send(200);
  });
});

router.delete('/:id', function (req, res) {
  var userId = req.params.id;
  models.User.remove({ _id: userId }, function (err, user) {
    if (err) { return res.send(err); }
    if (!user) { return res.send(204); }

    return res.send(200);
  });
});


router.get('/:id/team', function (req, res) {
  var team = models.User.getTeam(req.params.id);
  return res.send(team);
});

router.post('/:id/team', function (req, res) {
  var userId = req.params.id;
  var teacherId = req.body.teacherId;

  models.User.update({ _id: userId }, { $addToSet: { team: { _id: teacherId } } }, { multi: false }, function (err, numberAffected, raw) {
    if (!numberAffected) { return res.send(204); }
    if (err) { return res.send(err); }

    return res.send(200);
  });
});

router.delete('/:id/team', function (req, res) {
  var userId = req.params.id;
  var teacherId = req.body.teacherId;

  //models.User.update({ _id: userId }, { $unset: { team: { _id: teacherId } } }, { multi: false }, function (err, numberAffected, raw) {
  models.User.update({ _id: userId }, { $pull: { team: { _id: teacherId } } }, { multi: false }, function (err, numberAffected, raw) {
    if (!numberAffected) { return res.send(204); }
    if (err) { return res.send(err); }

    return res.send(200);
  });
});

module.exports = router;
