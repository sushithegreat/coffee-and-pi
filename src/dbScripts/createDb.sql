create table alarms (
	id INTEGER PRIMARY KEY, 
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

	