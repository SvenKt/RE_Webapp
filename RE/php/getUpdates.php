<?php
require 'db_conf.php';

$user=$_POST['username'];

$req_array="";

	//connect to DB
	establishDBConnection();

	$abfrage = "SELECT requirements.timestamp FROM requirements, users where users.username='".$user."' AND users.team_id=requirements.team_id;";
	
	$ergebnis = mysql_query($abfrage) OR die(mysql_error());
	
		if($ergebnis){
			while($row = mysql_fetch_object($ergebnis))
			{
				$req_array[] = array($row->timestamp);
			}
		}
	echo json_encode($req_array);
?>