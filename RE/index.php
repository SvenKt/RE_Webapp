﻿<!DOCTYPE HTML>

<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="login.css">
		<title> Login Page</title>
	</head>
	<body>
		<div class="jumbotron">
			<h1>Willkommen!</h2>
			<p>In der Requirements Engineering Web-Applikation<br>Bitte loggen Sie sich ein:</p>
			<p>
			<fieldset>
			<label id="name" for="name">Username:	</label><input type="text" class="form-control" name="username"></br>
			<label id="pass" for="pass">Passwort:	</label><input type="password" class="form-control" name="passwort"></br>
			<input type="button" class="btn btn-success" onClick="checkCredentials" value="Einloggen"></button> 
			<label class="showLabel"> Neu hier? --> </label> 
			<a href="bla.html"><input type="button" class="btn btn-warning" value="Registrieren" /></a>
			</fieldset>
			</p>
		</div>
	</body>
</html>