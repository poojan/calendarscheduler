'use strict';
/* global routingConfig */

var app = angular.module('CSApp', ['ngCookies', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    //$urlRouterProvider.otherwise('/');
    //
    var access = routingConfig.accessLevels;

    $stateProvider
      .state('public', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: access.public
        }
      })
      .state('public.404', {
        url: '/404/',
        templateUrl: '404'
      });

    // Anonymous routes
    $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: access.anon
        }
      })
      .state('anon.login', {
        url: '/login/',
        templateUrl: '/templates/login',
        controller: 'LoginCtrl'
      })
      .state('anon.register', {
        url: '/register/',
        templateUrl: '/templates/register',
        controller: 'RegisterCtrl'
      });

    $stateProvider
      .state('anon.home', {
        url: '/',
        templateUrl: '/templates/home'
      });
      /*
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
     */

    $locationProvider.html5Mode(true);

  })
  .run(function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (!Auth.authorize(toState.data.access)) {
        $rootScope.error = "Permission denied";

        event.preventDefault();

        if (fromState.url === '^') {
          if (Auth.isLoggedIn()) {
            $state.go('user.home');
          } else {
            $rootScope.error = null;
            $state.go('anon.login');
          }
        }
      }
    });
  });
