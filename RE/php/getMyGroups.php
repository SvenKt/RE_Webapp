<?php
require 'db_conf.php';

$user=$_POST['user'];

	//connect to DB
	establishDBConnection();
	
	//initialisiere variablen, wenn user kein member eines teams ist, bleibt memberOf leer.
	$myTeams=NULL;
	$teamsImAMember = NULL;
	$memberOf="";
	$usersTeamID = NULL;
	
	
			//frage die teams mit der id des users ab
			$getUsersTeams = "select team.name, team.id, users.team_id from team,users where (team.creator_id=users.id OR team.id=users.team_id) AND users.username='".$user."';";
			$userTeams = mysql_query($getUsersTeams) OR die(mysql_error());
			
			while($row = mysql_fetch_object($userTeams))
			{
				//füge die passenden teams dem array team[] hinzu
				//usersTeamID bekommt die id des teams, in welchem der user member ist.
				$myTeams[] = array($row->name, $row->id);
				$usersTeamID = $row->team_id;
			} 
			
			//wenn der user in keiner team ist, dann bleibt memberOf leer und kein team wird in der javascript funktion als team des users matchen
			if ($usersTeamID != NULL){
				$getUsersTeam = "select name from team where id=".$usersTeamID.";";
				$usersTeam = mysql_query($getUsersTeam) OR die(mysql_error());
			
				while($row = mysql_fetch_object($usersTeam))
				{				
					$memberOf = $row->name;
				} 
		
			}
			
			
				$object=array($myTeams,$memberOf);
				echo json_encode($object);

?>