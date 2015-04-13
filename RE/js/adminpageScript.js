////////////////
//USES user.js//
////////////////

$(document).ready(function(){
//hide for adminpage
$("#admin_error").hide();
$("#admin_dialog").hide();
$("#dialog_team_modal").hide();
getUsers();

$(this).tooltip();
});




function changeData(){
var password=$("#ch_pw").val();
var password_repeat=$("#ch_pw2").val();
var email=$("#ch_email").val();
var username=getUserName;

$.ajax({
			url: "php/changeData.php",
			type: "POST",
			data: {"username": username, "password": password, "password2": password_repeat, "email": email},
			dataType: "json",
			success: function(success){
				$("#head_modal_dash").text(success).slideDown(500).delay(2000).slideUp(500);
				if (success.search("Fehler") == -1){ window.setTimeout(function(){$('#profil').modal('hide'); }, 2000);};
			},
			error: function(){alert("error");}
			});

}

function logOut(){
	location.replace("index.php");
}


function confirmUserRemoval(username,userID){
	$( "#admin_dialog" ).dialog({
		resizable: false,
		height: 140,
		width: 400,
		title: "User wirklich löschen?",
		modal: true,
		buttons: {
			"User löschen!": function() {
			//wenn user gelöscht werden soll, finde heraus, ihm irgendwelche teams gehören
			$.ajax({
				url: "php/getMyGroups.php",
				type: "POST",
				data: {"user":username},
				dataType: "json",
				success: function(success){
					//zeige dann die von nutzer erstellten teams an
					displayKickContent(username,userID);
				},
				error: function(){alert("error");}
			});
			
			$( this ).dialog( "close" );
				
			},
			"doch nicht": function() {
				$( this ).dialog( "close" );
			}
		}
	});
}


function deleteTeam(user,team_id,userID){
//erst müssen alle user das team verlassen, damit keine foreign key exceptions in mysql auftreten
	$.ajax({
			url: "php/deleteAllUsersFromTeam.php",
			type: "POST",
			data: {"team_id": team_id},
			dataType: "json",
			success: function(success){
				//$("#message").text(success).slideDown(500).delay(2000).slideUp(500);

				//wenn nutzer erfolgreich aus team entfernt wurden, lösche das Team! 
				$.ajax({
					url: "php/deleteTeam.php",
					type: "POST",
					data: {"user":user, "team_id": team_id},
					dataType: "json",
					success: function(success){
						displayKickContent(user,userID);
					},
					error: function(error){alert("error");}
				});
				
			},
			error: function(error){alert("error");}
	});
	
	
}


function confirmTeamRemoval(user,team_id,userID){
$( "#admin_dialog" ).dialog({
		resizable: false,
		height: 140,
		width: 700,
		title: "Team mitsamt Usern und Anforderungen wirklich löschen?",
		modal: true,
		bgiframe: true,
		buttons: {
			"Team löschen!": function() {
				deleteTeam(user,team_id,userID);
				$( this ).dialog( "close" );
			},
			"doch nicht": function() {
				$( this ).dialog( "close" );
			}
		}
	});


}





