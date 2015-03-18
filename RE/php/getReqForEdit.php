<?php
require 'db_conf.php';

$id=$_POST['id'];

	establishDBConnection();

	
	$abfrage = "SELECT requirement, priority, project_id, status, relations  FROM requirements where id=".$id.";";
	$ergebnis = mysql_query($abfrage) OR die(mysql_error());
	
			while($row = mysql_fetch_object($ergebnis)){
				$req[0] = $row->requirement; 
				$req[1] = $row->priority;
				$req[2] = $row->project_id;
				$req[3] = $row->status;
				$req[4] = $row->relations;
			}

		echo json_encode($req);

?>