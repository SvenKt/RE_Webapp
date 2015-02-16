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
	$row = mysql_fetch_object($ergebnis);
	$userid = $row['id'];
	
	

?>