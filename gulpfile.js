'use strict';

var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var changed = require('gulp-changed');

gulp.task('lib', function () {
  var src = [
    'bower_components/lodash/dist/lodash.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-cookies/angular-cookies.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/restangular/dist/restangular.js',
    'bower_components/angular-bootstrap/ui-bootstrap.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
  ];
  var dest = 'public/lib/';

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('js', function () {
  var src = [
    'views/js/*.js'
  ];
  var dest = 'public/js/';

  gulp.src(src)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

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

gulp.task('build', ['lib', 'js']);

gulp.task('default', ['build', 'serve'], function () {
  var server = livereload();
  var watchPaths = [
    'views/**/*'
  ];

  gulp.watch(watchPaths, ['js']).on('change', function (file) {
    console.log('changed file.path', file.path);
    server.changed(file.path);
  });
});
