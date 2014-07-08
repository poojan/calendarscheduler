'use strict';

angular.module('CSApp')
  .controller('NavCtrl', function ($rootScope, $scope, $location, Auth) {
    console.log('NavCtrl', Auth.user);
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function () {
      Auth.logout(function () {
        $location.path('/login');
      }, function () {
        $rootScope.error = 'Failed to logout';
      });
    };
  });

angular.module('CSApp')
  .controller('SearchCtrl', function ($rootScope, $scope, $location, Auth) {
    console.log('SearchCtrl', Auth.user);
    //$scope.user = Auth.user;
    //$scope.userRoles = Auth.userRoles;
    //$scope.accessLevels = Auth.accessLevels;

    //$scope.logout = function () {
      //Auth.logout(function () {
        //$location.path('/login');
      //}, function () {
        //$rootScope.error = 'Failed to logout';
      //});
    //};
  });


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
          console.log('success', res);
          $location.path('/');
        },
        function (err) {
          console.log('error', err);
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
      console.log('Auth RegisterCtrl', $scope.username);
      Auth.register(
        {
          username: $scope.username,
          password: $scope.password,
          role: Auth.userRoles.user
          //role: $scope.role
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

angular.module('CSApp')
  .controller('HomeCtrl', function ($rootScope, $scope, $location, Auth) {
    console.log('HomeCtrl');
    console.log('Auth.user', Auth.user);
    console.log('Auth.isLoggedIn', Auth.isLoggedIn());
    /*
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
   */
  });
