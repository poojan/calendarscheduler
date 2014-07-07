'use strict';

angular.module('CSApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $location, $window, Auth) {
    console.log('LoginCtrl');
    $scope.rememberme = true;
    $scope.login = function () {
      Auth.login(
        {
          username: $scope.username,
          password: $scope.password,
          rememberme: $scope.rememberme
        },
        function (res) {
          $location.path('/');
        },
        function (err) {
          $rootScope.error = "Failed to login";
        }
      );
    };
  });

angular.module('CSApp')
  .controller('RegisterCtrl', function ($rootScope, $scope, $location, Auth) {
    console.log('RegisterCtrl');
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.register = function () {
      Auth.register(
        {
          username: $scope.username,
          password: $scope.password,
          role: $scope.role
        },
        function (res) {
          $location.path('/');
        },
        function (err) {
          $rootScope.error = err;
        }
      );
    };
  });
