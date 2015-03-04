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
			data: {"req": theRequirement, "username": getUserName()},
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

$.ajax({
			url: "php/getRequirements.php",
			type: "POST",
			data: {"username": user, "query": search},
			dataType: "json",
			success: function(success){
					var string="<div id='field'>";
					for (var i = 0; i<= success.length; i++){
						if (success[i] != null && success[i] != ""){
							var req = success[i][0].replace(/:/g," ");
							
							string+="<div class='panel'> \
									<label id='result"+success[i][1]+"' class='req-label'>"+req+"."+"</label>\
									<label class='req-btn'>\
										<button type='button' class='btn btn-default' onClick='createEditForm("+success[i][1]+")' aria-label='Left Align'>\
											<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>\
										</button>\
									</label>\
									<label class='req-btn'>\
										<button type='button' class='btn btn-default' onClick='deleteReq("+success[i][1]+")' aria-label='Right Align'>\
											<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>\
										</button>\
									</label></div>";
						}
					}
					string+="</div>";
					body.html(string);
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

	
	$.ajax({
			url: "php/getReqForEdit.php",
			type: "POST",
			data: {"id": id},
			dataType: "json",
			success: function(req){
					var wann = req.split(":")[0];
					var muss =req.split(":")[1];
					var wer =req.split(":")[2];
					var wem = req.split(":")[3];
					var bieten =req.split(":")[4];
					var objekt = req.split(":")[5];
					var verb = req.split(":")[6];

					body.html("<h3 class='marginClass'>Hallo "+user+", bearbeiten Sie Ihre Anforderung:</h3>\
						<fieldset>\
						<div class='col-md-3'><input type='text' class='form-control' name='wann' id='wann' value='"+wann+"'></div>\
						<div class='col-md-2'><select class='form-control' name='muss' id='muss'>\
							<option>muss</option>\
							<option>sollte</option>\
							<option>wird</option>\
						</select></div>\
						<div class='col-md-2'><input type='text' class='form-control' name='system' id='system' value='"+wer+"'></div>\
						<div class='col-md-2'><input type='text' class='form-control' name='wem' id='wem' value='"+wem+"'></div>\
						<div class='col-md-2'><select class='form-control' name='bieten' id='bieten'>\
							<option>fähig sein</option>\
							<option>die Möglichkeit bieten</option>\
						</select></div>\
						</fieldset></br>\
						<fieldset>\
						<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' value='"+objekt+"'></div>\
						<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb' value='"+verb+"'></div>\
						</fieldset>\
						<button class='btn btn-success marginClass' id='reg_submit' onClick='edit("+id+")'>Bestätigen</button>");
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