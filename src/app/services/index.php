<?php

require_once(dirname(__FILE__).'/libraries/vendor/autoload.php');
require_once(dirname(__FILE__).'/libraries/vendor/php-gpio/vendor/autoload.php');

use PhpGpio\Gpio;

//power pin constant
define("POWERPIN", 23);

$app = new \Slim\Slim();

//set up routes
$app->get('/', 'test');
$app->get('/powerOn', 'powerOn');
$app->get('/powerOff', 'powerOff');
$app->get('/alarms/next', 'getNextAlarm');
$app->get('/alarms/:id', 'getAlarm');
$app->get('/alarms', 'getAlarms');
$app->post('/alarms', 'addAlarm');
$app->delete('/alarms/:id', 'removeAlarm');

//run Slim
$app->run();

//functions
function test() {
    echo "Services are up and running.  Good job!";
}

function powerOn() {
	try {
		$gpio = new GPIO();
		$gpio->setup(POWERPIN, "out");
		$gpio->output(POWERPIN, 1);
	} catch(Exception $e) {
		//  used for local dev
	}
}

function powerOff() {
	try {
		$gpio = new GPIO();
		$gpio->setup(POWERPIN, "out");
		$gpio->output(POWERPIN, 0);
	} catch(Exception $e) {
		//  used for local dev
	}
}

function getAlarm($id) {
	try {
		$sql = "SELECT * FROM alarms WHERE id=:id";
		
        $db = new PDO('sqlite:coffeeAndPi');
        $stmt = $db->prepare($sql);
        $stmt->bindParam('id', $id, PDO::PARAM_INT);
        $res = $stmt->execute();
        if($res === false){
        	echo '{"error":{"text": "'.implode(' ', $stmt->errorInfo()).'"}}';
        	return;
        }
        $alarm = $stmt->fetchObject();
        if($alarm == false){
        	echo '{"error":{"text": "Could not find alarm with that id"}}';
        }
        else{
        	echo json_encode($alarm);
        }        
    } 
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getNextAlarm() {
	try {
		$sql = "SELECT * FROM alarms";
		
        $db = new PDO('sqlite:coffeeAndPi');
        $stmt = $db->prepare($sql);
		$res = $stmt->execute();
        if($res === false){
        	echo '{"error":{"text": "'.implode(' ', $stmt->errorInfo()).'"}}';
        	return;
        }
		
		$alarms = $stmt->fetchAll();
		
        if($alarms == false){
        	echo '{"error":{"text": "Could not find any alarms"}}';
        }
        else{ 
			if (count($alarms) > 0) {
				$dayArray = array("su","mo","tu","we","th","fr","sa");
				
				// search through alarms and find the next one that will go on
				
				// return alarm like "getAlarm"
			} else {
				echo '{"error":{"text": "Could not find any alarms"}}';
			}
	    }  
    } 
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function getAlarms() {
	try {
		$sql = "SELECT * FROM alarms";
		
        $db = new PDO('sqlite:coffeeAndPi');
        $stmt = $db->prepare($sql);
		$res = $stmt->execute();
        if($res === false){
        	echo '{"error":{"text": "'.implode(' ', $stmt->errorInfo()).'"}}';
        	return;
        }
		
		$alarms = $stmt->fetchAll();
		
        if($alarms == false){
        	echo '{"error":{"text": "Could not find any alarms"}}';
        }
        else{
			if (count($alarms) > 0) {
				$returnAlarms = array();
				foreach($alarms as $alarm) {
					$alarmArray = array();
					$alarmArray['id'] = $alarm['id'];
					$alarmArray['su'] = $alarm["su"];
					$alarmArray['mo'] = $alarm["mo"];
					$alarmArray['tu'] = $alarm["tu"];
					$alarmArray['we'] = $alarm["we"];
					$alarmArray['th'] = $alarm["th"];
					$alarmArray['fr'] = $alarm["fr"];
					$alarmArray['sa'] = $alarm["sa"];
					$alarmArray['time'] = $alarm["time"];
					$alarmArray['enabled'] = $alarm["enabled"];
					$returnAlarms[] = $alarmArray;
				}
				echo json_encode($returnAlarms);
			} else {
				echo '{"error":{"text": "Could not find any alarms"}}';
			}
        }        
    } 
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addAlarm() {
    $request = Slim::getInstance()->request();
    $alarm = json_decode($request->getBody());
    $sql = "INSERT INTO alarms (su, mo, tu, we, th, fr, sa, time, enabled) VALUES (:su, :mo, :tu, :we, :th, :fr, :sa, :time, :enabled)";
    try {
        $db = $db = new PDO('sqlite:coffeeAndPi');
        $stmt = $db->prepare($sql);

        $stmt->bindParam("su", $alarm->su);
        $stmt->bindParam("mo", $alarm->mo);
        $stmt->bindParam("tu", $alarm->tu);
        $stmt->bindParam("we", $alarm->we);
        $stmt->bindParam("th", $alarm->th);
        $stmt->bindParam("fr", $alarm->fr);
        $stmt->bindParam("sa", $alarm->sa);
        $stmt->bindParam("time", $alarm->time);
        $stmt->bindParam("enabled", $alarm->enabled);

        $res = $stmt->execute();
        if($res === false){
        	echo '{"error":{"text": "'.implode(' ', $stmt->errorInfo()).'"}}';
        	return;
        }
        $alarm->id = $db->lastInsertId();

        echo json_encode($alarm);
    } 
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function removeAlarm($id) {
    try {    
        $sql = "DELETE FROM alarms WHERE id=:id LIMIT 1";
        $db = new PDO('sqlite:coffeeAndPi');
        $stmt = $db->prepare($sql);
        $stmt->bindParam('id', $id, PDO::PARAM_INT);
        $res = $stmt->execute();
        if($res === false){
        	echo '{"error":{"text": "'.implode(' ', $stmt->errorInfo()).'"}}';
        	return;
        }
        
        echo '{"success":true}';
    } 
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}