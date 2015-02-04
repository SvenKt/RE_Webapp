<?php

if(isset($_GET['username']) && isset($_GET['password'])){
	$username=$_GET['username'];
	$password=$_GET['password'];

$host='localhost';
$db='requirement';
$dbuser='reqmanager';
$dbpass='Proskater594';
$userExists="false";


$sqlconnection = mysql_connect($host,$dbuser,$dbpass) or die ("keine Verbindung möglich. Benutzername oder Passwort sind falsch");
mysql_select_db($db) or die ("Die Datenbank existiert nicht.");

$abfrage = "SELECT * FROM users";
$ergebnis = mysql_query($abfrage);
while($row = mysql_fetch_object($ergebnis))
   {
	if ($username==$row->username && $password==$row->password){
		$userExists="true";
	}
   }
echo json_encode($userExists);
} else {
echo json_encode("Bitte Daten eingeben!");
}
?>

