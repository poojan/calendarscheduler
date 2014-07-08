'use strict';
/* global routingConfig */

angular.module('CSApp')
  .factory('Auth', function ($http, $cookieStore) {
    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles,
        currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
      angular.extend(currentUser, user);
    }

    return {
      authorize: function (accessLevel, role) {
        if (role === undefined) {
          role = currentUser.role;
        }

        return accessLevel.bitMask & role.bitMask;
      },

      isLoggedIn: function (user) {
        if (user === undefined) {
          user = currentUser;
        }
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },

      register: function (user, success, error) {
        $http.post('/auth/register', user).success(function (res) {
          changeUser(res);
          success();
        });
      },

      login: function (user, success, error) {
        $http.post('/auth/login', user).success(function (user) {
          changeUser(user);
          success(user);
        }).error(error);
      },

      logout: function (success, error) {
        $http.post('/auth/logout').success(function () {
          changeUser({
            username: '',
            role: userRoles.public
          });
          success();
        }).error(error);
      },

      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  });


angular.module('CSApp')
  .factory('TimeSlots', function ($http, $cookieStore) {
    return {
      get: function (from, to) {
        //console.log(from, to);
        //for (var i = from; i < to; i = i + 30) {
          //console.log(i);
        //}
        var timeSlots = [from];
        //var timesStrings = [];
        var t = from;
        var h, m;
        while (t < to) {
          t = t + 30;
          //console.log(t%100);
          h = parseInt(t/100);
          m = parseInt(t % 100);

          if (m >= 60) {
            m = m - 60;
            h = h + 1;
            t = h * 100 + m;
          }

          timeSlots.push(t);
          //timesStrings.push(h + ':' + m);
        }
        //console.log(times);
        //console.log(timesStrings);
        return timeSlots;
      }
    };
  });
