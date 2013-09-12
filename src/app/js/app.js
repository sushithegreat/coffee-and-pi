'use strict';

/* App Module */
angular.module('coffeeAndPi', ['ajoslin.mobile-navigate','ui.bootstrap','coffeeAndPiFilters', 'coffeeAndPiServices'])
.config(function($routeProvider) {
  $routeProvider
	.when("/home", {templateUrl: "partials/home.html", controller: HomeCtrl})
	.when("/alarms", {templateUrl: "partials/alarms.html", controller: AlarmListCtrl})
	.when("/alarms/:alarmId", {templateUrl: "partials/alarmDetails.html", controller: AlarmDetailCtrl})
	.otherwise({redirectTo: "/home"});
}).run(function($route, $http, $templateCache) {
	angular.forEach($route.routes, function(r) {
		if (r.templateUrl) { 
			$http.get(r.templateUrl, {cache: $templateCache});
    	}
  	});
}).directive('ngTap', function() {
  var isTouchDevice = !!("ontouchstart" in window);
  return function(scope, elm, attrs) {
    if (isTouchDevice) {
      var tapping = false;
      elm.bind('touchstart', function() { tapping = true; });
      elm.bind('touchmove', function() { tapping = false; });
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