drop database IF EXISTS coffeeAndPi;
create database coffeeAndPi;

use coffeeAndPi;

create table alarms (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	time TIME  NOT NULL,
	su BIT,
	mo BIT,
	tu BIT, 
	we BIT, 
	th BIT,
	fr BIT,
	sa BIT
);

	