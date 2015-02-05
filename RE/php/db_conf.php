<?php

function establishDBConnection(){
$host='localhost';
$db='requirement';
$dbuser='reqmanager';
$dbpass='Proskater594';

$sqlconnection = mysql_connect($host,$dbuser,$dbpass) or die ("keine Verbindung möglich. Benutzername oder Passwort sind falsch");
mysql_select_db($db) or die ("Die Datenbank existiert nicht.");
}
?>