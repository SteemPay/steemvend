<?php
	// pin states
	$on = 1;
	$off = 0;
	// odroid gpio pin numbers
	$light = 173;
    $release = 171;
		
	// initialize outputs
	system("gpio -g mode $light out");
	system("gpio -g mode $release out");
	
	//toggle dispensing relay
	system("gpio -g write $release $on");
	sleep(.3);
	system("gpio -g write $release $off");

	//flash sign lights todo: loop this?
	system("gpio -g write $light $on");
	sleep(.5);
	system("gpio -g write $light $off");
?>