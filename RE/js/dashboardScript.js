////////////////
//USES user.js//
////////////////

$(document).ready(function(){
	$("#error").hide();
	$("#dialog").hide();
	refreshTeamData(true);
	//$("#dialog_team_modal").hide(); //nicht genutzt?
	initArrayLength();
	initNews();
	resetFeed();
	//content
});

function make100Reqs(){
	var currentTime = Date.now();
	for(var i=0; i<1000; i++){
	var theRequirement = "Das" + "&req#" + "muss" + "&req#" + "Requirement" + "&req#" + "Nummer" +"&req#" + "fähig sein" + "&req#" + "i" + "&req#" + i;
			$.ajax({
				url: "php/insertRequirement.php",
				type: "POST",
				data: {"req": theRequirement, "prio": i%3, "username": getUserName(), "id": i, "status": "im Backlog", "relations": "", "currentTime": currentTime},
				dataType: "json",
				success: function(success){
				// nichts
				console.log(i);
				}
			});
	}
}

var theIntervalId;
var updateTimeInSec = 3;

function initNews(){
	var news= new Object();
	news.amount=0;
	localStorage.setItem("news", JSON.stringify(news));
}
function getNews(){
	var news = JSON.parse(localStorage.getItem("news"));
	return news.amount;
}
function setNews(val){
	var news = JSON.parse(localStorage.getItem("news"));
	news.amount=val;
	localStorage.setItem("news", JSON.stringify(news));
}

//activate interval
function updateOn() {
	getUpdateCount();
	//check no intervall is set
	if(!theIntervalId){
		//save the intervall id to clear later
		theIntervalId = setInterval(function(){ 
			//code here will be run every updateTimeInSec seconds
			if(!getUpdateCount()){
				console.log("nichts passiert");
			}
		}, updateTimeInSec*1000);
	}
}
//stop interval
function updateOff() {
	console.log("update off");
	//clear intervall and reset id variable
	clearInterval(theIntervalId);
	theIntervalId = "";
}
//what happens when the button is clicked
function update() {
	getRequirements();
	setNews(0);
	resetFeed();
	$("#newsNumber").text(getNews());
	$('#main-nav').find('.active').removeClass('active');
	$('#main-nav').children().first().addClass('active');
}


function resetFeed(){
	$("#feed").html("");
	$("#feed").hide();
	starNum = 1;
}

var starNum = 1;
function addMessageToFeed(message){
	var feed = $("#feed");
	feed.show();
	var string="";
	string = "<div class='panel panel-default'>\
				"+message+"<br>"+timeConverter(Date.now())+"\
				<img id='star"+starNum+"' src='img/star.png' alt='star'>\
			 </div>"+ feed.html();
	feed.html(string);

	$("#star"+starNum).fadeOut(updateTimeInSec*1000);
/*	for( var i=1; i<=starNum; i++){
		$("#star"+i).fadeOut(3000);
	} */
	starNum++;
}


//get number of updates
var length;
function getUpdateCount() {
var oldLength=getArrayLength();
var user= getUserName();
var changes = false;
var messageToDisplay="";
$.ajax({
			url: "php/getUpdates.php",
			type: "POST",
			data: {"username": user},
			dataType: "json",
			success: function(success){
						length=success.length;
						if (oldLength < length){
							console.log("neue req dazu");
							messageToDisplay="Neue Anforderung gefunden";
							setNews(getNews()+1);
							addMessageToFeed(messageToDisplay);
							changes =  true;
						} else if (oldLength > length){
							console.log("req gelöscht");
							messageToDisplay="Anforderung gelöscht";
							setNews(getNews()+1);
							addMessageToFeed(messageToDisplay);
							changes = true;
						} else {
							for( var i=0; i < length; i++) {
								if(success[i] > lastReadFromDb) {
									console.log("req editiert");
									messageToDisplay="Anforderung bearbeitet";
									setNews(getNews()+1);
									addMessageToFeed(messageToDisplay);
									changes = true;
								}
							}
						}
				if(getNews() > 0){		
-					$('#newsNumber').css({"background-color": "red", "color": "white"});		
 				}
				setArrayLength(length);
				lastReadFromDb = Date.now();
				//console.log(getNews());
				$("#newsNumber").text(getNews());
				},
			error: function(){alert("error");}
			});
	return changes;
}

