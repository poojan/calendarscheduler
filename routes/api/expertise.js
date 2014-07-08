'use strict';

var express = require('express');
var _ = require('lodash');
var router = express.Router();

var models = require('../../models');

router.get('/', function(req, res) {
  var keyword = req.param('keyword');
  models.Teacher.distinct('expertise', new RegExp(keyword, "i")).exec().then(function (expertise) {
    var filteredExpertise = expertise;

    if (keyword) {
      filteredExpertise = _.filter(expertise, function (exp) {
        return exp.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
      });
    }
    //res.json(expertise);
    res.json(filteredExpertise);
  });
});

module.exports = router;
