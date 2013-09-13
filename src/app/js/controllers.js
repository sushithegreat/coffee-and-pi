'use strict';

/* Controllers */
function HomeCtrl($scope, $navigate) {
	$scope.$navigate = $navigate;
	$scope.countDownHour  = "--";    
	$scope.countDownMin   = "--";    
	$scope.countDownSec   = "--";    
	$scope.countDownAmPm  = "--";
    var timer = setInterval(function(){
		var today=new Date();
		var h=today.getHours();
		var ampm = h > 12 ? "pm" : "am";
		h = h % 12;
		h = h ? h : 12;
		var m=today.getMinutes();
		var s=today.getSeconds();
		// add a zero in front of numbers<10
		h = (h < 10) ? "0" + h : h;
		m = (m < 10) ? "0" + m : m;
		s = (s < 10) ? "0" + s : s;
		
		$scope.countDownHour  = h;    
		$scope.countDownMin   = m;    
		$scope.countDownSec   = s;
		$scope.countDownAmPm  = ampm;
		
		var m_names = new Array("January", "February", "March", 
		"April", "May", "June", "July", "August", "September", 
		"October", "November", "December");
		
		var d = today.getDate();
		var m = today.getMonth();
		var y = today.getFullYear();
		
		var sup = "";
		if (d == 1 || d == 21 || d ==31) {
		   sup = "st";
		} else if (d == 2 || d == 22)
		   {
		   sup = "nd";
		} else if (d == 3 || d == 23) {
		   sup = "rd";
		} else {
		   sup = "th";
		}
		
		$scope.todaysDate = m_names[m] + " " + d + sup + " " + y;
		
		$scope.$apply();
    }, 1000);
	
	$scope.nextBrew = "Monday 05:00am";
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