<?php
require 'db_conf.php';

$team=$_POST['team'];
$user=$_POST['user'];
$alreadyExist=false;
	//connect to DB
	establishDBConnection();

	$teamName = "select name from team;";
	$ergebnis = mysql_query($teamName) OR die(mysql_error());
	
	
	while($row = mysql_fetch_object($ergebnis))
		{
			if($team == $row->name){
				$alreadyExist=true;
			}
		}
	
	
	$getUserID =  "select id from users where username='".$user."';";
	$ergebnis = mysql_query($getUserID) OR die(mysql_error());
	
		while($row = mysql_fetch_object($ergebnis))
		{
			$id=$row->id;
		
		} 
		
	$injection = "insert into team (name, creator_id) values('".$team."','".$id."');";
	
	
		if(!$alreadyExist){
			$ergebnis = mysql_query($injection) OR die(mysql_error());
			
			if($ergebnis){
				$code=0;
				 //echo json_encode("Team erfolgreich erstellt!");
			 }
		} else {
			$code=1;
			//echo json_encode("Fehler: Team schon vorhanden");
		}
		echo json_encode($code);
	
		
		

?>