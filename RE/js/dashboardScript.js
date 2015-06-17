////////////////
//USES user.js//
////////////////

$(document).ready(function(){
	$("#error").hide();
	$("#dialog").hide();
	initArrayLength();
	refreshTeamData();
	initNews();
	resetFeed();
	//content
	
	$(window).load(function() {
		getRequirements();
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(2000).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(2000).css({'overflow':'visible'});
	});
});


function make10Reqs(){
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
				}
			});
	}
}

var theIntervalId;
var updateTimeInSec = 2;
var newsAmount;
function initNews(){
	newsAmount=0;
}

function getNews(){
	return newsAmount;
}

function setNews(val){
	newsAmount=val;
}

//activate interval
function updateOn() {
	console.log("updateOn");
	//getUpdateCount();
	//check no intervall is set
	if(!theIntervalId){
		//save the intervall id to clear later
		theIntervalId = setInterval(function(){
			//code here will be run every updateTimeInSec seconds
			getUpdateCount();
		}, updateTimeInSec*1000);
	}
}
//stop interval (unused)
function updateOff() {
	console.log("update off");
	//clear intervall and reset id variable
	clearInterval(theIntervalId);
	theIntervalId = "";
}
//what happens when the button is clicked
function update() {
	resetFeed();
	setNews(0);
	getRequirements();
	$("#newsNumber").text(getNews());
	$('#main-nav').find('.active').removeClass('active');
	$('#main-nav').children().first().addClass('active');
}

//Feed reset
function resetFeed(){
	$("#feed").html("");
	$("#feed").hide();
	starNum = 1;
}

//Nachricht zum Feed hinzufügen
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
	starNum++;
}
var feedMessage="";
function setFeedMessage(mess){
	feedMessage=mess;
}
function getFeedMessage(){
	return feedMessage;
}
//get number of updates
var length=getArrayLength();
var failedOnce = false;
function getUpdateCount() {
//länge wird erst bei nächsten zyklus neu gesetzt, damit alle anderen clients die änderung mitbekommen
	setArrayLength(length);
	var oldLength=getArrayLength();
	var user= getUserName();
	var changes = false;
	var messageToDisplay="";
	checkHelpEnabled();
	$.ajax({
			url: "php/getUpdates.php",
			type: "POST",
			data: {"username": user},
			dataType: "json",
			success: function(success){
						//Nachschauen was genau passiert ist
						length=success.length;
						//console.log(oldLength+"   "+length)
						if(!justEnteredTeam){
							if (oldLength < length){
								console.log("neue req dazu");
								if(getFeedMessage() == ""){
									setFeedMessage(reqForm.feed_create);
								} 
								setNews(getNews()+1);
								addMessageToFeed(getFeedMessage());
								setFeedMessage("");
								changes =  true;
							} else if (oldLength > length){
								console.log("req gelöscht");
								if(getFeedMessage() == ""){
									setFeedMessage(reqForm.feed_del);
									addMessageToFeed(getFeedMessage());
									setFeedMessage("");
									setNews(getNews()+1);
								} else {
									resetFeed();
									setNews(0);
								}
								changes = true;
							} else {
								for( var i=0; i < length; i++) {
									if(success[i] > lastReadFromDb) {
										console.log("req editiert");
										setFeedMessage(reqForm.feed_edit);
										setNews(getNews()+1);
										addMessageToFeed(getFeedMessage());
										setFeedMessage("");
										changes = true;
									}
								}
							}
						}
				justEnteredTeam = false;
				if(getNews() > 0){		
-					$('#newsNumber').css({"background-color": "red", "color": "white"});		
 				}
				lastReadFromDb = Date.now();
				if(getNews()>=0){
					$("#newsNumber").text(getNews());
				}
				failedOnce = false;
			},
			error: function(){
				//updates bei fail deaktivieren. Variable notwendig, da durch AJAX sonst 2 Boxen entstehen.
				if (failedOnce) {
					if (confirm("Error: Automatic update failed.\nTo disable press OK.") == true) {	}
					else { updateOn(); failedOnce = false;}
				} else { updateOff(); failedOnce = true; }
			}
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
			success: function(code){
			var mess;
				switch (code) {
					case 0: mess= changeData.mess0; break;
					case 1: mess= changeData.mess1; break;
					case 2: mess= changeData.mess2; break;
					case 3: mess= changeData.mess3; break;
					case 4: mess= changeData.mess4; break;
					case 5: mess= changeData.mess5; break;
				}

				$("#head_modal_dash").text(mess).slideDown(500).delay(2000).slideUp(500);
				if ((mess.search("Fehler") == -1) && (mess.search("Error") == -1) ){ window.setTimeout(function(){$('#profil').modal('hide'); }, 2000);};
			},
			error: function(){alert("Error: Changing userdata failed.");}
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
					if ((success.search("Fehler") == -1) && (success.search("Error") == -1)){
						getUpdateCount();
						switch (origin) {
							case 0:	createReqForm();break;
							case 1: getRequirements();break;
							default: getRequirements(); break;
						}
					}
					setFeedMessage(reqForm.feed_create_u);
				},
				error: function(){alert("Error: Writing requirement to DB failed.");}
			});
		} else alert("Cookie-error");
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
			},
			error: function(){alert("Error: Deleting requirement failed.");}
		});
	} else {
		alert("Cookie-error");
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
			beforeSend: function() { $('body').addClass('busy'); },
			success: function(success){
						//News reset, da ab hier alles aktuell
						lastReadFromDb = Date.now();
						if(getNews()==0){
							$("#newsNumber").text(getNews());
						}
						$('#newsNumber').css({"background-color": "white", "color": "#337ab7"});
						//Anforderungen darstellen
						displayedRequirements = success;
						reversedID = true;
						sortById(displayedRequirements);
						//setTable(displayedRequirements);
						refreshExport(displayedRequirements);
				},
			error: function(){alert("Error: Getting requirements failed.");},
			complete: function() { $('body').removeClass('busy'); }
			});
	
}
//Sortier Funktionen -------------------------------------------------------------------------------------------
//arr nach id sortieren
var reversedID = false;//variable für Umkehren bei erneutem Klicken
function sortById(arr){
	$.ajax({
		url: "",
		beforeSend: function() { $('body').addClass('busy'); },
		success: function (success) {
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
		},
		complete: function() { $('body').removeClass('busy'); }
	});
}

