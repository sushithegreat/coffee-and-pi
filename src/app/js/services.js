'use strict';

/* Services */
angular.module('coffeeAndPiServices', ['ngResource']).
	factory('AlarmService', function($resource) {
		return $resource('services/index.php/alarms/:id', {}, {
			query:     {method:'GET', params:{id:''}, isArray:true},
			post:      {method:'POST'},
			update:    {method:'PUT'},
			remove:    {method:'DELETE'}
		}
	);
});
