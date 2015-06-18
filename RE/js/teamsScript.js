////////////////
//USES user.js//
////////////////

$(document).ready(function(){
$("#dialog_team_modal").hide();
});

function loadTeamOptions(){
	sizeAccordion();
	refreshTeamData();
}


var justEnteredTeam = false;

//Neues Team erstellen
function createTeam(){
	var teamname = $("#team_name").val();	
	if (teamname != ""){
		$.ajax({
			url: "php/createTeam.php",
			type: "POST",
			data: {"team": teamname,"user":getUserName()},
			dataType: "json",
			success: function(code){
					var mess;
					switch (code) {
						case 0: mess = createTeam.mess0; break;
						case 1: mess = createTeam.mess1; break;
					}
					
					$("#head_modal_dash_team").text(mess).slideDown(500).delay(2000).slideUp(500);
					if ((mess.search("Fehler") == -1) || (mess.search("Error") == -1)){ 
						$.ajax({
							url: "php/insertGroupOwner.php",
							type: "POST",
							data: {"team": teamname,"user":getUserName()},
							dataType: "json",
							success: function(code){
								var mess;
								switch (code) {
									case 0: mess = insertGroupOwner.mess0; break;
									case 1: mess = insertGroupOwner.mess1; break;
								}
								//teams neu laden --> meine Teams
								refreshTeamData(true);	
								$("#team_name").val('');	
								window.setTimeout(function(){$("#head_modal_dash_team").text(mess).slideDown(500).delay(2000).slideUp(500);},3000);
							}
						});					
					};
			}
		});
	} else {
		$("#head_modal_dash_team").text(createTeam.empty).slideDown(500).delay(2000).slideUp(500);	
	}
}

//Teams für den User laden
function getMyGroups(){
var user = getUserName();
var curTeam;
var teams = "Noch kein Team vorhanden";
	$.ajax({
		url: "php/getMyGroups.php",
		type: "POST",
		data: {"user":user},
		dataType: "json",
		success: function(success){
			teams="";
			memberOf=success[1];
			if (success[0] != null){
				for(var i = 0; i < success[0].length; i++){
					//wenn elemente (teams) im rückgabeobjekt enthalten sind, führe nachfolgendes aus
					curTeam=success[0][i][0];
					curTeamID=success[0][i][1];
					
					//wenn user aktuell kein member irgendeines teams -> zeichne 'team beitreten' button
					if(memberOf == ""){
						teams+="<tr>\
								<th id='team"+curTeamID+"'>"+curTeam+"</th>\
								<th></th>\
								<th class='req-btn'>\
									<button  class='btn btn-default' data-toggle='modal' data-target='#modal_editTeam' onClick='editTeam("+curTeamID+")' aria-label='Left Align'>\
										<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>\
									</button>\
									<button  class='btn btn-default' onClick='confirmTeamRemoval("+curTeamID+")' aria-label='Right Align'>\
										<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>\
									</button>\
									<button class='btn btn-default' onClick='intoTeam("+curTeamID+")' aria-label='Right Align'>\
										<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>\
									</button>\
								</th>\
								</tr>";	
					//wenn aktueller teamname == teamname, in dem nutzer mitglied ist, dann erstelle noch zusätzlich einen 'leave team' button
					} else if (curTeam == memberOf){
					
					//Übersetzung muss hier gemacht werden, da das DOM bei klick auf englisch/deutsch noch 
								teams+="<tr>\
								<th id='team"+curTeamID+"'>"+curTeam+"</th>\
								<th>"+modal_team.tbl_text+"</th>\
								<th class='req-btn'>\
									<button  class='btn btn-default' data-toggle='modal' data-target='#modal_editTeam' onClick='editTeam("+curTeamID+")' aria-label='Left Align'>\
										<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>\
									</button>\
									<button  class='btn btn-default' onClick='confirmTeamRemoval("+curTeamID+")' aria-label='Right Align'>\
										<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>\
									</button>\
									<button class='btn btn-default' onClick='leaveTeam()' aria-label='Right Align'>\
										<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>\
									</button>\
								</th>\
								</tr>";	
								
								//überschrift anpassen
									$("#headline_dashboard").text(otherContent.head_dash2+curTeam);

					//bei teams, die der user erstellt hat, in welchen er aber nicht mitglied ist
					} else {
								teams+="<tr>\
								<th id='team"+curTeamID+"'>"+curTeam+"</th>\
								<th></th>\
								<th class='req-btn'>\
									<button class='btn btn-default' data-toggle='modal' data-target='#modal_editTeam' onClick='editTeam("+curTeamID+")' aria-label='Left Align'>\
										<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>\
									</button>\
									<button class='btn btn-default' onClick='confirmTeamRemoval("+curTeamID+")' aria-label='Right Align'>\
										<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>\
									</button>\
								</th>\
								</tr>";	
					}			
				}
			}
			
			//Übersetzung muss hier gemacht werden, da das DOM bei klick auf englisch/deutsch noch 
			
			$("#content_team").html("<table class='table'><thead style='background-color:#E6E6E6'>\
						<tr>\
							<th class='col-md-4'>"+modal_team.tbl1+"</th>\
							<th class='col-md-5'></th>\
							<th class='col-md-3'>"+modal_team.tbl2+"</th>\
						</tr></thead>\
						<tbody>\
							"+teams+"\
						</tbody></table>");					
		}
	});
}

