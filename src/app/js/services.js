'use strict';

/* Services */
angular.module('coffeeAndPiServices', ['ngResource']).
	factory('AlarmService', function($resource) {
		return $resource('services/index.php/alarms/:id', {}, {
			query:     {method:'GET', params:{id:''}, isArray:true},
			post:      {method:'POST'},
			update:    {method:'PUT'},
			remove:    {method:'DELETE'}
		});
	})
	.factory('PowerService', function($resource) {
		return $resource('services/index.php/:option', {}, {
			powerOn: {method:'GET', params:{option:'powerOn'}},
			powerOff: {method:'GET', params:{option:'powerOff'}}
		});
	});
