'use strict';

angular.module('CSApp')
  .filter('timeReadable', function() {
    return function(input) {
      var h = parseInt(input/100);
      var m = input%100;

      if (h < 10) {
        h = '0' + h;
      }
      if (m < 10) {
        m = '0' + m;
      }

      return h + ':' + m;
    };
  });

angular.module('CSApp')
  .filter('decade', function() {
    return function (input) {
      return input + "'s";
    };
  });
