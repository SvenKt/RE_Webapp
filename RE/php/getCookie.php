<?php

require 'db_conf.php';

$user=$_POST['username'];
$cookie="";
	//connect to DB
	establishDBConnection();

	$abfrage = "select cookie from users where username='".$user."';";
	$ergebnis = mysql_query($abfrage);
	
	while ($row = mysql_fetch_object($ergebnis)){
		$cookie = $row->cookie;
	}
	
	if($ergebnis){
	echo json_encode($cookie);
	} else {
	echo json_encode("fehler");
	}



?>