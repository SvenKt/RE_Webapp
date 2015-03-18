////////////////
//USES user.js//
////////////////

$(document).ready(function(){
$("#error").hide();
$("#dialog").hide();
$("#dialog_team_modal").hide();
getRequirements();
refreshTeamData();
$(this).tooltip();
$("#accordion").accordion({collapsible: true});

//enter bestätigung beim erstellen von teams
$("#team_name").keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			createTeam();
		}
		event.stopPropagation();
	});

//enter bestätigung beim hinzufügen von teammitgliedern
$("#team_user").keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		addTeamMember();
	}
	event.stopPropagation();
});

//enter bestätigung im suchfeld
$("#search_field").keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			getResult();
		}
		event.stopPropagation();
	});
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

function createReqForm(){
var body=$('#content');
var user= getUserName();

body.html("<h3 class='marginClass'>Hallo "+user+", tragen Sie eine neue Anforderung ein:</h3>\
				<fieldset>\
					<div class='col-md-3'><input type='text' class='form-control' name='wann' id='wann' placeholder='Wann?/Bedingung?'></div>\
					<div class='col-md-2'><select class='form-control' name='muss' id='muss'>\
						<option>muss</option>\
						<option>sollte</option>\
						<option>wird</option>\
					</select></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='system' id='system' placeholder='Systemname?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='wem' id='wem' placeholder='wem? (optional)'></div>\
					<div class='col-md-2'><select class='form-control' name='bieten' id='bieten'>\
						<option>fähig sein,</option>\
						<option>die Möglichkeit bieten,</option>\
					</select></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' placeholder='Objekt?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb' placeholder='Verb?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='identity' id='identity' placeholder='ID?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='relations' id='relations' placeholder='Abhängigkeiten? (optional)'></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-1'>Priorität:<input type='number' class='form-control' name='prio' id='prio' max=3 min=0 step=1 value=0 onkeydown='return false'></div>\
					<div class='col-md-2'>Status:<select id='status' class='form-control'>\
													<option>im Backlog</option>\
													<option>in Bearbeitung</option>\
													<option>in Testphase</option>\
													<option>abgeschlossen</option>\
												</select>\
					</div>\
				</fieldset>\
		<button class='btn btn-success marginClass' id='reg_submit' onClick='insertReq()'>Bestätigen</button>");

}

function fieldError(){
$('#error').text("Bitte alle nicht-optionalen Felder ausfüllen").slideDown(500).delay(2000).slideUp(500);
}

function insertReq(){
var user=$('#content');
var wann=$('#wann').val(); if(wann==""){fieldError(); return;}
var muss=$('#muss').val();
var system=$('#system').val(); if(system==""){fieldError(); return;}
var wem="";
var bieten="";
var objekt=$('#objekt').val(); if(objekt==""){fieldError(); return;}
var verb=$('#verb').val(); if(verb==""){fieldError(); return;}
var prio=$('#prio').val();
//prüfe, ob id ein integer ist
var reqId=$('#identity').val(); if(isNaN(reqId) || reqId < 0 || reqId == ""){$('#error').text("Bitte einen gültigen ID Wert angeben!").slideDown(500).delay(2000).slideUp(500);; return;}
var reqStatus=$('#status option:selected').text();
var relations=$('#relations').val();

if($('#bieten').val() != "-"){
	bieten=$('#bieten').val() + " ";
}
if($('#wem').val() != ""){
	wem=$('#wem').val() + " ";
}

var theRequirement = wann + ":" + muss + ":" + system + ":" + wem +":" + bieten + ":" + objekt + ":" + verb;

	if(	loadCookieFromDatabase(cookiesEqual)){
		$.ajax({
			url: "php/insertRequirement.php",
			type: "POST",
			data: {"req": theRequirement, "prio": prio, "username": getUserName(), "id": reqId, "status": reqStatus, "relations": relations},
			dataType: "json",
			success: function(success){
				$('#error').text(success).slideDown(500).delay(2000).slideUp(500);
				if (success.search("Fehler") == -1){ getRequirements() };
				
			}
		});
	} else alert("fehler");
} 