function displayKickContent(username,userID){
var body=$("#admin_content");
var memberOf;
var curTeam;
var usersTeams;
var string="";
$.ajax({
			//hole alle teams des users
			url: "php/getMyGroups.php",
			type: "POST",
			data: {"user":username},
			dataType: "json",
			success: function(success){

				//memberOf ist das team, in welchem der nutzer sich befindet
				memberOf=success[1];
				//usersteams sind die teams, die dem nutzer gehören (owner/creator)
				usersTeams=success[2];
			
				
				//gehe alle nutzererstellten teams durch, wenn er welche erstellt hat / besitzt
					if(usersTeams != null){
					
						for (var i = 0; i < usersTeams.length; i++){
						curTeamID=usersTeams[i][1];
						curTeam=usersTeams[i][0];
							string+="	<tr id='row"+curTeamID+"'>\
											<th>"+curTeam+"</th>\
											<th><input id='newOwner"+curTeamID+"' type='text' class='form-control'></th>\
											<th>\
												<button class='btn btn-default' onClick=\"confirmNewOwner("+curTeamID+",'"+username+"',"+userID+")\" aria-label='Right Align'>\
													<span class='glyphicon glyphicon-ok' aria-hidden='true'></span>\
												</button>\
											</th>\
											<th>\
												<button class='btn btn-default' onClick=\"confirmTeamRemoval('"+username+"',"+curTeamID+","+userID+")\" aria-label='Right Align'>\
													<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>\
												</button>\
											</th>\
										</tr>";
					
						}
					} 
					
					//wenn die vorige iteration mindestens einmal durchgeführt wurde -> user besitzt mindestens 1 team,
					//dann erstelle eine tabelle
					if(string != ""){
						body.html(
								"<b id='message' class='panel panel-warning'></b></br></br>\
								<table class='table'><thead style='background-color:#E6E6E6'>\
								<tr>\
									<th class='col-md-3'>Teamname</th>\
									<th class='col-md-4'>Neuer Besitzer</th>\
									<th class='col-md-2'>Bestätigen</th>\
									<th class='col-md-2'>Team löschen</th>\
								</tr></thead>\
								<tbody>\
									"+string+"\
								</tbody></table>");	
					$("#message").text("Fehler: User ist der Ersteller von mindestens einem Team.\nLöschen Sie diese/s oder übertragen Sie es an einen anderen User!").slideDown(500);
					} else {
					//andernfalls lösche den nutzer
						forceDeleteUser(userID);
					}
			}
	
});
}

function forceDeleteUser(userID){

$.ajax({
			url: "php/forceDeleteUser.php",
			type: "POST",
			data: {"userID":userID},
			dataType: "json",
			success: function(success){
				//$("#admin_error").text(success).slideDown(500).delay(2000).slideUp(500);	
				getUsers();
			},
			error: function(error){alert("error");}
	});
	
}

function getUsers(){
var body = $('#admin_content');
var curUser;
var string="";
$.ajax({
			url: "php/getAllUsers.php",
			type: "POST",
			dataType: "json",
			success: function(success){
				for (var i = 0; i < success.length; i++){
				curUser = success[i];
				
						id = curUser[0];
						name = curUser[1];
						email = curUser[2];
						teamid = curUser[3];
						
					if(name == "admin"){

						string+="<tr>\
									<td>"+id+"</td>\
									<td>"+name+"</td>\
									<td>"+email+"</td>\
									<td>"+teamid+"</td>\
									<td>\
									</td>\
								</tr>";
					
					} else {
				
						string+="<tr>\
									<td>"+id+"</td>\
									<td>"+name+"</td>\
									<td>"+email+"</td>\
									<td>"+teamid+"</td>\
									<td>\
										<button type='button' class='btn btn-default' onClick=\"confirmUserRemoval('"+name+"',"+id+")\" aria-label='Right Align'>\
											<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>\
										</button>\
									</td>\
								</tr>";
					}
				}
				
				body.html(	"<div id='field' class='panel panel-default'>\
								<table class='table'><thead style='background-color:#E6E6E6'>\
								<tr>\
									<th class='col-md-2'>ID</th>\
									<th class='col-md-2'>Username</th>\
									<th class='col-md-2'>E-Mail</th>\
									<th class='col-md-2'>Team-ID</th>\
									<th class='col-md-2'>Optionen</th>\
								</tr></thead>\
								<tbody>\
									"+string+"\
								</tbody></table></div>\
							</div>");
			},
			error: function(){alert("error");}
			});


}

function confirmNewOwner(teamID,oldOwner,oldOwnerID){
var newOwner = $('#newOwner'+teamID).val();
	if (newOwner != ""){
		$.ajax({
			url: "php/defineNewTeamOwner.php",
			type: "POST",
			data: {"newOwner":newOwner, "teamID":teamID},
			dataType: "json",
			success: function(success){
				$("#admin_error").text(success).slideDown(500).delay(2000).slideUp(500);
				//if (success.search("Fehler") == -1){ $('#row'+teamID).hide();};
				displayKickContent(oldOwner,oldOwnerID);
			},
			error: function(error){alert("error");}
		});
	}	
}
	


