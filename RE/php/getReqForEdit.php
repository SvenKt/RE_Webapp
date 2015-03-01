<?php
require 'db_conf.php';

$id=$_POST['id'];

	establishDBConnection();
	$req="";
	$abfrage = "SELECT requirement FROM requirements where id=".$id.";";
	$ergebnis = mysql_query($abfrage) OR die(mysql_error());
	
			while($row = mysql_fetch_object($ergebnis)){
				$req = $row->requirement;
			}

		echo json_encode($req);

?>