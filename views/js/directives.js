'use strict';

angular.module('CSApp')
  .directive('accessLevel', function (Auth) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var prevDisp = element.css('display'),
            userRole,
            accessLevel;

        $scope.user = Auth.user;
        $scope.$watch('user', function (user) {
          if (user.role) {
            userRole = user.role;
            updateCSS();
          }
        }, true);

        attrs.$observe('accessLevel', function (al) {
          if (al) { accessLevel = $scope.$eval(al); }
          updateCSS();
        });

        function updateCSS() {
          if (userRole && accessLevel) {
            if (!Auth.authorize(accessLevel, userRole)) {
              element.css('display', 'none');
            } else {
              element.css('display', prevDisp);
            }
          }
        }

      }
    };
  });

angular.module('CSApp')
  .directive('activeNav', function ($location) {
    function normalizeUrl(url) {
      if (url[url.length - 1] !== '/') {
        url = url + '/';
      }
      return url;
    }

    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var anchor = element[0];
        if (element[0].tagName.toUpperCase() !== 'A') {
          anchor = element.find('a')[0];
        }
        var path = anchor.href;

        scope.location = $location;
        scope.$watch('location.absUrl()', function (newPath) {
          path = normalizeUrl(path);
          newPath = normalizeUrl(newPath);

          if (path === newPath ||
             (attrs.activeNav === 'nestedTop' && newPath.indexOf(path) === 0)) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        });
      }
    };

  });

angular.module('CSApp')
  .directive('teacherSearchFilter', function (TimeSlots) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var date = new Date();
        scope.filterWeekday = weekdays[date.getDay()];
        scope.timeSlots = TimeSlots.get(1000, 1300);
        scope.ages = [20,30,40,50,60,70,80,90];
        //scope.classes = ['Japanese', 'Business', 'TOEIC', 'TOEFL'];
        scope.filterClasses = {
          'Japanese': false,
          'Business': false,
          'TOEIC': false,
          'TOEFL': false
        };

        scope.isActive = function (dayNo) {
          return dayNo === scope.filterWeekday ? 'active':'';
        };
        scope.activate = function (weekday) {
          scope.filterWeekday = weekday;
        };
        scope.search = function () {
          console.log('filterWeekday', scope.filterWeekday);
          console.log('filterSex', scope.filterSex);
          console.log('filterTimeFrom', scope.filterTimeFrom);
          console.log('filterTimeTo', scope.filterTimeTo);
          console.log('filterAge', scope.filterAge);
          console.log('filterClasses', scope.filterClasses);
          console.log('');
        };
      },
      templateUrl: '/templates/teacherSearchFilter'
    };
  });
