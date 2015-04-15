<?php
require 'db_conf.php';

$requirement=$_POST['req'];
$priority=$_POST['prio'];
$user=$_POST['username'];
$reqId=$_POST['id'];
$reqStatus=$_POST['status'];
$reqRel=$_POST['relations'];
$reqTime=$_POST['currentTime'];
$userTeamId=null;
$idAlreadyExists=false;

	//connect to DB
	establishDBConnection();
	//create Query -> get user ID
	$abfrage = "SELECT team_id, id FROM users where username='".$user."';";
	$ergebnis = mysql_query($abfrage);
	//read DB and get user ID
	
	while($row = mysql_fetch_object($ergebnis))
	{
		$userTeamId=$row->team_id;
		$userId=$row->id;
	}
	
	$validateProjectReqId= "SELECT project_id FROM requirements where team_id='".$userTeamId."';";
	$runValidation = mysql_query($validateProjectReqId);

	while($row = mysql_fetch_object($runValidation))
	{
		if($row->project_id == $reqId){
			$idAlreadyExists=true;
		}
	}
	
   if ($userTeamId == null){
	   echo json_encode("Fehler: Sie müssen erst Mitglied eines Teams sein, um Anforderungen eintragen zu können!");
   } else {
		    $injection = "insert into requirements (requirement, priority, project_id, status, relations ,owner_id, team_id, timestamp) values ('".$requirement."', '".$priority."','".$reqId."','".$reqStatus."','".$reqRel."','".$userId."','".$userTeamId."','".$reqTime."');";
			$done = mysql_query($injection);
	
			if ($done){
				
				if (!$idAlreadyExists){
					echo json_encode("Anforderung erfolgreich eingetragen!");
				} else {
					echo json_encode("Warnung: Anforderungs ID ist in diesem Team schon vergeben! Anforderung wurde dennoch eingetragen.");
				}
			
			} else {
					echo json_encode("Fehler. Bitte an Administrator wenden!");	
			}


	}
   
	


?>