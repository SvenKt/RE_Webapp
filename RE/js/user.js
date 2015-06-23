var sessionID;

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
						//console.log(arr.length);
						localStorage.setItem("array", JSON.stringify(arr));
				},
			error: function(){alert("error");}
			});
}


function getParameter(param){
    var url = window.location.search.substring(1);
    var variables = url.split('&');
    for (var i = 0; i < variables.length; i++) 
    {
        var varName = variables[i].split('=');
        if (varName[0] == param) 
        {
            return varName[1];
        }
    }
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

function Length(){
var arr = JSON.parse(localStorage.getItem("array"));
return arr.length;
}


function createUser(name, cookie){
var user = new Object();
sessionID = Date.now();
user.name= name;
user.cookie= cookie;
//objekt user wird in den lokalen datenstream übertragen, um überall verfügbar zu sein.
localStorage.setItem("user"+sessionID, JSON.stringify(user));
return sessionID;
}

function getUserName(){
var user;
if (window.location.pathname.search("dash") != -1){	 
	 user = JSON.parse(localStorage.getItem("user"+getParameter("session")));
} else {
	 user = JSON.parse(localStorage.getItem("user"+sessionID));
}
return user.name; 
}


function getUserCookie(){
var user = JSON.parse(localStorage.getItem("user"+getParameter("session")));
return user.cookie; 
}

function setDatabaseCookie(ref_cookie){
var user = JSON.parse(localStorage.getItem("user"+getParameter("session")));
user.referenceCookie = ref_cookie;
localStorage.setItem("user"+getParameter("session"), JSON.stringify(user));
}


function getDatabaseCookie(){
var user = JSON.parse(localStorage.getItem("user"+getParameter("session")));
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
		window.location="adminpage.html?session="+sessionID;
	} else {
		window.location="dashboard_de.php?session="+sessionID;
	}
}

function StoreCookieIntoDatabase(number, user, doAfterFinished){
$.ajax({
			url: "php/setCookie.php",
			type: "POST",
			data: {"cookie": number, "username" : user },
			dataType: "json",
			success: function(success){ doAfterFinished();
			}
			});
}

function logOut(){
	localStorage.removeItem("user"+getParameter("session"));
	location.replace("index.php");
}