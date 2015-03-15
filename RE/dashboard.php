<!DOCTYPE HTML>

<html>
	<head>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<meta charset="UTF-8">
		<meta http-equiv="Expires" CONTENT="0">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="Pragma" CONTENT="no-cache">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/dashboardScript.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<script type="text/javascript" src="js/user.js"></script>
		<link rel="stylesheet" href="css/dashboard.css">
		<title> Dashboard</title>
	</head>
	<body>
		<div id="head">
		</div><!--head-->
		<div id="left_nav" class="col-md-2">
			<div class="input-group">
				<span class="input-group-addon" onClick="getResult()" id="search">Go</span>
				<input type="text" id="search_field" class="form-control" placeholder="Suche..."  title="Durchsuchen Sie Ihre Anforderungen">
			</div><!--input-group-->
			<ul class="nav nav-pills nav-stacked">
				<li role="presentation" class="active navlist"><a onClick="getRequirements()" title="Gehen Sie zurück auf den Startbildschirm" >Home</a></li>
				<li class="navlist "role="presentation"><a onClick="createReqForm()" title="Erstellen Sie eine neue Anforderung" >Anforderung erstellen</a></li>
				<li class="navlist" role="presentation"><a data-toggle="modal" title="Ändern Sie Ihre persönlichen Informationen" data-target="#profil">Profil</a></li>
				<li class="navlist" role="presentation"><a id="download_reqs" title="Laden Sie Ihre Anforderungen als .csv Datei herunter" >Download</a></li>
				<li class="navlist" role="presentation"><a onClick="logOut()" title="Melden Sie sich vom System ab">Logout</a></li>
			</ul>
		</div><!--left_nav-->
		<div id="content-wrapper" class="panel col-md-10">
			<h2>Anforderungen</h2>
			<hr>
				<p class="panel panel-warning"id="error"></p>
				<div class="panel panel-warning" id="dialog"></div>
				<div id="content" class="panel panel-body">
					
				</div><!--content-->
			<hr>
		</div><!--content-wrapper-->
		<div id="footer">
		
		</div><!--footer-->
		
		<!-- Modal Profil-->
			<div class="modal fade" id="profil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">Profil</h3>
						</div>
						<div class="modal-body">
							<p id="head_modal_dash"><h4>Geben Sie Ihre neuen Daten ein:</h4></p></br>
							
							<fieldset>
								<label for="pw">Neues Passwort</label><input type="password" class="form-control" name="passwd" id="ch_pw" ></br>
								<label for="pw_repeat">Neues Passwort wiederholen</label><input type="password" class="form-control" name="passwd_repeat" id="ch_pw2" ></br>
								<label for="email">Neue E-Mail</label><input type="text" class="form-control" name="email" id="ch_email" ></br>
							</fieldset>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							<button class="btn btn-success" id="reg_submit" onClick="changeData()">Bestätigen</button>
						</div>
					</div>
				</div>
			</div>
		
		
		
	</body>
</html>