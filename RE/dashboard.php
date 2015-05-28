<!DOCTYPE HTML>
<?php
	$version = "1.0";
?>
<html>
	<head>
		<meta charset="UTF-8">
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<meta http-equiv="Expires" CONTENT="0">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="Pragma" CONTENT="no-cache">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
		<script type="text/javascript" src="js/user.js"></script>
		<script type="text/javascript" src="js/dashboardScript.js"></script>
		<script type="text/javascript" src="js/dashboardDesignScript.js"></script>
		<script type="text/javascript" src="js/teamsScript.js"></script>
		
		<link rel="stylesheet" href="css/dashboard.css">
		<title> Dashboard</title>
	</head>
	<body onload="if (document.referrer == '') self.location='index.php'; updateOn()">
		<div id="head">
			<img id='logo' src='img/logo.png' alt="logo">
		</div><!--head-->
	<div id="leftSide"  class="col-md-2">
		<!-- Left Navigation Bar -->
		<div id="left_nav">
			<div class="input-group">
				<span class="input-group-btn" onClick="getResult()" id="search">
					<button class="btn btn-default" type="button" id="goButton">Go!</button>
				</span>
				<input type="text" id="search_field" class="form-control" placeholder="Suche..."  title="Durchsuchen Sie Ihre Anforderungen">
			</div><!--input-group-->
			<ul id="main-nav" class="nav nav-pills nav-stacked">
				<li role="presentation" class="navlist active"><a onClick="update()" title="Gehen Sie zurück auf den Startbildschirm" >Home</a></li>
				<li class="navlist "role="presentation"><a onClick="createReqForm()" title="Erstellen Sie eine neue Anforderung" >Anforderung erstellen</a></li>
				<li class="navlist" role="presentation"><a id="team" data-toggle="modal" data-target="#team_modal" onClick="loadTeamOptions()" title="Erstellen Sie ein Team und arbeiten Sie mit anderen zusammen" >Team</a></li>
				<li class="navlist" role="presentation"><a data-toggle="modal" title="Ändern Sie Ihre persönlichen Informationen" data-target="#profil">Profil</a></li>
				<li class="navlist" role="presentation"><a id="download_reqs" title="Laden Sie Ihre Anforderungen als .csv Datei herunter" >Download</a></li>
				<li class="navlist" role="presentation"><a onClick="logOut(), updateOff()" title="Melden Sie sich vom System ab">Logout</a></li>
			</ul>
		<!--left_nav-->
		<!-- Update Message -->
		<div class="panel panel-info floater" id="newsFeedPanel">
			<div class="panel-heading">
				<h3 class="panel-title">News-Feed</h3>
			</div>
			<div class="panel-body">
				<div id="feed">
				</div>
			</div>
		</div></div>
	</div>
		<!--content-->
		<div id="content-wrapper" class=" content-wrapper panel col-md-10">
			<button class="btn btn-primary col-md-2" type="button" id="news" title="Klicken zum Aktualisieren" onClick="update()">
				Aktualisierungen <span class="badge" id="newsNumber">0</span>
			</button>
			<button onClick=make100Reqs()>1000er</button>
			</br>
			<h2 id="headline_dashboard">Anforderungen</h2>
			<hr>
				<p class="panel panel-warning"id="error"></p>
				<div class="panel panel-warning" id="dialog"></div>
				<div id="content" class="panel panel-body">
					
				</div><!--content-->
			<hr>
		</div><!--content-wrapper-->
		<div id="footer">
		<center>
			<a id="footerLink" data-toggle="modal" title="Kontaktinformationen" data-target="#modal_kontact">Kontakt</a>
			-
			<a id="footerLink" data-toggle="modal" title="Informationen zu Version und Patches" data-target="#modal_version">Version <?php echo $version ?></a>
		</center>
		</div>
		
		
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
			
				<!-- Modal Team-->
			<div class="modal fade" id="team_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">Team</h3>
						</div>
						<div class="modal-body">
							<p id="head_modal_dash_team"><h4>Teamoptionen</h4></p></br>
							<div class="panel panel-warning" id="dialog_team_modal"></div>
							<div id="accordion">
								<h3>Meine Teams</h3>
								<div id="content_team">
									<!-- hier alle teams des users -> getMyGroups() -->
								</div>
								<h3>Team erstellen</h3>
								<div>
									<label for="pw">Teamname</label><input type="text" class="form-control" id="team_name" ></br>
									<button class="btn btn-success" onClick="createTeam()">Team erstellen</button>
								</div>
								<h3>Mitglieder hinzufügen</h3>
								<div>
									<div class="row">
										<div class="col-md-5">Mitglied</div>
										<div class="col-md-3">Meine Gruppen</div>
										<div class="col-md-2"></div>
									</div>
									<div class="row">
										<div class="col-md-5"><input type="text" class="form-control" id="team_user" ></div>
										<div id="team_list" class="col-md-3"><!--  dropdown for all teams here -> refreshTeamDropdown() --></div>
										<div class="col-md-2"><button onClick="addTeamMember()" class="btn btn-success">Mitglied hinzufügen</button></div>
									</div>
								</div>
							</div>
							
							
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							
						</div>
					</div>
				</div>
			</div>
		
		
			<!-- Modal editTeam-->
			<div class="modal fade" id="modal_editTeam" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">Team</h3>
						</div>
						<div class="modal-body">
							<p id="head_modal_dash_team_edit"><h4>Bearbeiten Sie Ihr Team</h4></p></br>
							<div id="content_editTeam">
								<!--content here-->
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			
			<!-- Modal Kontakt-->
			<div class="modal fade" id="modal_kontact" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">Kontakt</h3>
						</div>
						<div class="modal-body">
								<div class="row">
									<div class="col-md-6">
										<h4>Sven-Erik Kujat</h4>
										sv-kujat@t-online.de<br>
										Germany<br>
									</div>
									<div class="col-md-6">
										<h4>Marvin Hartmann</h4>
										Marvin.hartmann@gmx.de<br>
										Germany<br>
									</div>
								</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Modal Version-->
			<div class="modal fade" id="modal_version" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">Versionen & Patches</h3>
						</div>
						<div class="modal-body">
							<h2>Aktuelle Version: <?php echo $version ?></h2></br>
							<h4>Patchnotes:</h4>
							<div id="patchnotes">
								<!--Content in Variable patchnotes gespeichert-->
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			
	</body>
</html>