function deleteReq(id, doAfterThis){
	if(	loadCookieFromDatabase(cookiesEqual)){
		$.ajax({
			url: "php/delete.php",
			type: "POST",
			data: {"id": id},
			dataType: "json",
			success: function(success){
				getRequirements();
				doAfterThis();
			}
		});
	} else {
		alert("fehler");
	}
}

function getRequirements(query){
var body=$('#content');
var user= getUserName();
var search = query;
var priority;
var p_id;
var p_status;
var p_rel;
var req;
var req_id;

$.ajax({
			url: "php/getRequirements.php",
			type: "POST",
			data: {"username": user, "query": search},
			dataType: "json",
			success: function(success){
					var string="";
					if (success.length != 0){
						success.sort(function(a, b) { //works for single-digit prio (0-9)
						if (a[2] > b[2]) return -1;
						if (a[2] < b[2]) return 1;
						return 0;
						});
					}
					
					for (var i = 0; i < success.length; i++){
							req = success[i][0].replace(/:/g," ");
							req_id=success[i][1];
							p_id=success[i][3];
							p_status=success[i][4];
							p_rel=success[i][5];
							priority=success[i][2];
							
							
							string+="<tr>\
									<th>"+p_id+"</th>\
									<th id='result"+req_id+"'>"+req+".</th>\
									<th scope='row'>"+priority+"</th>\
									<th>"+p_status+"</th>\
									<th>"+p_rel+"</th>\
									<th class='req-btn'>\
										<button type='button' class='btn btn-default' onClick='createEditForm("+req_id+")' aria-label='Left Align'>\
											<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>\
										</button>\
										<button type='button' class='btn btn-default' onClick='confirmRemoval("+req_id+")' aria-label='Right Align'>\
											<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>\
										</button>\
									</th>\
									</tr>";
						}
					
					
					body.html("<div id='field' class='panel panel-default'>\
								<table class='table'><thead style='background-color:#E6E6E6'>\
								<tr>\
									<th class='col-md-1'>ID</th>\
									<th class='col-md-5'>Anforderung</th>\
									<th class='col-md-1'>Priorität</th>\
									<th class='col-md-1'>Status</th>\
									<th class='col-md-2'>Abhängigkeiten</th>\
									<th class='col-md-2'>Optionen</th>\
								</tr></thead>\
								<tbody>\
									"+string+"\
								</tbody></table></div>"
					);
				},
			error: function(){alert("error");}
			});
	refreshExport();
}

function logOut(){
	location.replace("index.php");
}

function createEditForm(id){
	var body=$('#content');
	var user= getUserName();
	var wann, muss, wer, wem, bieten, objekt, verb, priority;
	
	
	
	//hole requirement aus datenbank
	$.ajax({
			url: "php/getReqForEdit.php",
			type: "POST",
			data: {"id": id},
			dataType: "json",
			success: function(req){
						wann = req[0].split(":")[0];
						muss =req[0].split(":")[1];
						wer =req[0].split(":")[2];
						wem = req[0].split(":")[3];
						bieten =req[0].split(":")[4];
						objekt = req[0].split(":")[5];
						verb = req[0].split(":")[6];
						priority = req[1];
						p_id=req[2];
						p_status=req[3];
						p_rel=req[4];
						
						
						
									body.html("<h3 class='marginClass'>Hallo "+user+", bearbeiten Sie Ihre Anforderung:</h3>\
										<fieldset>\
											<div class='col-md-3'><input type='text' class='form-control' name='wann' id='wann' value='"+wann+"'></div>\
											<div class='col-md-2'><select class='form-control' name='muss' id='muss'>\
												<option>"+muss+"</option>\
												<option>muss</option>\
												<option>sollte</option>\
												<option>wird</option>\
											</select></div>\
											<div class='col-md-2'><input type='text' class='form-control' name='system' id='system' value='"+wer+"'></div>\
											<div class='col-md-2'><input type='text' class='form-control' name='wem' id='wem' value='"+wem+"'></div>\
											<div class='col-md-2'><select class='form-control' name='bieten' id='bieten'>\
												<option>"+bieten+"</option>\
												<option>fähig sein,</option>\
												<option>die Möglichkeit bieten,</option>\
											</select></div>\
										</fieldset></br>\
										<fieldset>\
											<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' value='"+objekt+"'></div>\
											<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb'  value='"+verb+"'></div>\
											<div class='col-md-2'><input type='text' class='form-control' name='identity' id='identity'  value='"+p_id+"'></div>\
											<div class='col-md-2'><input type='text' class='form-control' name='relations' id='relations'  value='"+p_rel+"'></div>\
										</fieldset></br>\
										<fieldset>\
											<div class='col-md-1'>Priorität:<input type='number' class='form-control' name='prio' id='prio' max=3 min=0 step=1 value=0 onkeydown='return false'></div>\
											<div class='col-md-2'>Status:<select id='status' class='form-control'>\
												<option>"+p_status+"</option>\
												<option>im Backlog</option>\
												<option>in Bearbeitung</option>\
												<option>in Testphase</option>\
												<option>abgeschlossen</option>\
											</select>\
											</div>\
										</fieldset>\
										<button class='btn btn-success marginClass' id='reg_submit' onClick='edit("+id+")'>Bestätigen</button>");
			}	
	});
}

