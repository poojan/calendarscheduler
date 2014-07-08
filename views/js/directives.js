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
  .directive('teacherSearchFilter', function (TimeSlots, Restangular) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var date = new Date();
        scope.filterWeekday = weekdays[date.getDay()];
        scope.timeSlots = TimeSlots.get(1000, 1800);
        scope.ages = [10,20,30,40,50,60,70,80,90];
        //scope.classes = ['Japanese', 'Business', 'TOEIC', 'TOEFL'];
        scope.filterClasses = {
          'Japanese': false,
          'Business': false,
          'TOEIC': false,
          'TOEFL': false
        };

        //Restangular.all('teacher').getList().then(function (teacher) {
          ////console.log(teacher);
          //scope.teachers = teacher;
        //});

        scope.isActive = function (dayNo) {
          return dayNo === scope.filterWeekday ? 'active':'';
        };
        scope.activate = function (weekday) {
          scope.filterWeekday = weekday;
        };
        scope.search = function () {
          //console.log('filterWeekday', scope.filterWeekday);
          //console.log('filterSex', scope.filterSex);
          //console.log('filterTimeFrom', scope.filterTimeFrom);
          //console.log('filterTimeTo', scope.filterTimeTo);
          //console.log('filterAge', scope.filterAge);
          //console.log('filterClasses', scope.filterClasses);
          //console.log('');

          var queryParams = {};

          if (scope.filterWeekday) { queryParams.day = scope.filterWeekday; }
          if (scope.filterAge) { queryParams.age = scope.filterAge; }
          if (scope.filterSex) { queryParams.sex = scope.filterSex; }
          if (scope.filterTimeFrom) { queryParams.from = scope.filterTimeFrom; }
          if (scope.filterTimeTo) { queryParams.to = scope.filterTimeTo; }
          if (scope.filterKeywords) { queryParams.expertise = scope.filterKeywords; }

          Restangular.all('teacher').getList(queryParams).then(function (teacher) {
            scope.teachers = teacher;
          });

        };

        scope.$watch(function() {
          return scope.filterKeywords;
        }, function (key) {
          var expertiseQueryParams = {};
          if (scope.filterKeywords) { expertiseQueryParams.keyword = scope.filterKeywords; }
          Restangular.all('expertise').getList(expertiseQueryParams).then(function (exp) {
            scope.expertise = exp;
          });
        });
      },
      templateUrl: '/templates/teacherSearchFilter'
    };
  });
