'use strict';

/* Services */
angular.module('coffeeAndPiServices', ['ngResource']).
    factory('AlarmService', function($resource){
		return $resource('services/:alarmId.json', {}, {
    		query: {method:'GET', params:{alarmId:'alarms'}, isArray: true
		}
  });
});