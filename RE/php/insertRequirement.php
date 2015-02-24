<?php
require 'db_conf.php';

$requirement=$_POST['req'];
$user=$_POST['username'];
	//connect to DB
	establishDBConnection();
	//create Query -> get user ID
	$abfrage = "SELECT id FROM users where username='".$user."';";
	$ergebnis = mysql_query($abfrage);
	//read DB and get user ID
	while($row = mysql_fetch_object($ergebnis))
   {
	$userid= $row->id;
	}
   
   $injection = "insert into requirements (requirement, owner_id) values ('".$requirement."','".$userid."');";
   $done = mysql_query($injection);
	
	if ($done){
			echo json_encode("Anforderung erfolgreich eingetragen!");
		} else {
			echo json_encode("Fehler. Bitte an Administrator wenden!");	
		}
	


?>