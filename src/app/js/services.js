'use strict';

/* Services */
angular.module('coffeeAndPiServices', ['ngResource']).
    factory('Alarm', function($resource){
		return $resource('services/:alarmId.json', {}, {
    		query: {method:'GET', params:{alarmId:'alarms'}, 
			isArray:true
		}
  });
});