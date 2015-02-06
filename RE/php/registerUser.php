<?php
require 'db_conf.php';

	if($_POST['username'] != "" && $_POST['password'] != "" && $_POST['password2'] != "" && $_POST['email'] != ""){
		$inputOk=true;
	} else {
		$inputOk=false;
	}

	if(strlen($_POST['password']) > 7 && strlen($_POST['password2']) > 7){
		$passSafe=true;
	} else {
		$passSafe=false;
	}


function passwordsEqual(){
		
	$password=$_POST['password'];
	$password2=$_POST['password2'];
	$passwordsEqual=false;
	
	if ($password==$password2){
		$passwordsEqual=true;
	}
	return $passwordsEqual;
}

function userAlreadyExists(){

	$username=$_POST['username'];
	
	//connect to DB
	establishDBConnection();
	
	//create Query
	$abfrage = "SELECT username FROM users";
	$ergebnis = mysql_query($abfrage);
	
	//init return value
	$alreadyExists=false;

	//read DB and compare input.username with db.username
	while($row = mysql_fetch_object($ergebnis))
		{
			if ($username==$row->username){
				$alreadyExists=true;
		}
	}
	return $alreadyExists;
}

function registerUser(){

	
	//call functions to validate inputs
	$userExists=userAlreadyExists();
	$passwordEq=passwordsEqual();
	
	$password=$_POST['password'];
	$password_hash=md5($password);
	$username=$_POST['username'];
	$email=$_POST['email'];

	if (!$userExists && $passwordEq){
		//connect to DB
		establishDBConnection();
	
		//create Query
		$injection = "INSERT INTO users (username, password, email) VALUES ('".$username."','".$password_hash."','".$email."')";
		$register = mysql_query($injection);
		
		//register success
		echo json_encode("Registrierung erfolgreich");
	} else  if (!$userExists && !$passwordEq){
				//passwords are not equal
				echo json_encode("Fehler: Passwörter sind nicht gleich...");
			}	else if ($userExists && $passwordEq){
						//user already exist
						echo json_encode("Fehler: Username schon vergeben...");
					 } else if ($userExists && !$passwordEq){
								//user already exists and passwords are not equal
								echo json_encode("Fehler: Username schon vergeben und Passwörter sind nicht gleich...");
							}

}

//MAIN
if ($inputOk && $passSafe){
registerUser();
} else if ($inputOk && !$passSafe){
echo json_encode("Fehler: Passwort zu kurz! Mindestens 8 Zeichen...");
} else {
echo json_encode("Bitte alle Felder ausfüllen!");
}
?>