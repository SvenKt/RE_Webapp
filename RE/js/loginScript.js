
$(document).ready(function(){
$("#read").hide();
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
			},
			error: function(){alert("error");}
			});

}