//ändern der Nutzerdaten
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

//Eingaben der Anforderung kontrollieren
function checkRequirement(){
	if($('#wann').val() == ""){fieldError(); return false;}
	if($('#system').val() == ""){fieldError(); return false;}
	if($('#objekt').val() == ""){fieldError(); return false;}
	if($('#verb').val() == ""){fieldError(); return false;}
	var reqId=$('#identity').val();
	if(isNaN(reqId) || reqId < 0 || reqId == ""){$('#error').text("Bitte einen gültigen ID Wert größer / gleich 0 angeben!").slideDown(500).delay(2000).slideUp(500); return false;}
	return true;
}

//error Benachrichtigung bei Fehlerhafter Eingabe
function fieldError(){
$('#error').text("Bitte alle nicht-optionalen Felder ausfüllen").slideDown(500).delay(2000).slideUp(500);
}

//Eintragen der zusammengefügten Anforderung
function insertReq(origin){
	if(checkRequirement()){
		var user=$('#content');
		var wann=$('#wann').val();
		var muss=$('#muss').val();
		var system=$('#system').val();
		var wem="";
		var bieten=$('#bieten').val();
		var objekt=$('#objekt').val();
		var verb=$('#verb').val();
		var prio=$('#prio').val();
		var reqId=$('#identity').val();
		var reqStatus=$('#status option:selected').text();
		var relations=$('#relations').val();
		if($('#wem').val() != ""){
			wem=$('#wem').val() + " ";
		}
		var theRequirement = wann + "&req#" + muss + "&req#" + system + "&req#" + wem +"&req#" + bieten + "&req#" + objekt + "&req#" + verb;
		
		if(	loadCookieFromDatabase(cookiesEqual)){
		var currentTime = Date.now();
			$.ajax({
				url: "php/insertRequirement.php",
				type: "POST",
				data: {"req": theRequirement, "prio": prio, "username": getUserName(), "id": reqId, "status": reqStatus, "relations": relations, "currentTime": currentTime},
				dataType: "json",
				success: function(success){
					$('#error').text(success).slideDown(500).delay(2000).slideUp(500);
					if (success.search("Fehler") == -1){
						getUpdateCount();
						switch (origin) {
							case 0:	createReqForm();break;
							case 1: getRequirements();break;
							default: getRequirements(); break;
						}
					}
				}
			});
		} else alert("Cookie-fehler");
	}//else alert("Anforderungsfehler");
} 


//löschen einer Anforderung
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

//Auslesen der Anforderungen
var lastReadFromDb;
function getRequirements(query){
var user= getUserName();
var search = query;
$.ajax({
			url: "php/getRequirements.php",
			type: "POST",
			data: {"username": user, "query": search},
			dataType: "json",
			success: function(success){
				
						lastReadFromDb = Date.now();
						setNews(0);
						$("#newsNumber").text(getNews());
						$('#newsNumber').css({"background-color": "white", "color": "#337ab7"});
						resetFeed();
						displayedRequirements = success;
						reversedID = true;
						sortById(displayedRequirements);
						setTable(displayedRequirements);
						refreshExport(displayedRequirements);
				},
			error: function(){alert("error");}
			});
	
}
//Sortier Funktionen -------------------------------------------------------------------------------------------
//arr nach id sortieren
var reversedID = false;//variable für Umkehren bei erneutem Klicken
function sortById(arr){
	if (arr.length != 0){
						arr.sort(function(a, b){return a[3]-b[3]});
						if(reversedID == false){
							arr.reverse();
							reversedID = true;
						} else {
							reversedID = false;
						}
					}
	displayedRequirements = arr;
	setTable(displayedRequirements);
	refreshExport(displayedRequirements);
}

