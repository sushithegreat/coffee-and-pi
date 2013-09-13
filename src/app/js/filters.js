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
			return new Date(input);
		};
	});