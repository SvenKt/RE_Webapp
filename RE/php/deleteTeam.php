<?php
require 'db_conf.php';

$user=$_POST['user'];
$teamIDtoDelete=$_POST['team_id'];
$UsersTeamId;
$numerOfUsersInTeam=0;
	//connect to DB
	establishDBConnection();
	
	//hole id des teams, in welchem der nutzer mitglied ist
	$getUsersTeamId = "select team_id from users where username='".$user."';";
	$UsersTeamIdResult = mysql_query($getUsersTeamId) OR die(mysql_error());
	
	while ($row = mysql_fetch_object($UsersTeamIdResult)){
		$UsersTeamId =$row->team_id;
	}
	
	$countUsersInTeam = "select users.username from users, team where users.team_id=team.id AND team.id='".$teamIDtoDelete."';";
	$usersCounted = mysql_query($countUsersInTeam) OR die(mysql_error());
	

	$numerOfUsersInTeam = mysql_num_rows($usersCounted);
	
	//prüfe erst, ob mehr als eine person im team ist, wenn ja, dann kann nicht gelöscht werden  -> unterbindet, dass creator aus dem team austritt, da gar nicht erst gematcht wird
	if($numerOfUsersInTeam > 1){
		echo json_encode("Fehler: Sie können das Team nicht löschen, da sich noch mindestens eine weitere Person im Team befindet");
	} else {
		//wenn usersTeamId und teamIDtoDelete gleich sein, verlässt der user das team zuerst, sonst wird nur versucht zu löschen
		if ($UsersTeamId == $teamIDtoDelete){
			$leaveMyTeam = "update users set team_id=NULL where username='".$user."';";
			$teamLeft = mysql_query($leaveMyTeam) OR die(mysql_error());
		}

			$deleteTeam = "delete from team where id=".$teamIDtoDelete.";";
			$teamdeleted = mysql_query($deleteTeam);
			
			//wenn nur noch eine person im team ist, dann entweder der creator oder jemand anderes. wenn es der creator wäre, dann wäre er aus der gruppe durch obige if-verzweigung ausgetreten
			// und das team könnte ohne foreign key exception gelöscht werden. wenn es jemand anderes ist, dann bleibt diese person im team und die abfrage kann nicht ausgeführt werden.
			if($teamdeleted){
				echo json_encode("Sie haben das Team gelöscht");
			} else {
				echo json_encode("Fehler: Sie können das Team nicht löschen, da sich noch mindestens eine weitere Person im Team befindet");
			}	
		}
	
	
		
?>