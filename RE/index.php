<!DOCTYPE HTML>

<html>
	<head>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script type="text/javascript" src="js/loginScript.js"></script>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="css/login.css">
		<title> Login Page</title>
	</head>
	<body>
		<div class="jumbotron">
			<h1>Willkommen!</h2>
			<p  class="alert alert-danger" id="read"></p>
			<p>In der Requirements Engineering Web-Applikation<br>Bitte loggen Sie sich ein:</p>
			<p>	
			<fieldset>
			<label for="name">Username:	</label><input type="text" class="form-control" name="username" id="userPHP" ></br>
			<label for="pass">Passwort:	</label><input type="password" class="form-control" name="password" id="passPHP"></br>
			<input type="button" class="btn btn-success" onClick="checkCredentials()" value="Einloggen"></button> 
			<label class="showLabel"> Neu hier? --> </label> 
			<a href="bla.html"><input type="button" class="btn btn-warning" value="Registrieren" /></a>
			</fieldset>		
			</p>
		</div>
	</body>
</html>