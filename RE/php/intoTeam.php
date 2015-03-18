<?php
require 'db_conf.php';

$user=$_POST['user'];
$team_id=$_POST['team_id'];

	//connect to DB
	establishDBConnection();
	

			$goIntoTeam = "update users set team_id=".$team_id." where username='".$user."';";
			$teamJoined = mysql_query($goIntoTeam) OR die(mysql_error());
			
		
			if($teamJoined){
				echo json_encode("Sie sind dem Team beigetreten");
			} else {
				echo json_encode("Fehler: Sie konnten dem Team nicht beitreten");
			}	
		
?>