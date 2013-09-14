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
        $alarms = $stmt->fetchObject();
        if($alarms == false){
        	echo '{"error":{"text": Could not find alarm with that id"}}';
        }
        else{
        	echo json_encode($alarms);
        }        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}



