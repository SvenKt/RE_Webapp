<?php
require 'db_conf.php';

$id=$_POST['id'];

	establishDBConnection();
	$prio=0;
	$abfrage = "SELECT priority FROM requirements where id=".$id.";";
	$ergebnis = mysql_query($abfrage) OR die(mysql_error());
	
		while($row = mysql_fetch_object($ergebnis)){
				$prio = $row->priority;
			}
			
		echo json_encode($prio);

?>