//Team verlassen
function leaveTeam(){
	var user = getUserName();
	$.ajax({
		url: "php/leaveTeam.php",
		type: "POST",
		data: {"user":user},
		dataType: "json",
		success: function(success){
			setArrayLength(0);
			refreshTeamData(true);
			updateOff();
			$("#head_modal_dash_team").text(success).slideDown(500).delay(2000).slideUp(500);
		}
	});
}

function intoTeam(team_id){
	var user = getUserName();
	$.ajax({
		url: "php/intoTeam.php",
		type: "POST",
		data: {"user":user, "team_id": team_id},
		dataType: "json",
		success: function(success){
			refreshTeamData(true);
			justEnteredTeam = true;
			updateOn();
			$("#head_modal_dash_team").text(success).slideDown(500).delay(2000).slideUp(500);		
		}
	});
}

//Team (&Anforderungen) löschen bestätigen
function confirmTeamRemoval(team_id){
$('#team_modal').hide();
$( "#dialog" ).dialog({
		resizable: false,
		height: 140,
		width: 700,
		title: team.del,
		modal: true,
		bgiframe: true,
		buttons: {
			"OK": function() {
				deleteTeam(team_id);
				$( this ).dialog( "close" );
				$('#team_modal').show();
			},
			"Cancel": function() {
				$( this ).dialog( "close" );
				$('#team_modal').show();
			}
		}
	});
}

//Team (&Anforderungen) löschen
function deleteTeam(team_id){
//erst team verlassen, damit keine foreign key exceptions in mysql auftreten
	var user = getUserName();
	$.ajax({
		url: "php/deleteTeam.php",
		type: "POST",
		data: {"user":user, "team_id": team_id},
		dataType: "json",
		success: function(success){
			refreshTeamData();
			$("#head_modal_dash_team").text(success).slideDown(500).delay(2000).slideUp(500);	
		},
		error: function(error){alert("Error: Deleting team failed.");}
	});
}

function refreshTeamDropdown(){
//füllt das dropdown in [team]->[mitglieder hinzufügen] mit den teams des users
var body = $("#team_list");
var user = getUserName();
var string = "";
$.ajax({
		url: "php/getMyGroups.php",
		type: "POST",
		data: {"user":user},
		dataType: "json",
		success: function(success){
			if (success[0] != null) {
				for(var i = 0; i < success[0].length; i++){
					curTeam=success[0][i][0];
					string += "<option>"+curTeam+"</option>";
				}
			}				
			body.html(
				"<select class='form-control' id='team_dropdown'>"+string+"</select>"
			);
		}
	});
}

