<?php
require 'db_conf.php';

$user=$_POST['username'];
$userid="";
if (isset($_POST['query'])){
	$query=$_POST['query'];
}





$req_array[] = "";

	//connect to DB
	establishDBConnection();

if(isset($_POST['query'])){
	$abfrage = "SELECT requirements.id, requirements.requirement FROM requirements, users where users.username='".$user."' AND users.id=requirements.owner_id AND requirements.requirement like '%".$query."%';";
} else {
	$abfrage = "SELECT requirements.id, requirements.requirement FROM requirements, users where users.username='".$user."' AND users.id=requirements.owner_id;";
}
	
	$ergebnis = mysql_query($abfrage) OR die(mysql_error());
	
		if($ergebnis){
			while($row = mysql_fetch_object($ergebnis))
		{
			$req_array[] = array($row->requirement, $row->id);
		}
		}
		
	
		echo json_encode($req_array);
?>