create table alarms (
	id INT NOT NULL PRIMARY KEY, 
	su BIT,
	mo BIT,
	tu BIT, 
	we BIT, 
	th BIT,
	fr BIT,
	sa BIT,
	time TIME NOT NULL,
	enabled BIT
);

	