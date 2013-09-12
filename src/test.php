<?php

require(dirname(__FILE__)."/libraries/PhpGpio/Gpio.php");

//power pin constant
define("POWERPIN", 23);

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
