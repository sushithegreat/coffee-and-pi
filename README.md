coffee-and-pi
=============

A coffee-brewing scheduler for Raspberry Pi

To create the database, simply run 'sqlite3 coffeeAndPi < createDb.sql' in the /src/app/services/ directory




Notes
=====

Create a file at '/etc/udev/rules.d/10-gpio.rules' and add the following:

#This line is what SHOULD work, but it doesn't
#KERNEL=="gpio*", SUBSYSTEM=="gpio", GROUP="www-data", MODE="0660"

#change 'www-data' to whatever group apache is running under
#this line sets the user and group for the GPIO pin after it's been exported
KERNEL=="gpio*", SUBSYSTEM=="gpio", ACTION=="add", PROGRAM="/bin/chown -R www-data:www-data /sys%p"

#this line chagnes the group of the export/unexport files to the group apache runs under
KERNEL=="gpio", SUBSYSTEM=="subsystem", ACTION=="add", PROGRAM="/bin/chown root:www-data /sys%p/export /sys%p/unexport"

#this line changes the permissions of the export/unexport files so anyone in the apache group can run them
KERNEL=="gpio", SUBSYSTEM=="subsystem", ACTION=="add", PROGRAM="/bin/chmod 0220 /sys%p/export /sys%p/unexport"