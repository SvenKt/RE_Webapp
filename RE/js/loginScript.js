////////////////
//USES user.js//
////////////////
$(document).ready(function(){
$("#read").hide();
$("#error").hide();
//leite auch weiter, wenn enter gedrückt wurde
$(document).keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			checkCredentials();
		}
		event.stopPropagation();
	});
});

function checkCredentials(){
var user=$("#userPHP").val();
var pass=$("#passPHP").val();
var cookie="";

$.ajax({
			url: "php/loginCheck.php",
			type: "POST",
			data: {"username": user, "password": pass},
			dataType: "json",
			success: function(exists){
				if(exists == 'true'){
				cookie = Math.round(Math.random()*999999);
				
				createUser(user,cookie);
				StoreCookieIntoDatabase(cookie, user, redirectToDashboard);		
				
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
