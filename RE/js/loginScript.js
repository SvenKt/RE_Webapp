
$(document).ready(function(){
$("#read").hide();
$("#error").hide();
});

function checkCredentials(){
var user=$("#userPHP").val();
var pass=$("#passPHP").val();

$.ajax({
			url: "php/loginCheck.php",
			type: "POST",
			data: {"username": user, "password": pass},
			dataType: "json",
			success: function(exists){
				if(exists == 'true'){
				window.location="/RE/dashboard.php?username="+user;
				} else {
				$("#read").text("Bitte korrekte Daten eingeben!").slideDown(500).delay(2000).slideUp(500);
				}
			},
			error: function(){alert("error");}
			});


}

function registerUser(){
var username=$("#reg_user").val();
var password=$("#reg_pw").val();
var password_repeat=$("#reg_pw2").val();
var email=$("#reg_email").val();

$.ajax({
			url: "php/registerUser.php",
			type: "POST",
			data: {"username": username, "password": password, "password2": password_repeat, "email": email},
			dataType: "json",
			success: function(success){
				$("#head_modal").text(success).slideDown(500).delay(2000).slideUp(500);
				if (success.search("Fehler") == -1){ window.setTimeout(function(){$('#register').modal('hide'); }, 2000);};
			},
			error: function(){alert("error");}
			});

}

function changeData(){
var password=$("#ch_pw").val();
var password_repeat=$("#ch_pw2").val();
var email=$("#ch_email").val();
var username=$("#user_cd").text();

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
var user= getUsername();

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
				  <option>fähig sein</option>\
				  <option>die Möglichkeit bieten</option>\
				</select></div>\
				</fieldset></br>\
				<fieldset>\
				<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' placeholder='Objekt?'></div>\
				<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb' placeholder='Verb?'></div>\
				</fieldset>\
		<button class='btn btn-success marginClass' id='reg_submit' onClick='insertReq()'>Bestätigen</button>");

}

function getUsername(){
var value = window.location.search.replace("?", "");
var result= value.split('=')[1];
return result;
}

function push(){
var body=$('#content');
body.html("<label class='req-label'>Das System muss dem Nutzer die Möglichkeit bieten, sich einloggen zu können.</label>\
					  <label class='req-btn'>\
						<button type='button' class='btn btn-default' aria-label='Left Align'>\
							<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>\
						</button>\
						<button type='button' class='btn btn-default' aria-label='Left Align'>\
							<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>\
						</button>\
					  </label>");

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

var theRequirement = wann + " " + muss + " " + system + " " + wem + bieten + objekt + " " + verb + ".";
alert(theRequirement);
}