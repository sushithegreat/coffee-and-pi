'use strict';

/* App Module */
angular.module('coffeeAndPi', ['ajoslin.mobile-navigate','ui.bootstrap','coffeeAndPiFilters', 'coffeeAndPiServices'])
.config(function($routeProvider) {
  $routeProvider
	.when("/home", {templateUrl: "partials/home.html", controller: HomeCtrl})
	.when("/alarms", {templateUrl: "partials/alarms.html", controller: AlarmListCtrl})
	.when("/alarms/add", {templateUrl: "partials/addAlarm.html", controller: AlarmAddCtrl})
	.when("/alarms/:id", {templateUrl: "partials/alarmDetails.html", controller: AlarmDetailCtrl})
	.otherwise({redirectTo: "/home"});
}).directive('ngTap', function() {
  var isTouchDevice = !!("ontouchstart" in window);
  return function(scope, elm, attrs) {
    if (isTouchDevice) {
      var tapping = false;
      elm.bind('touchstart', function() { tapping = true; });
      elm.bind('touchmove', function()  { tapping = false; });
      elm.bind('touchend', function() { 
        tapping && scope.$apply(attrs.ngTap);
      });
    } else {
      elm.bind('click', function() {
        scope.$apply(attrs.ngTap);
      });
    }
  };
});