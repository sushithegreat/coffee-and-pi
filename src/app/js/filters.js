'use strict';

/* Filters */
angular.module('coffeeAndPiFilters', [])
	.filter('checkmark', function() {
		return function(input) {
    		return input ? '\u2713' : '\u2718';
  		};
	}
	).filter('iif', function () {
		return function(input, trueValue, falseValue) {
			return input ? trueValue : falseValue;
   		};
	}
	).filter('stringToDate', function() {
		return function(input) {
			return new Date(input*1000);
		};
	}).filter('stringToTime', function() {
		return function(input) {
			var date = new Date(input*1000);
			var h=date.getHours();
			var ampm = h > 12 ? "pm" : "am";
			h = h % 12;
			h = h ? h : 12;
			var m=date.getMinutes();
			// add a zero in front of numbers<10
			h = (h < 10) ? "0" + h : h;
			m = (m < 10) ? "0" + m : m;
			
			return h + ":" + m + " " + ampm;
		};
	});