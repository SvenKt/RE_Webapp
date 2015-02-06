<?php
require 'registerClass.php';


$admin = new Regist;
$admin->initInput();
$admin->checkPassLength();
$admin->checkPasswordsEqual();

if ($admin->inputOK && $admin->passwordEq && $admin->passSafe){
	
	$md5hash = md5($admin->password);

	//connect to DB
	establishDBConnection();

	//create Query
	$injection = "UPDATE users SET password='".$md5hash."', email='".$admin->email."' WHERE username='".$admin->username."';";
	$passwordChanged = mysql_query($injection);

	if ($passwordChanged){
		echo json_encode("Daten erfolgreich geändert!");
	} else {
		echo json_encode("Fehler: Daten konnten nicht geändert werden...");
	}
} else if (!$admin->inputOK){
			echo json_encode("Fehler: Bitte alle Fehler ausfüllen!");
		} else if (!$admin->passwordEq){
				echo json_encode("Fehler: Passwörter sind nicht identisch!");
			} else if (!$admin->passSafe){
					echo json_encode("Fehler: Passwort zu unsicher - mindestens 8 Zeichen eingeben!!");
		}
	


?>