//arr nach Anforderungen alphabetisch sortieren
var reversedReq = false;//variable für Umkehren bei erneutem Klicken
function sortByReq(arr){
	if (arr.length != 0){
						arr.sort(function(a, b){
							var stringA=a[0].toLowerCase(), stringB=b[0].toLowerCase(); //gross und kleinschreibung ignorieren
							if (stringA < stringB) //sortieren
								return -1;
							if (stringA > stringB)
								return 1;
							return 0; //default
						});
						if(reversedReq == false){
							arr.reverse();
							reversedReq = true;
						} else {
							reversedReq = false;
						}
					}
	displayedRequirements = arr;
	setTable(displayedRequirements);
	refreshExport(displayedRequirements);
}

//arr nach prio sortieren
var reversedPrio = false;//variable für Umkehren bei erneutem Klicken
function sortByPrio(arr){
	if (arr.length != 0){
						arr.sort(function(a, b){return a[2]-b[2]});
						if(reversedPrio == false){
							arr.reverse();
							reversedPrio = true;
						} else {
							reversedPrio = false;
						}
					}
	displayedRequirements = arr;
	setTable(displayedRequirements);
	refreshExport(displayedRequirements);
}

//arr nach Anforderungen alphabetisch sortieren
var reversedStatus = false; //variable für Umkehren bei erneutem Klicken
function sortByStatus(arr){
	if (arr.length != 0){
						arr.sort(function(a, b){
							var stringA=a[4].toLowerCase(), stringB=b[4].toLowerCase(); //gross und kleinschreibung ignorieren
							if (stringA < stringB) //sortieren
								return -1;
							if (stringA > stringB)
								return 1;
							return 0; //default
						});
						if(reversedStatus == false){
							arr.reverse();
							reversedStatus = true;
						} else {
							reversedStatus = false;
						}
					}
	displayedRequirements = arr;
	setTable(displayedRequirements);
	refreshExport(displayedRequirements);
}
//arr nach Zeit sortieren
var reversedTime = false;//variable für Umkehren bei erneutem Klicken
function sortByTime(arr){
	if (arr.length != 0){
						arr.sort(function(a, b){return a[6]-b[6]});
						if(reversedTime == false){
							arr.reverse();
							reversedTime = true;
						} else {
							reversedTime = false;
						}
					}
	displayedRequirements = arr;
	setTable(displayedRequirements);
	refreshExport(displayedRequirements);
}

