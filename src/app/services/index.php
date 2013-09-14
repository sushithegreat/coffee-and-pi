<?php

require_once(dirname(__FILE__).'/libraries/vendor/autoload.php');
require_once(dirname(__FILE__).'/libraries/vendor/php-gpio/vendor/autoload.php');

use PhpGpio\Gpio;

//power pin constant
define("POWERPIN", 23);

$app = new \Slim\Slim();

$app->get('/', function () use($app) {
    echo "Testing";
});

$app->get('/power', function () use($app) {
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
