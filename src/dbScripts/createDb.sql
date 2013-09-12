drop database IF EXISTS coffeeAndPi;
create database coffeeAndPi;

use coffeeAndPi;

create table alarms (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	time TIME  NOT NULL,
	day ENUM('Sun', 'Mon' 'Tue', 'Wed', 'Thu', 'Fri', 'Sat')
	);

create table tasks (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	alarmId INT NOT NULL,
	lastSnooze TIMESTAMP,
	FOREIGN KEY (alarmId) REFERENCES alarms(id) ON DELETE CASCADE
	);
	