//Time converter to change timestamp from DB to a string
function timeConverter(UNIX_timestamp){
	var a = new Date(UNIX_timestamp*1); // *1 to get a number
	var months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
	//var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	if(min < 10){
		min = "0" + min;		
	}
	var time = date + '. ' + month + ' ' + year + ' ' + hour + ':' + min;
	return time;
}
//Anzeigen der Anforderungen
var displayedRequirements; //Globales Array für onclick() Funktionen der Tabelle
function setTable(requirementsArray){
	var string="";
	var body=$('#content');
	var priority;
	var p_id;
	var p_status;
	var p_rel;
	var req;
	var req_id;
	var p_timestamp;
	var p_time;
	displayedRequirements = requirementsArray;
	for (var i = 0; i < requirementsArray.length; i++){
							req = requirementsArray[i][0].replace(/&req#/g," ");
							req_id=requirementsArray[i][1];
							priority=requirementsArray[i][2];
							p_id=requirementsArray[i][3];
							p_status=requirementsArray[i][4];
							p_rel=requirementsArray[i][5];
							p_timestamp=requirementsArray[i][6];
							p_time = timeConverter(p_timestamp);
							//Tabelleninhalt
							string+="<tr>\
									<th>"+p_id+"</th>\
									<th id='result"+req_id+"'>"+req+".</th>\
									<th scope='row'>"+priority+"</th>\
									<th>"+p_status+"</th>\
									<th>"+p_rel+"</th>\
									<th>"+p_time+" Uhr</th>\
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
					
					//Tabellenrahmen
					body.html("<div id='field' class='panel panel-default'>\
								<table class='table'><thead style='background-color:#E6E6E6'>\
								<tr>\
									<th class='col-md-1' id='sortHead' onclick='sortById(displayedRequirements)' title='Klicken zum Sortieren nach ID'>ID</th>\
									<th class='col-md-5' id='sortHead' onclick='sortByReq(displayedRequirements)' title='Klicken um alphabetisch zu sortieren'>Anforderung</th>\
									<th class='col-md-1' id='sortHead' onclick='sortByPrio(displayedRequirements)' title='Klicken zum Sortieren nach Priorität'>Priorität</th>\
									<th class='col-md-1' id='sortHead' onclick='sortByStatus(displayedRequirements)' title='Klicken zum Sortieren nach Status'>Status</th>\
									<th class='col-md-1'>Abhängigkeiten</th>\
									<th class='col-md-1' id='sortHead' onclick='sortByTime(displayedRequirements)' title='Klicken um nach Änderungsdatum zu sortieren'>Geändert am</th>\
									<th class='col-md-2'>Optionen</th>\
								</tr></thead>\
								<tbody>\
									"+string+"\
								</tbody></table></div>"
					);
}

function logOut(){
	location.replace("index.php");
}

function edit(id){
	if (loadCookieFromDatabase(cookiesEqual)){
		//muss erst gelöscht werden, damit abhängigkeiten und bedingungen erfüllt bleiben
		if(checkRequirement()){
			getUpdateCount();
			deleteReq(id, insertReq);
			setNews(getNews()-1);
		}
	} else {
		alert ("fehler");
	}
}

function getResult(){
	$('#main-nav').find('.active').removeClass('active');
	$('#main-nav li:first-child').addClass('active');
	var searchQuery=$("#search_field").val();
	getRequirements(searchQuery);	
}


function cookiesEqual(){
	//console.log("user "+getUserCookie() + " db " + getDatabaseCookie());
	return (getUserCookie() == getDatabaseCookie());
}

//Löschen bestätigen
function confirmRemoval(reqID){
	$( "#dialog" ).dialog({
		resizable: false,
		height: 140,
		width: 400,
		title: "Anforderung wirklich löschen?",
		modal: true,
		buttons: {
			"Anforderung löschen!": function() {
				getUpdateCount();
				deleteReq(reqID,placeholder);
				$( this ).dialog( "close" );
			},
			"doch nicht": function() {
				$( this ).dialog( "close" );
			}
		}
	});
}
//Anforderungen als .csv exportieren
function refreshExport(arr){
	var user = getUserName();
	var csvRows = new Array();
	var prio;
	var req;
	var p_id; //id der anforderung im team p -> projekt
	var p_status;
	var p_rel;
	var req_id;

	// csv daten aufbereiten	
	csvRows.push("ID"+"\t"+"Anforderung"+"\t"+"Priorität"+"\t"+"Status"+"\t"+"Abhängigkeiten");
	for (var i = 0; i< arr.length; i++){
		req = arr[i][0].replace(/&req#/g," ");
		prio = arr[i][2];
		p_id=arr[i][3];
		p_status=arr[i][4];
		p_rel=arr[i][5];
		csvRows.push(p_id+"\t"+req+"\t"+prio+"\t"+p_status+"\t"+p_rel);
	}
	
	//csv datei anlegen
	var csvData = csvRows.join("\n");
	var uri = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvData);
	var fileName = "Anforderungen.csv";
	
	//link setzen
	$("#download_reqs").attr("href",uri);
	$("#download_reqs").attr("target",'_blank');
	$("#download_reqs").attr("download", 'Anforderungen.csv' );
}
	
	//});
//} 

function placeholder(){
//für funktionen, die eine funktion als param benötigen
//aber diese für den jeweiligen zweck undienlich ist.
}

function getUsersTeamID(userID){
//implementieren!!!!
//über team_id des users die project_ids der reqs bei edit() prüfen
//dann nur löschen, wenn req wieder eingefügt werden kann
// checkInput() -> comparePIDs(getUserTeamID(),newIDFromInputField) -> delete -> insert 

}