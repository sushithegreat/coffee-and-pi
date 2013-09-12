'use strict';

/* Controllers */
function HomeCtrl($scope, $navigate) {
	$scope.$navigate = $navigate;
}

function AlarmListCtrl($scope, $navigate, Alarm) {
	$scope.$navigate = $navigate;
	$scope.alarms    = Alarm.query();
	$scope.orderProp = 'alarmId';
}
 
function AlarmDetailCtrl($scope, $navigate, $routeParams, Alarm) {
	$scope.$navigate    = $navigate;
	$scope.alarm        = Alarm.get({alarmId: $routeParams.alarmId}, function(alarm) {
		// $scope.mainImageUrl = alarm.images[0];
	});
}

function AlertDemoCtrl($scope) {
  $scope.alerts = [
    { type: 'error', msg: 'Oh snap! Change a few things up and try submitting again.' }, 
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: "Another alert!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

}