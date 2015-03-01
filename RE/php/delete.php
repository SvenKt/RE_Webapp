<?php
require 'db_conf.php';

$id=$_POST['id'];

	//connect to DB
	establishDBConnection();

	$injection = "DELETE FROM requirements WHERE id='".$id."';";
	$ergebnis = mysql_query($injection) OR die(mysql_error());
	
		if($ergebnis){
			echo json_encode("Anforderung erfolgreich gelöscht!");
		} else {
			echo json_encode("Fehler: Anforderung konnte nicht gelöscht werden");
		}
		
		
	
		
?>