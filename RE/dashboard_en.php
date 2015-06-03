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
		<script type="text/javascript" src="js/translate.js"></script>
		
		<link rel="stylesheet" href="css/dashboard.css">
		<title> Dashboard</title>
	</head>
	<body contextmenu="mouseMenu" onload="if (document.referrer == '') self.location='index.php'; updateOn()">
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
				<input type="text" id="search_field" class="form-control" placeholder="search..."  title="search matching requirements">
			</div><!--input-group-->
			<ul id="main-nav" class="nav nav-pills nav-stacked">
				<li role="presentation" class="navlist active"><a onClick="update()" title="go back to home screen" >Home</a></li>
				<li class="navlist "role="presentation"><a onClick="createReqForm()" title="create a new requirement" >Create requirement</a></li>
				<li class="navlist" role="presentation"><a id="team" data-toggle="modal" data-target="#team_modal" onClick="loadTeamOptions()" title="create a team and do some teamwork!" >Team</a></li>
				<li class="navlist" role="presentation"><a data-toggle="modal" title="change your personal data" data-target="#profil">Profile</a></li>
				<li class="navlist" role="presentation"><a id="download_reqs" title="download your requirements as .csv data" >Download</a></li>
				<li class="navlist" role="presentation"><a onClick="logOut(), updateOff()" title="logout from the system">Logout</a></li>
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
				Updates <span class="badge" id="newsNumber">0</span>
			</button>
			<div class="clickable" id="languageSwitcher">
				<img title="Wechseln Sie zu deutscher Sprache" onClick="switchToDE()" src="img/de.png"></img>
			</div>
			<div class="checkbox" id="disChecker">
				<input  id="helpCheckbox" type="checkbox" value="Hilfe ausschalten">Hilfe ausschalten</input>
			</div>

			</br>
			<h2 id="headline_dashboard">Requirements</h2>
			<hr>
				<p class="panel panel-warning"id="error"></p>
				<div class="panel panel-warning" id="dialog"></div>
				<div id="content" class="panel panel-body">
					
				</div><!--content-->
			<hr>
		</div><!--content-wrapper-->
		<div id="footer">
		<center>
			<a id="footerLink" data-toggle="modal" title="Contact information" data-target="#modal_kontact">Contact</a>
			-
			<a id="footerLink" data-toggle="modal" title="version information and patchnotes" data-target="#modal_version">Version <?php echo $version ?></a>
		</center>
		</div>
		
		
		<!-- Modal Profil-->
			<div class="modal fade" id="profil" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">profile</h3>
						</div>
						<div class="modal-body">
							<p id="head_modal_dash"><h4>Fill the form with your new data:</h4></p></br>
							
							<fieldset>
								<label for="pw">New password</label><input type="password" class="form-control" name="passwd" id="ch_pw" ></br>
								<label for="pw_repeat">Repeat new password</label><input type="password" class="form-control" name="passwd_repeat" id="ch_pw2" ></br>
								<label for="email">New e-mail</label><input type="text" class="form-control" name="email" id="ch_email" ></br>
							</fieldset>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							<button class="btn btn-success" id="reg_submit" onClick="changeData()">Send</button>
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
							<p id="head_modal_dash_team"><h4>Team options</h4></p></br>
							<div class="panel panel-warning" id="dialog_team_modal"></div>
							<div id="accordion">
								<h3>My teams</h3>
								<div id="content_team">
									<!-- hier alle teams des users -> getMyGroups() -->
								</div>
								<h3>Create team</h3>
								<div>
									<label for="pw">Team name</label><input type="text" class="form-control" id="team_name" ></br>
									<button class="btn btn-success" onClick="createTeam()">create Team</button>
								</div>
								<h3>Add members</h3>
								<div>
									<div class="row">
										<div class="col-md-5">Member</div>
										<div class="col-md-3">My teams</div>
										<div class="col-md-2"></div>
									</div>
									<div class="row">
										<div class="col-md-5"><input type="text" class="form-control" id="team_user" ></div>
										<div id="team_list" class="col-md-3"><!--  dropdown for all teams here -> refreshTeamDropdown() --></div>
										<div class="col-md-2"><button onClick="addTeamMember()" class="btn btn-success">Add member</button></div>
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
							<p id="head_modal_dash_team_edit"><h4>Edit your team</h4></p></br>
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
							<h3 class="modal-title" id="myModalLabel">Contakt</h3>
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
							<h3 class="modal-title" id="myModalLabel">Version & patches</h3>
						</div>
						<div class="modal-body">
							<h2>Current version: <?php echo $version ?></h2></br>
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
			
				<!-- Modal User Data-->
			<div class="modal fade" id="modal_userData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h3 class="modal-title" id="myModalLabel">User's information</h3>
						</div>
						<div class="modal-body">
							<div id="content_userData">
								
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
			
			<menu id="mouseMenu" type="context">
				<menuitem label="Home" onClick="update();"></menuitem>
				<menuitem label="Create requirement" onClick="createReqForm();"></menuitem>
				<menuitem label="Team" data-toggle="modal" data-target="#team_modal" onClick="loadTeamOptions;"></menuitem>
				<menuitem label="Profile" data-toggle="modal" data-target="#profil" ></menuitem>
				<menuitem label="Logout" onClick="logOut()"></menuitem>
			</menu>
	</body>
	</menu>

</html>