function edit(id){
	if (loadCookieFromDatabase(cookiesEqual)){
		//muss erst gelöscht werden, damit abhängigkeiten und bedingungen erfüllt bleiben
		deleteReq(id, insertReq);
	} else {
		alert ("fehler");
	}
}

function getResult(){
	var searchQuery=$("#search_field").val();
	getRequirements(searchQuery);
	
	
}


function cookiesEqual(){
	//console.log("user "+getUserCookie() + " db " + getDatabaseCookie());
	return (getUserCookie() == getDatabaseCookie());
}

function confirmRemoval(reqID){
	$( "#dialog" ).dialog({
		resizable: false,
		height: 140,
		width: 400,
		title: "Anforderung wirklich löschen?",
		modal: true,
		buttons: {
			"Anforderung löschen!": function() {
				deleteReq(reqID);
				$( this ).dialog( "close" );
			},
			"doch nicht": function() {
				$( this ).dialog( "close" );
			}
		}
	});
}
	
	
function refreshExport(){
var user = getUserName();
var csvRows = new Array();
var prio;
var req;
var p_id; //id der anforderung im team p -> projekt
var p_status;
var p_rel;
var req_id;

	$.ajax({
			url: "php/getRequirements.php",
			type: "POST",
			data: {"username": user},
			dataType: "json",
			success: function(success){
					var string="";
					if (success.length != 0){
						success.sort(function(a, b) { //works for single-digit prio (0-9)
							if (a[2] > b[2]) return -1;
							if (a[2] < b[2]) return 1;
							return 0;
						});
					}
					// csv daten aufbereiten
					
			csvRows.push("ID"+"\t"+"Anforderung"+"\t"+"Prioriät"+"\t"+"Status"+"\t"+"Abhängigkeiten");
					for (var i = 0; i< success.length; i++){
							req = success[i][0].replace(/:/g," ");
							prio = success[i][2];
							p_id=success[i][3];
							p_status=success[i][4];
							p_rel=success[i][5];
							csvRows.push(p_id+"\t"+req+"\t"+prio+"\t"+p_status+"\t"+p_rel);
						
					}
					
					//csv datei anlegen
					var csvData = csvRows.join("\n");
					var uri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvData);
					var fileName = "Anforderungen.csv";
					
					//link setzen
					$("#download_reqs").attr("href",uri);
					$("#download_reqs").attr("target",'_blank');
					$("#download_reqs").attr("download", 'Anforderungen.csv,' );
			}
	
	});
} 

