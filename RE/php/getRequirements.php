<?php
require 'db_conf.php';

$user=$_POST['username'];
$userid="";
if (isset($_POST['query'])){
	$query=$_POST['query'];
}





$req_array="";

	//connect to DB
	establishDBConnection();

if(isset($_POST['query'])){
	$abfrage = "SELECT  requirements.project_id, requirements.status,  requirements.relations, requirements.id, requirements.requirement, requirements.priority FROM requirements, users where users.username='".$user."' AND users.team_id=requirements.team_id AND requirements.requirement like '%".$query."%';";
} else {
	$abfrage = "SELECT requirements.project_id, requirements.status,  requirements.relations, requirements.id, requirements.requirement, requirements.priority FROM requirements, users where users.username='".$user."' AND users.team_id=requirements.team_id;";
}
	
	$ergebnis = mysql_query($abfrage) OR die(mysql_error());
	
		if($ergebnis){
			while($row = mysql_fetch_object($ergebnis))
		{
			$req_array[] = array($row->requirement, $row->id, $row->priority, $row->project_id, $row->status, $row->relations);
		}
		}
		
	
		echo json_encode($req_array);
?>