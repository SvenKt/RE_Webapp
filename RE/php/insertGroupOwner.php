<?php
require 'db_conf.php';

$team=$_POST['team'];
$user=$_POST['user'];
$teamID=0;
	//connect to DB
	establishDBConnection();

			$getUser_TeamID = "select team_id from users where username='".$user."';";
			$User_teamID_row = mysql_query($getUser_TeamID) OR die(mysql_error());
			
			while($row = mysql_fetch_object($User_teamID_row))
			{	
				$User_teamID = $row->team_id;
			}		
			
			if ($User_teamID == NULL){
				$getTeamID = "select id from team where name='".$team."';";
				$teamID_row = mysql_query($getTeamID) OR die(mysql_error());
	
				while($row = mysql_fetch_object($teamID_row))
					{	
						$teamID = $row->id;
					}		

				$writeTeamIDtoUser = "update users set team_id=".$teamID." where username='".$user."';";
				$ergebnis = mysql_query($writeTeamIDtoUser) OR die(mysql_error());
				//echo json_encode("Sie wurden erfolgreich als Teammitglied eingetragen");
					$code=0;
			} else {
				$code=1;
				//echo json_encode("Sie wurden ".$team." nicht hinzugefügt, da Sie schon Mitglied eines anderen Teams sind.");	
			}
			echo json_encode($code);
			
			
		
		

?>