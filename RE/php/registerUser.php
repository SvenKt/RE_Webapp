<?php
require 'db_conf.php';

if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['password2']) && isset($_POST['email'])){
	$username=$_POST['username'];
	$password=$_POST['password'];
	$password2=$_POST['password2'];
	$email=$_POST['email'];
	$alreadyExists="false";
	$password_hash=md5($password);

establishDBConnection();

if ($password==$password2){

$abfrage = "SELECT username FROM users";
$ergebnis = mysql_query($abfrage);
$register="false";
$alreadyExists="false";

while($row = mysql_fetch_object($ergebnis))
   {
	if ($username==$row->username){
		$alreadyExists="true";
	}
   }

	if($alreadyExists="false"){
   
	$injection = "INSERT INTO users (username, password, email) VALUES ('".$username."','".$password_hash."','".$email."')";
	$register = mysql_query($injection);
	}
	
	if ($register){
		
		echo json_encode("Registrierung erfolgreich!");

	} else {
		echo json_encode("Username existiert schon!");
	}
} else {
	echo json_encode("Passwörter stimmen nicht überein!");
	}
} else {
	echo json_encode("Bitte alle Felder ausfüllen!");
}
?>