'use strict';
/* global routingConfig */

var app = angular.module('CSApp', ['ngCookies', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
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
        templateUrl: '/templates/404'
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
      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: access.user
        }
      })
      .state('user.home', {
        url: '/',
        templateUrl: 'templates/home'
      });

    $urlRouterProvider.otherwise('/404');

    $urlRouterProvider.rule(function ($injector, $location) {
      if ($location.protocol() === 'file') { return; }

      var path = $location.path(),
          search = $location.search(),
          params;

      // check to see if the path already ends in '/'
      if (path[path.length - 1] === '/') { return; }

      // If there was no search string / query params, return with a '/'
      if (Object.keys(search).length === 0) {
        return path + '/';
      }

      // Otherwise build the search string and return a '/?' prefix
      params = [];
      angular.forEach(search, function (v, k) {
        params.push(k + '=' + v);
      });
      return path + '/?' + params.join('&');
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

    $httpProvider.interceptors.push(function ($q, $location) {
      return {
        'responseError': function (response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    });

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
