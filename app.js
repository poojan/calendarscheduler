'use strict';

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

var routes = require('./routes/index');
var users = require('./routes/users');
var teacherApi = require('./routes/api/teacher');
var userApi = require('./routes/api/user');
var expertiseApi = require('./routes/api/expertise');
var auth = require('./routes/auth');
var user = require('./routes/user');

var passport = require('passport');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var bootstrapPath = __dirname + '/bower_components/bootstrap/less/';
var lessPath = path.join(__dirname, '/views/less/');
var cssPath = __dirname + '/public/';

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());

app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(lessMiddleware(lessPath, {
  parser: {
    paths: [
      bootstrapPath
    ]
  },
  dest: cssPath,
  prefix: '',
  preprocess: {
    path: function(pathname, req) {
      return pathname.replace('/css/', '/');
    }
  },
  debug: true
}));

//app.use(express.static(cssPath));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/api/teacher', teacherApi);
app.use('/api/user', userApi);
app.use('/api/expertise', expertiseApi);
app.use('/auth', auth);
app.use('/', routes);
//app.use('/register', user.register);
//app.use('/login', user.login);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
