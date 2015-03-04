<?php

require 'db_conf.php';

$user=$_POST['username'];
$cookie=$_POST['cookie'];

	//connect to DB
	establishDBConnection();
	//create Query -> get user ID
	$injection = "update users set cookie='".$cookie."' where username='".$user."';";
	$ergebnis = mysql_query($injection);
	
	if($ergebnis){
	echo json_encode($cookie);
	} else {
	echo json_encode("fehler");
	}



?>