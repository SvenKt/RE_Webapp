function initArrayLength(){
var arr = new Object();
var arrayOfTimeStamps;
var user= getUserName();
$.ajax({
			url: "php/getUpdates.php",
			type: "POST",
			data: {"username": user},
			dataType: "json",
			success: function(success){
						arr.length=success.length;
						console.log(arr.length);
						localStorage.setItem("array", JSON.stringify(arr));
				},
			error: function(){alert("error");}
			});
}

function setArrayLength(val){
var arr = JSON.parse(localStorage.getItem("array"));
arr.length=val;
localStorage.setItem("array", JSON.stringify(arr));
}

function getArrayLength(){
var arr = JSON.parse(localStorage.getItem("array"));
return arr.length;
}


function createUser(name, cookie){
var user = new Object();
user.name= name;
user.cookie= cookie;
//objekt user wird in den lokalen datenstream übertragen, um überall verfügbar zu sein.
localStorage.setItem("user", JSON.stringify(user));
}

function getUserName(){
var user = JSON.parse(localStorage.getItem("user"));
return user.name; 
}


function getUserCookie(){
var user = JSON.parse(localStorage.getItem("user"));
return user.cookie; 
}

function setDatabaseCookie(ref_cookie){
var user = JSON.parse(localStorage.getItem("user"));
user.referenceCookie = ref_cookie;
localStorage.setItem("user", JSON.stringify(user));
}


function getDatabaseCookie(){
var user = JSON.parse(localStorage.getItem("user"));
return user.referenceCookie; 
}

function loadCookieFromDatabase(doAfterFinished){
$.ajax({
			url: "php/getCookie.php",
			type: "POST",
			data: {"username" : getUserName() },
			dataType: "json",
			success: function(cookieFromDatabase){setDatabaseCookie(cookieFromDatabase); doAfterFinished();},
			});
	return true;
}


function redirectToDashboard(){
	if (getUserName() == 'admin'){
		window.location="adminpage.html";
	} else {
		window.location="dashboard.php";
	}
}

function StoreCookieIntoDatabase(number, user, doAfterFinished){
$.ajax({
			url: "php/setCookie.php",
			type: "POST",
			data: {"cookie": number, "username" : user },
			dataType: "json",
			success: function(success){ doAfterFinished();}
			});
}