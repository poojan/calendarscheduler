'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('test', function () {
  var src = [
    'test/unit/**/*.spec.js'
  ];
  gulp.src(src)
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('api', function () {
  var src = [
    'test/api/**/*.spec.js'
  ];
  gulp.src(src)
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', function (err) {
      gutil.log(err.message);
    });
});

gulp.task('test:api', ['api'], function () {
  var src = [
    'models/*.js',
    'routes/**/*.js',
    'test/api/**/*.spec.js'
  ];
  gulp.watch(src, ['api']);
});

gulp.task('serve', function () {
  nodemon({
    script: 'bin/www',
    ignore: ['*.swp']
  });
});

gulp.task('default', ['serve'], function () {
  var server = livereload();
  var watchPaths = [
    'views/**/*'
  ];
  gulp.watch(watchPaths).on('change', function (file) {
    server.changed(file.path);
  });
});
