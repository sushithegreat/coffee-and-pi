<?php

echo "test";
require_once(dirname(dirname(dirname(__FILE__))).'/libraries/vendor/autoload.php');

use PhpGpio\Gpio;

//power pin constant
define("POWERPIN", 23);

$app = new \Slim\Slim();
$app->post('/power', function () {
    echo "Setting up power pin\n";
	$gpio = new GPIO();
	$gpio->setup(POWERPIN, "out");

	echo "Turning on power pin\n";
	$gpio->output(POWERPIN, 1);

	echo "Sleeping!\n";
	sleep(3);

	echo "Turning off power pin\n";
	$gpio->output(POWERPIN, 0);

	echo "Unexporting all pins\n";
	$gpio->unexportAll();
});

$app->run();
