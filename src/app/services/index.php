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

//run Slim
$app->run();

//functions
function test() {
    echo "Services are up and running.  Good job!";
}

function powerOn() {
    echo "Setting up power pin\n";
	$gpio = new GPIO();
	$gpio->setup(POWERPIN, "out");

	echo "Turning on power pin\n";
	$gpio->output(POWERPIN, 1);
}

function powerOff() {
    echo "Setting up power pin\n";
	$gpio = new GPIO();
	$gpio->setup(POWERPIN, "out");

	echo "Turning off power pin\n";
	$gpio->output(POWERPIN, 0);
}


