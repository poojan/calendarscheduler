'use strict';

var express = require('express');
var router = express.Router();

var models = require('../../models');

/* GET teachers listing. */
router.get('/', function(req, res) {
  var filterTimeFrom = req.param('from');
  var filterTimeTo = req.param('to');
  var filterSex = req.param('sex');
  var filterAge = req.param('age');
  var filterWeekday = req.param('day');
  var filterExpertise = req.param('expertise');

  var fields = '_id name sex dob age info image availability expertise';

  var filter = {};
  filter.$and = [];

  if (filterSex) {
    filter.$and.push({ 'sex': filterSex });
  }

  if (filterAge) {
    filterAge = filterAge * 1;
    filter.$and.push({'age': {'$gte': filterAge}});
    filter.$and.push({'age': {'$lt': filterAge + 10 }});
  }
  if (filterWeekday) {
    filter.$and.push({'availability.day': filterWeekday });
    if (filterTimeFrom) {
      filter.$and.push({'availability.slots.timeFrom': { '$gte': filterTimeFrom }});
    }
    if (filterTimeTo) {
      filter.$and.push({'availability.slots.timeTo': { '$lt': filterTimeTo }});
    }
  }

  if (filterExpertise) {
    filter.$and.push({ 'expertise': filterExpertise });
  }

  if (!filter.$and.length) {
    console.log('no filters');
    filter = {};
  }
  //console.log('test', filter);
  models.Teacher.find(filter, fields).exec().then(function (teachers) {
    res.json(teachers);
  });
});

router.post('/', function (req, res) {
  var name = req.body.name;
  var sex = req.body.sex;
  var dob = req.body.dob;
  var info = req.body.info;
  var image = req.body.image;
  var expertise = req.body.expertise;
  var availability = req.body.availability;

  var newTeacher = new models.Teacher({
    'name': name,
    'sex': sex,
    'dob': dob,
    'info': info,
    'image': image,
    'availability': availability,
    'expertise': expertise
  });

  newTeacher.save(function (err, newTeacher, numberAffected) {
    if (err) { return res.json(err); }
    return res.send(200);
  });
});

router.get('/:id', function (req, res) {
  var fields = '_id name sex dob age info image availability expertise';
  var teacherId = req.params.id;
  var teacher = models.Teacher.findById(teacherId, fields).exec()
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
