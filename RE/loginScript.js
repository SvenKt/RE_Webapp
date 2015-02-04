
$(document).ready(function(){
$("#read").hide();
});

function checkCredentials(){
var user=$("#userPHP").val();
var pass=$("#passPHP").val();

$.ajax({
			url: "loginCheck.php",
			type: "GET",
			data: {"username": user, "password": pass},
			dataType: "json",
			success: function(exists){
				if(exists == 'true'){
				window.location="/bla.php?"+user;
				} else {
				$("#read").text("Bitte korrekte Daten eingeben!").slideDown(500).delay(2000).slideUp(500);
				//document.getElementById('read').innerHTML="Bitte korrekte Daten eingeben!";
				}
			},
			error: function(){alert("error");}
			});


}