//arr nach Anforderungen alphabetisch sortieren
var reversedReq = false;//variable für Umkehren bei erneutem Klicken
function sortByReq(arr){
	$.ajax({
		url: "",
		beforeSend: function() { $('body').addClass('busy'); },
		success: function (success) {
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
			
		},
		complete: function() { $('body').removeClass('busy'); }
	});
}

//arr nach prio sortieren
var reversedPrio = false;//variable für Umkehren bei erneutem Klicken
function sortByPrio(arr){
	$.ajax({
		url: "",
		beforeSend: function() { $('body').addClass('busy'); },
		success: function (success) {
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
		},
		complete: function() { $('body').removeClass('busy'); }
	});
}

//arr nach Anforderungen alphabetisch sortieren
var reversedStatus = false; //variable für Umkehren bei erneutem Klicken
function sortByStatus(arr){
	$.ajax({
		url: "",
		beforeSend: function() { $('body').addClass('busy'); },
		success: function (success) {
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
		},
		complete: function() { $('body').removeClass('busy'); }
	});
}
//arr nach Zeit sortieren
var reversedTime = false;//variable für Umkehren bei erneutem Klicken
function sortByTime(arr){
	$.ajax({
		url: "",
		beforeSend: function() { $('body').addClass('busy'); },
		success: function (success) {
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
		},
		complete: function() { $('body').removeClass('busy'); }
	});
}

//Time converter to change timestamp from DB to a string
function timeConverter(UNIX_timestamp){
	var a = new Date(UNIX_timestamp*1); // *1 to get a number
	var months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
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
									<th class='sortHead col-md-1' id='sortHead1' onclick='sortById(displayedRequirements)' >"+tableHead.item1+"</th>\
									<th class='sortHead col-md-5' id='sortHead2' onclick='sortByReq(displayedRequirements)' >"+tableHead.item2+"</th>\
									<th class='sortHead col-md-1' id='sortHead3' onclick='sortByPrio(displayedRequirements)' >"+tableHead.item3+"</th>\
									<th class='sortHead col-md-1' id='sortHead4' onclick='sortByStatus(displayedRequirements)' >"+tableHead.item4+"</th>\
									<th class='col-md-1' id='sortHead5'>"+tableHead.item5+"</th>\
									<th class='sortHead col-md-1' id='sortHead6' onclick='sortByTime(displayedRequirements)' >"+tableHead.item6+"</th>\
									<th class='col-md-2' id='sortHead7'>"+tableHead.item7+"</th>\
								</tr></thead>\
								<tbody>\
									"+string+"\
								</tbody></table></div>"
						);
}


//Anforderung bearbeiten
function edit(id){
	if (loadCookieFromDatabase(cookiesEqual)){
		//muss erst gelöscht werden, damit abhängigkeiten und bedingungen erfüllt bleiben
		if(checkRequirement()){
			getUpdateCount(); //überprüfen ob inzwischen etwas geändert wurde
			deleteReq(id, insertReq);
			resetFeed();
			setNews(0);
		}
	} else {
		alert ("Cookie-error");
	}
}

//"Home" aktiv setzen und Tabelle mit Query neu laden
function getResult(){
	$('#main-nav').find('.active').removeClass('active');
	$('#main-nav li:first-child').addClass('active');
	var searchQuery=$("#search_field").val();
	getRequirements(searchQuery);	
}


function cookiesEqual(){
	return (getUserCookie() == getDatabaseCookie());
}

//Löschen bestätigen
function confirmRemoval(reqID){
	
	$( "#dialog" ).dialog({
		resizable: false,
		height: 140,
		width: 400,
		title: deleteReq.confirm,
		modal: true,
		buttons: {
			"OK": function() {
				setFeedMessage(deleteReq.feedMessage);
				getUpdateCount(); //überprüfen ob etwas inzwischen geändert wurde
				deleteReq(reqID,placeholder);
				$( this ).dialog( "close" );
			},
			"Cancel": function() {
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
		csvRows.push("ID"+"\t"+csvtxt.req+"\t"+csvtxt.prio+"\t"+"Status"+"\t"+csvtxt.dep);
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