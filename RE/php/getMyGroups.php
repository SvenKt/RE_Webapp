<?php
require 'db_conf.php';

$user=$_POST['user'];

	//connect to DB
	establishDBConnection();
	
	$teams;
	
	$getUserID =  "select id from users where username='".$user."';";
	$ergebnis = mysql_query($getUserID) OR die(mysql_error());
	

			$getUsersTeams = "select team.name, users.team_id from team,users where team.creator_id=users.id AND users.username='".$user."';";
			$userTeams = mysql_query($getUsersTeams) OR die(mysql_error());
			
			while($row = mysql_fetch_object($userTeams))
			{
				
				$teams[] = $row->name;
				$usersTeamID = $row->team_id;
			} 
		
			$getUsersTeam = "select name from team where id=".$usersTeamID.";";
			$usersTeam = mysql_query($getUsersTeam) OR die(mysql_error());
			
			while($row = mysql_fetch_object($usersTeam))
			{
				
				$memberOf = $row->name;
			} 
		
			if($userTeams && $usersTeam){
				$object=array($teams,$memberOf);
				echo json_encode($object);
			} else {
				echo json_encode("Fehler: Keine Teams vorhanden");
			}	
		
?>