'use strict';

var express = require('express');
var router = express.Router();

var models = require('../../models');

/* GET teachers listing. */
router.get('/', function(req, res) {
  var fields = '_id name sex dob info image availability';
  models.Teacher.find({}, fields).exec().then(function (teachers) {
    res.json(teachers);
  });
});

router.post('/', function (req, res) {
  var name = req.body.name;
  var sex = req.body.sex;
  var dob = req.body.dob;
  var info = req.body.info;
  var image = req.body.image;
  var availability = req.body.availability;

  var newTeacher = new models.Teacher({
    'name': name,
    'sex': sex,
    'dob': dob,
    'info': info,
    'image': image,
    'availability': availability
  });

  newTeacher.save(function (err, newTeacher, numberAffected) {
    if (err) { return res.json(err); }
    return res.send(200);
  });
});

router.get('/:id', function (req, res) {
  var fields = '_id name sex dob info image availability';
  var teacherId = req.params.id;
  var teacher = models.Teacher.findOne(teacherId, fields).exec()
    .then(function (err, teacher) {
      if (err) { return res.send(err); }
      if (!teacher) { return res.send(204); }

      return res.send(teacher);
    });
});

router.put('/:id', function (req, res) {
  var teacherId = req.params.id;
  models.Teacher.update({ _id: teacherId }, req.body, { multi: false }, function (err, numberAffected, raw) {
    if (!numberAffected) { return res.send(204); }
    if (err) { return res.send(err); }

    return res.send(200);
  });
});

router.delete('/:id', function (req, res) {
  var teacherId = req.params.id;
  models.Teacher.remove({ _id: teacherId }, function (err, teacher) {
    if (err) { return res.send(err); }
    if (!teacher) { return res.send(204); }

    return res.send(200);
  });
});

module.exports = router;
