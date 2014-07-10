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

          var classesQueryParams = {};
          var filterClassesArr = [];
          var c;

          for (c in scope.classes) {
            if (classes[c] === true) {
              filterClassesArr.push(c);
            }
          }
          scope.filterClasses = filterClassesArr.join(',');

          var queryParams = {};

          if (scope.filterWeekday) { queryParams.day = scope.filterWeekday; }
          if (scope.filterAge) { queryParams.age = scope.filterAge; }
          if (scope.filterSex) { queryParams.sex = scope.filterSex; }
          if (scope.filterTimeFrom) { queryParams.from = scope.filterTimeFrom; }
          if (scope.filterTimeTo) { queryParams.to = scope.filterTimeTo; }
          if (scope.filterKeywords) { queryParams.expertise = scope.filterKeywords; }
          if (scope.filterClasses) { queryParams.classes = scope.filterClasses; }

          Restangular.all('teacher').getList(queryParams).then(function (teacher) {
            scope.teachers = teacher;
          });

        };

        scope.classes = {};
        var classes = {};
        Restangular.all('expertise').getList().then(function (exp) {
          var filterClasses = {};
          _.each(exp, function (ex) {
            classes[ex] = false;
          });
          scope.classes = classes;
        });

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
