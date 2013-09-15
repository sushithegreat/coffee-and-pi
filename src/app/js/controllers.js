'use strict';

/* Controllers */
function HomeCtrl($scope, $navigate, PowerService) {
	$scope.$navigate = $navigate;
	$scope.countDownHour  = "---";    
	$scope.countDownMin   = "---";    
	$scope.countDownSec   = "---";    
	$scope.countDownAmPm  = "---";
	$scope.todaysDate     = "---";
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
	
	$scope.power = function(bool) {
		if (bool) {
			PowerService.powerOn({}, function() {
				console.log("power on!!");
				$scope.togglePowerMessage(true, "Your coffee is brewing!");
			});
		} else {
			PowerService.powerOff({}, function() {
				console.log("power off!!");
				$scope.togglePowerMessage(false, "Your coffee has stopped brewing!");
			});
		}

	};
	
	$scope.togglePowerMessage = function(bool, message) {
		$scope.displayPowerMessage = bool;
		$scope.powerMessage = message;
		$scope.$apply();
	};
}

function AlarmListCtrl($scope, $navigate, AlarmService) {
	$scope.$navigate = $navigate;
	AlarmService.query(function(alarms) {
		$scope.alarms = [];
		var len = alarms.length;
		for(var i = 0; i < len; i++) {
			$scope.alarms[i] = {};
			$scope.alarms[i].id = alarms[i].id;
			$scope.alarms[i].time = alarms[i].time;
			$scope.alarms[i].enabled = alarms[i].enabled == "1";
			$scope.alarms[i].su = alarms[i].su == "1";
			$scope.alarms[i].mo = alarms[i].mo == "1";
			$scope.alarms[i].tu = alarms[i].tu == "1";
			$scope.alarms[i].we = alarms[i].we == "1";
			$scope.alarms[i].th = alarms[i].th == "1";
			$scope.alarms[i].fr = alarms[i].fr == "1";
			$scope.alarms[i].sa = alarms[i].sa == "1";
		}
		$scope.orderProp = 'id';
	});
}
 
function AlarmDetailCtrl($scope, $navigate, $routeParams, AlarmService) {
	$scope.$navigate    = $navigate;
	$scope.displayDeleteAlarmConfirmation = false;
	$scope.alarm        = AlarmService.get({id: $routeParams.id}, function(alarm) {
		$scope.alarm.id = alarm.id;
		$scope.alarm.time = alarm.time;
		$scope.alarm.enabled = alarm.enabled == "1";
		$scope.alarm.su = alarm.su == "1";
		$scope.alarm.mo = alarm.mo == "1";
		$scope.alarm.tu = alarm.tu == "1";
		$scope.alarm.we = alarm.we == "1";
		$scope.alarm.th = alarm.th == "1";
		$scope.alarm.fr = alarm.fr == "1";
		$scope.alarm.sa = alarm.sa == "1";
	});
	
	$scope.toggleDeleteConfirmationPopup = function(bool) {
	    if (bool === true) {
	        $scope.displayDeleteAlarmConfirmation = true;
	    } else {
	        $scope.displayDeleteAlarmConfirmation = false;
	    }
	};
	
	$scope.deleteAlarm = function (alarmId) {
		AlarmService.remove({id:alarmId}, function() {
			$scope.displayDeleteAlarmConfirmation = false;
			$navigate.go('/alarms');
		});
	};
}

function TimepickerCtrl($scope, $routeParams, AlarmService) {
	AlarmService.get({id: $routeParams.id}, function(alarm) {
		console.log(alarm);
		var initialTime = alarm.time;
		$scope.myTime = new Date(initialTime*1000);

		$scope.hstep = 1;
		$scope.mstep = 1;
		$scope.ismeridian = true;
	});
};