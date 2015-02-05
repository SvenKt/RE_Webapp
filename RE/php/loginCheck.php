<?php

if(isset($_POST['username']) && isset($_POST['password'])){
	$username=$_POST['username'];
	$password=$_POST['password'];

$host='localhost';
$db='requirement';
$dbuser='reqmanager';
$dbpass='Proskater594';
$userExists="false";
$password_hash=md5($password);

$sqlconnection = mysql_connect($host,$dbuser,$dbpass) or die ("keine Verbindung möglich. Benutzername oder Passwort sind falsch");
mysql_select_db($db) or die ("Die Datenbank existiert nicht.");

$abfrage = "SELECT * FROM users";
$ergebnis = mysql_query($abfrage);
while($row = mysql_fetch_object($ergebnis))
   {
	if ($username==$row->username && $password_hash==$row->password){
		$userExists="true";
	}
   }
echo json_encode($userExists);
} else {
echo json_encode("Bitte Daten eingeben!");
}
?>

