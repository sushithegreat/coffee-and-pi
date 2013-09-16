coffee-and-pi
=============

A coffee-brewing scheduler for Raspberry Pi

Install
=======

To create the database, run 'sqlite3 coffeeAndPi < createDb.sql' in the /src/app/services/ directory. Then 'chgrp www-data coffeeAndPi', then 'chmod g+w coffeeAndPi'.


Libraries
=========

PHP-GPIO: https://github.com/ronanguilloux/php-gpio
<br>
Slim (PHP REST Framework): http://www.slimframework.com/

Notes
=====

Create a file at '/etc/udev/rules.d/10-gpio.rules' and add the following:

<pre><code>
#This line is what SHOULD work, but it doesn't
#KERNEL=="gpio*", SUBSYSTEM=="gpio", GROUP="www-data", MODE="0660"

#change 'www-data' to whatever group apache is running under
#this line sets the user and group for the GPIO pin after it's been exported
KERNEL=="gpio*", SUBSYSTEM=="gpio", ACTION=="add", PROGRAM="/bin/chown -R www-data:www-data /sys%p"

#this line chagnes the group of the export/unexport files to the group apache runs under
KERNEL=="gpio", SUBSYSTEM=="subsystem", ACTION=="add", PROGRAM="/bin/chown root:www-data /sys%p/export /sys%p/unexport"

#this line changes the permissions of the export/unexport files so anyone in the apache group can run them
KERNEL=="gpio", SUBSYSTEM=="subsystem", ACTION=="add", PROGRAM="/bin/chmod 0220 /sys%p/export /sys%p/unexport"
</code></pre>

Since the sqlite libraries actually open the sqlite database file directly (as opposed to opening a TCP or unix socket as is the case with a real DB server like MySQL), the sqlite database must have appropriate permissions. The database file itself (src/app/services/coffeeAndPi) should be writeable by the webserver. The most convenient permissions to get this to work involve setting the group ownership of coffeeAndPi to www-data and making the file group-writeable (chmod g+w coffeeAndPi). In addition, sqlite3 uses a journaling system where an additional temporary file is written beside the original database. As a result, the directory in which the database resides (src/app/services) must also be writable by the webserver.