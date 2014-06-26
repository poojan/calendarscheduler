'use strict';

var mongoose = require('mongoose');

var mongoUri = require('../config').mongoUri;

//var mongoUri = 'mongodb://localhost/calendar_scheduler'; // TODO: Move this into a global config
mongoose.connect(mongoUri);

var Lesson = new mongoose.Schema({
  // TODO
});

var Teacher = require('../schemas/TeacherSchema')(mongoose).schema;
var User = require('../schemas/UserSchema')(mongoose).schema;

User.methods.validPassword = function (password, cb) {
  return this.model('User').findOne({ password: password }, cb);
};

exports.Lesson = mongoose.model('Lesson', Lesson);
exports.Teacher = mongoose.model('Teacher', Teacher);
exports.User = mongoose.model('User', User);
