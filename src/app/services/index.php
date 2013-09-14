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
$app->get('/alarms/:id', 'getAlarm');
$app->post('/alarms', 'addAlarm');

//run Slim
$app->run();

//functions
function test() {
    echo "Services are up and running.  Good job!";
}

function powerOn() {
	$gpio = new GPIO();
	$gpio->setup(POWERPIN, "out");
	$gpio->output(POWERPIN, 1);
}

function powerOff() {
	$gpio = new GPIO();
	$gpio->setup(POWERPIN, "out");
	$gpio->output(POWERPIN, 0);
}

function getAlarm($id) {
	$sql = "SELECT * FROM alarms WHERE id=:id";

    try {
        $db = new PDO('sqlite:coffeeAndPi');
        $stmt = $db->prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        $alarm = $stmt->fetchObject();
        if($alarm == false){
        	echo '{"error":{"text": 'Could not find alarm with that id'"}}';
        }
        else{
        	echo json_encode($alarm);
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

        $stmt->execute();
        $alarm->id = $db->lastInsertId();

        echo json_encode($alarm);
    } 
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}



