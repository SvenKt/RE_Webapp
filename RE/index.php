﻿<!DOCTYPE HTML>

<html>
	<head>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script type="text/javascript" src="js/loginScript.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="css/login.css">
		<title> Login Page</title>
	</head>
	<body>
		<div class="jumbotron">
			<h1>Willkommen!</h2>
			<p  class="panel panel-warning" id="read"></p>
			<p>In der Requirements Engineering Web-Applikation<br>Bitte loggen Sie sich ein:</p>
			<p>	
			<fieldset>
			<label for="name">Username:	</label><input type="text" class="form-control" name="username" id="userPHP" ></br>
			<label for="pass">Passwort:	</label><input type="password" class="form-control" name="password" id="passPHP"></br>
			<input type="button" class="btn btn-success" onClick="checkCredentials()" value="Einloggen"></button> 
			<label class="showLabel"> Neu hier? --> </label> 
			<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#register">Registrieren</button>
			</fieldset>		
			</p>
		</div>
			
			<!-- Modal -->
			<div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">Registrierung</h3>
						</div>
						<div class="modal-body">
							<p id="head_modal"><h4>Bitte geben Sie die benötigten Informationen ein:</h4></p></br>
							
							<fieldset>
								<label for="name">Username</label><input type="text" class="form-control" name="username" id="reg_user" ></br>
								<label for="pw">Passwort</label><input type="password" class="form-control" name="passwd" id="reg_pw" ></br>
								<label for="pw_repeat">Passwort wiederholen</label><input type="password" class="form-control" name="passwd_repeat" id="reg_pw2" ></br>
								<label for="email">E-Mail</label><input type="text" class="form-control" name="email" id="reg_email" ></br>
							</fieldset>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							<button class="btn btn-success" id="reg_submit" onClick="registerUser()">Registrieren</button>
						</div>
					</div>
				</div>
			</div>
	</body>
</html>