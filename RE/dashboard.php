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
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/dashboardScript.js"></script>
		<link rel="stylesheet" href="css/dashboard.css">
		<title> Dashboard</title>
	</head>
	<body>
		<div id="head">
		</div><!--head-->
		<div id="left_nav" class="col-md-2">
			<div class="input-group">
				<span class="input-group-addon" onClick="getResult()" id="search">Go</span>
				<input type="text" id="search_field" class="form-control" placeholder="Suche...">
			</div><!--input-group-->
			<ul class="nav nav-pills nav-stacked">
				<li role="presentation" class="active navlist"><a onClick="getRequirements()" >Home</a></li>
				<li class="navlist "role="presentation"><a onClick="createReqForm()">Anforderung erstellen</a></li>
				<li class="navlist" role="presentation"><a data-toggle="modal" data-target="#profil">Profil</a></li>
				<li class="navlist" role="presentation"><a onClick="logOut()">Logout</a></li>
			</ul>
		</div><!--left_nav-->
		<div id="content-wrapper" class="panel col-md-10">
			<h2>Anforderungen</h2>
			<hr>
				<p class="panel panel-warning"id="error"></p>
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
								<label for="pw"><h4>Ihr Nutzername: <label id="user_cd"><?php echo $_GET['username'];?></label></h4></label></br>
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
			
			<!--modal newReq -->
			<!--<div class="modal fade" id="newReq" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">Neue Anforderung</h3>
						</div>
						<div class="modal-body">
							<p id="head_modal_dash"><h4>Erstellen Sie eine neue Anforderung:</h4></p></br>
							
							<fieldset>
								<div class="col-md-2"><input type="text" class="form-control" name="system" id="system" value="Wer?"></div>
								<div class="col-md-2"><input type="text" class="form-control" name="muss" id="muss" value="muss/soll/kann"></div>
								<div class="col-md-2"><input type="text" class="form-control" name="wem" id="wem" value="wem?"></div>
								<div class="col-md-2"><input type="text" class="form-control" name="bieten" id="bieten" value="möglich/fähig?"></div>
								<div class="col-md-2"><input type="text" class="form-control" name="objekt" id="objekt" value="Objekt?"></div>
								<div class="col-md-2"><input type="text" class="form-control" name="verb" id="verb" value="Verb?"></div>
							</fieldset>
						</div>
							</br>
							<label id="infotxt"><h4>Drücken Sie zum Speichern der Anforderung auf <span class="send">Bestätigen</span></h4></label>
						<div class="modal-footer">
						
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							<button class="btn btn-success" id="reg_submit" onClick="">Bestätigen</button>
						</div>
					</div>
				</div>
			</div>
		-->
		
		
	</body>
</html>