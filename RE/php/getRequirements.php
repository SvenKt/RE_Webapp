<?php
require 'db_conf.php';

$user=$_POST['username'];
$userid="";
$abfrage="";
//echo json_encode($abfrage);
$req_array="";

	//connect to DB
	establishDBConnection();

	if(isset($_POST['query'])){
		$parts=null;
		$query=$_POST['query'];
		$parts[]=explode(' ',$query);
		$abfrage = "SELECT  requirements.project_id, requirements.status,  requirements.relations, requirements.id, requirements.requirement, requirements.priority, requirements.timestamp FROM requirements, users WHERE users.username='".$user."' AND users.team_id=requirements.team_id";
		
		foreach($parts[0] as $search){
			if(strpos($search,'/')!==false) {
				$search = str_replace("/", " ", $search);
			}
			$abfrage.=" AND requirements.requirement like '%".$search."%'";
		}
		$abfrage.=";";
		
	} else {
		$abfrage = "SELECT requirements.project_id, requirements.status,  requirements.relations, requirements.id, requirements.requirement, requirements.priority, requirements.timestamp FROM requirements, users WHERE users.username='".$user."' AND users.team_id=requirements.team_id;";
	}
	
	$ergebnis = mysql_query($abfrage) OR die(mysql_error());
	
		if($ergebnis){
			while($row = mysql_fetch_object($ergebnis))
			{
				$req_array[] = array($row->requirement, $row->id, $row->priority, $row->project_id, $row->status, $row->relations, $row->timestamp);
			}
		}
		
		//echo json_encode($abfrage);
		echo json_encode($req_array);
		
?>