function refreshTeamData(opt){
	//hier alle funktionen rein, die abhängig von den ausgelesenen teams sind
		$("#headline_dashboard").text("");

	refreshTeamDropdown();
	getMyGroups();
	if (opt){	
		getRequirements();
	}
}

//User zum Team hinzufügen
function addTeamMember(){
var newMember = $("#team_user").val();
var team = 	$("#team_list option:selected" ).text();
$.ajax({
		url: "php/addMember.php",
		type: "POST",
		data: {"member":newMember, "teamName": team},
		dataType: "json",
		success: function(code){
		var mess;
			switch (code) {
				case 0: mess = newMember+" "+addMember.mess0+" "+team; break;
				case 1: mess = newMember+" "+addMember.mess1+" "+team; break;
				case 2: mess = newMember+" "+addMember.mess2; break;
				case 3: mess = newMember+" "+addMember.mess3; break;
			}
			refreshTeamData();
			$("#head_modal_dash_team").text(mess).slideDown(500).delay(3000).slideUp(500);	
		}
	});
}

function deleteUserFromTeam(userID,teamID){
	$.ajax({
		url: "php/deleteUserFromTeam.php",
		type: "POST",
		data: {"userID": userID},
		dataType: "json",
		success: function(success){
			refreshTeamData();	
			$("#head_modal_dash_team_edit").text(success).slideDown(500).delay(2000).slideUp(500);
			//aktualisiert die ansicht im editier modal
			editTeam(teamID);
		}
	});
}

function editTeam(teamID){
var body = $("#content_editTeam");
$.ajax({
		url: "php/getMembers.php",
		type: "POST",
		data: {"teamID":teamID},
		dataType: "json",
		success: function(success){
			body.html("");
			var users ="";
			if (success != null){
				for(var i = 0; i < success.length; i++){					
					curUser = success[i][1];
					curUserID = success[i][0];
					users+="<tr>\
								<th id='user"+curUserID+"'>"+curUser+"</th>\
								<th></th>\
								<th class='req-btn'>\
									<button class='btn btn-default' data-toggle='modal' data-target='#modal_userData' onClick='showUserData("+curUserID+")' aria-label='Right Align'>\
										<span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>\
									</button>\
									<button class='btn btn-default' onClick='deleteUserFromTeam("+curUserID+","+teamID+")' aria-label='Right Align'>\
										<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>\
									</button>\
								</th>\
							</tr>";	
				}
				body.html(
					"<table class='table'>\
						<thead style='background-color:#E6E6E6'>\
							<tr>\
								<th class='col-md-4'>"+modal_editTeam.member+"</th>\
								<th class='col-md-5'></th>\
								<th class='col-md-3'>"+modal_editTeam.option+"</th>\
							</tr>\
							</thead>\
							<tbody>	"+users+"\
							</tbody>\
						</table>"		
				);
			}
		}
	});
}

function placeholder(){
//für funktionen, die eine funktion als param benötigen
//aber diese für den jeweiligen zweck undienlich ist.
}

function showUserData(userID){
	$.ajax({
		url: "php/getUserInfos.php",
		type: "POST",
		data: {"userID":userID},
		dataType: "json",
		success: function(userData){
			var name=userData[0];
			var mail=userData[1];
			var body=$("#content_userData");
			
			//Übersetzung muss hier gemacht werden, da das DOM bei klick auf englisch/deutsch noch nicht existiert!!!
			
			body.html("<div class='row'>\
						<label class='col-md-3'>"+modal_user.name+"</label><label class='col-md-8'>"+name+"</label><br/>\
						<label class='col-md-3'>E-Mail:</label>\
						<label class='col-md-8'>\
							<a href='mailto:"+mail+"?Subject=Kontakt%20über%20Red:Wire'>"+mail+"</a>\
						</label><br/>\
					   </div>");
			
		}
	});

}
//<a href='mailto:"+mail+"'><span class='glyphicon glyphicon-envelope' aria-hidden='true'></span></a> "+mail+"\