'use strict';

var app = angular.module('CSApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html'
      });

  });
