
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
				window.location="/RE/dashboard.php?"+user;
				} else {
				$("#read").text("Bitte korrekte Daten eingeben!").slideDown(500).delay(2000).slideUp(500);
				}
			},
			error: function(){alert("error");}
			});


}