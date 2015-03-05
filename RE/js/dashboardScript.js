////////////////
//USES user.js//
////////////////

$(document).ready(function(){
$("#error").hide();
getRequirements();
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
				</fieldset></br>\
				<fieldset>\
				<div class='col-md-1'>Priorität:<input type='number' class='form-control' name='prio' id='prio' max=9 min=0 step=1 value=0 onkeydown='return false'></div>\
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
			data: {"req": theRequirement, "prio": prio, "username": getUserName()},
			dataType: "json",
			success: function(success){
				$('#error').text("Anforderung erfolgreich eingetragen").slideDown(500).delay(2000).slideUp(500);
				createReqForm(); 
			}
		});
	} else alert("fehler");
} 




function deleteReq(id){
	if(	loadCookieFromDatabase(cookiesEqual)){
		$.ajax({
			url: "php/delete.php",
			type: "POST",
			data: {"id": id},
			dataType: "json",
			success: function(success){
				getRequirements();
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

$.ajax({
			url: "php/getRequirements.php",
			type: "POST",
			data: {"username": user, "query": search},
			dataType: "json",
			success: function(success){
					var string="";
					success.sort(function(a, b) { //works for single-digit prio (0-9)
						if (a[2] < b[2]) return -1;
						if (a[2] > b[2]) return 1;
						return 0;
					});
					for (var i = 0; i<= success.length; i++){
						if (success[i] != null && success[i] != ""){
							var req = success[i][0].replace(/:/g," ");
							
							string+="<tr>\
									<th scope='row'>"+success[i][2]+"</th>\
									<th id='result"+success[i][1]+"'>"+req+"."+"</th>\
									<th class='req-btn'>\
										<button type='button' class='btn btn-default' onClick='createEditForm("+success[i][1]+")' aria-label='Left Align'>\
											<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>\
										</button>\
									</th>\
									<th class='req-btn'>\
										<button type='button' class='btn btn-default' onClick='deleteReq("+success[i][1]+")' aria-label='Right Align'>\
											<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>\
										</button>\
									</th></tr>";
						}
					}
					body.html("<div class='panel panel-default'>\
								<table class='table'><thead style='background-color:#E6E6E6'>\
								<tr>\
									<th>Priorität</th>\
									<th>Anforderung</th>\
									<th>Edit</th>\
									<th>Delete</th>\
								</tr></thead>\
								<tbody>\
									"+string+"\
								</tbody></table></div>"
					);
				},
			error: function(){alert("error");}
			});
}

function logOut(){
	location.replace("index.php");
}

function createEditForm(id){
	var body=$('#content');
	var user= getUserName();
	var wann, muss, wer, wem, bieten, objekt, verb, priority;
	
	
	$.ajax({
			url: "php/getReqForEdit.php",
			type: "POST",
			data: {"id": id},
			dataType: "json",
			success: function(req){
					wann = req.split(":")[0];
					muss =req.split(":")[1];
					wer =req.split(":")[2];
					wem = req.split(":")[3];
					bieten =req.split(":")[4];
					objekt = req.split(":")[5];
					verb = req.split(":")[6];
					$.ajax({
					url: "php/getPrioForEdit.php",
					type: "POST",
					data: {"id": id},
					dataType: "json",
					success: function(prio){
							priority = prio;
					
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
							<div class='col-md-2'><input type='text' class='form-control' name='wem' id='wem' value='"+wem+"' placeholder='wem? (optional)'></div>\
							<div class='col-md-2'><select class='form-control' name='bieten' id='bieten'>\
								<option>"+bieten+"</option>\
								<option>fähig sein</option>\
								<option>die Möglichkeit bieten</option>\
							</select></div>\
							</fieldset></br>\
							<fieldset>\
							<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' value='"+objekt+"'></div>\
							<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb' value='"+verb+"'></div>\
							</fieldset></br>\
							<fieldset>\
							<div class='col-md-1'>Priorität:<input type='number' class='form-control' name='prio' id='prio' max=9 min=0 step=1 value='"+priority+"' onkeydown='return false'></div>\
							</fieldset>\
							<button class='btn btn-success marginClass' id='reg_submit' onClick='edit("+id+")'>Bestätigen</button>");
						}
					});
				}
			});	
}

function edit(id){
	if (loadCookieFromDatabase(cookiesEqual)){
		insertReq();
		deleteReq(id);
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