function createTeam(){
var teamname = $("#team_name").val();	
if (teamname != ""){
		$.ajax({
			url: "php/createTeam.php",
			type: "POST",
			data: {"team": teamname,"user":getUserName()},
			dataType: "json",
			success: function(success){
					$("#head_modal_dash_team").text(success).slideDown(500).delay(2000).slideUp(500);
					if (success.search("Fehler") == -1){ 
						$.ajax({
							url: "php/insertGroupOwner.php",
							type: "POST",
							data: {"team": teamname,"user":getUserName()},
							dataType: "json",
							success: function(success){
								//teams neu laden --> meine Teams
								refreshTeamData();	
								$("#team_name").val('');	
								window.setTimeout(function(){$("#head_modal_dash_team").text(success).slideDown(500).delay(2000).slideUp(500);},3000);
							}
						});					
					};
			}
	});
} else {
	$("#head_modal_dash_team").text("Fehler: Name darf nicht leer sein!").slideDown(500).delay(2000).slideUp(500);
	
}

}

function sizeAccordion(){
$("#accordion").accordion({ heightStyle: "content" });
}

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
						//wenn elemente (teams) im rückgabeobjek enthalten sind, führe nachfolgendes aus
						
						curTeam=success[0][i][0];
						curTeamID=success[0][i][1];
						
						//wenn user aktuell kein member irgendeines teams -> zeichne 'team beitreten' button
						if(memberOf == ""){
							teams+="<tr>\
									<th id='team"+curTeamID+"'>"+curTeam+"</th>\
									<th></th>\
									<th class='req-btn'>\
										<button  class='btn btn-default' onClick='' aria-label='Left Align'>\
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
									teams+="<tr>\
									<th id='team"+curTeamID+"'>"+curTeam+"</th>\
									<th>Sie sind Mitglied dieser Gruppe"+"</th>\
									<th class='req-btn'>\
										<button  class='btn btn-default' onClick='' aria-label='Left Align'>\
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
									$("#headline_dashboard").text("Anforderungen von Team '"+curTeam+"'");
						//bei teams, die der user erstellt hat, in welchen er aber nicht mitglied ist
					}   else {
									teams+="<tr>\
									<th id='team"+curTeamID+"'>"+curTeam+"</th>\
									<th></th>\
									<th class='req-btn'>\
										<button class='btn btn-default' onClick='' aria-label='Left Align'>\
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
				
				
				
					
					$("#content_team").html("<table class='table'><thead style='background-color:#E6E6E6'>\
								<tr>\
									<th class='col-md-4'>Team</th>\
									<th class='col-md-6'></th>\
									<th class='col-md-2'>Optionen</th>\
								</tr></thead>\
								<tbody>\
									"+teams+"\
								</tbody></table>");					
			}
	});
	
}

function loadTeamOptions(){
	sizeAccordion();
	refreshTeamData();
}

function leaveTeam(){
	var user = getUserName();
	$.ajax({
			url: "php/leaveTeam.php",
			type: "POST",
			data: {"user":user},
			dataType: "json",
			success: function(success){
				refreshTeamData();
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
				refreshTeamData();
				$("#head_modal_dash_team").text(success).slideDown(500).delay(2000).slideUp(500);
					
			}
	});

	
}

function confirmTeamRemoval(team_id){
$('#team_modal').hide();
$( "#dialog" ).dialog({
		resizable: false,
		height: 140,
		width: 600,
		title: "Team mitsamt Anforderungen wirklich löschen?",
		modal: true,
		bgiframe: true,
		buttons: {
			"Team löschen!": function() {
				deleteTeam(team_id);
				$( this ).dialog( "close" );
				$('#team_modal').show();
			},
			"doch nicht": function() {
				$( this ).dialog( "close" );
				$('#team_modal').show();
			}
		}
	});


}

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
			error: function(error){alert(error);}
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

function refreshTeamData(){
	//hier alle funktionen rein, die abhängig von den ausgelesenen teams sind
	$("#headline_dashboard").text("Anforderungen");
	refreshTeamDropdown();
	getMyGroups();
	getRequirements();
	
}

function addTeamMember(){
var newMember = $("#team_user").val();
var team = 	$("#team_list option:selected" ).text();

$.ajax({
			url: "php/addMember.php",
			type: "POST",
			data: {"member":newMember, "teamName": team},
			dataType: "json",
			success: function(success){
				refreshTeamData();
				$("#head_modal_dash_team").text(success).slideDown(500).delay(2000).slideUp(500);	
			}
	});

	
}