////////////////
//USES user.js//
////////////////

$(document).ready(function(){
	$("#accordion").accordion({collapsible: true});
	
	$("#patchnotes").html(patchnotes);
	$("#patchnotes").accordion({collapsible: true});
	
	if($(document).width() < 800){
		//no tooltips enabled
	} else {
		$(this).tooltip();
		$("#left_nav").tooltip({
			position: { my: "left-80vh center", at: "right center" }
		});
		$("#content").tooltip({
			position: { my: "center top-75", collision: "flipfit" },
			track: true,
		});
	}
	
	//enter bestätigung beim erstellen von teams
	$("#team_name").keypress(function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				createTeam();
			}
			event.stopPropagation();
		});

	//enter bestätigung beim hinzufügen von teammitgliedern
	$("#team_user").keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			addTeamMember();
		}
		event.stopPropagation();
	});

	//enter bestätigung im suchfeld
	$("#search_field").keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			getResult();
		}
		event.stopPropagation();
	});
		
	//navlist anpassungen nach Modal
	$('#main-nav li a').on('click', function() {
		oldActive = $(this).parent().parent().find('.active');
		if($(this).attr('id') != "download_reqs") {
			$(this).parent().parent().find('.active').removeClass('active');
			$(this).parent().addClass('active');
		}
	});
	$("#profil").on('hidden.bs.modal', function(){
		$('#main-nav').find('.active').removeClass('active');
		oldActive.addClass('active');
	});
	$("#team_modal").on('hidden.bs.modal', function(){
		$('#main-nav').find('.active').removeClass('active');
		oldActive.addClass('active');
	});
});

var oldActive;

function sizeAccordion(){
$("#accordion").accordion({ heightStyle: "content" });
}

//erzeugen der Input-Felder
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
					<div class='col-md-3'><input type='text' class='form-control' name='system' id='system' placeholder='Systemname?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='wem' id='wem' placeholder='wem? (optional)'></div>\
					<div class='col-md-2'><select class='form-control' name='bieten' id='bieten'>\
						<option>fähig sein,</option>\
						<option>die Möglichkeit bieten,</option>\
					</select></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' placeholder='Objekt?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb' placeholder='Verb?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='identity' id='identity' placeholder='ID?'></div>\
					<div class='col-md-4'><input type='text' class='form-control' name='relations' id='relations' placeholder='Abhängigkeiten? (optional)'></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'>Priorität:<select id='prio' class='form-control'>\
													<option>0</option>\
													<option>1</option>\
													<option>2</option>\
													<option>3</option>\
												</select>\</div>\
					<div class='col-md-3'>Status:<select id='status' class='form-control'>\
													<option>im Backlog</option>\
													<option>in Bearbeitung</option>\
													<option>in Testphase</option>\
													<option>abgeschlossen</option>\
												</select>\
					</div>\
				</fieldset>\
		<button class='btn btn-success marginClass' id='reg_submit' onClick='insertReq(0)'>Bestätigen</button>");

}

//Formular für Anforderung bearbeiten
function createEditForm(id){
	var body=$('#content');
	var user= getUserName();
	var wann, muss, wer, wem, bieten, objekt, verb, priority;
	
	//hole requirement aus datenbank
	$.ajax({
		url: "php/getReqForEdit.php",
		type: "POST",
		data: {"id": id},
		dataType: "json",
		success: function(req){
			console.log(req);
			wann = req[0].split("&req#")[0];
			muss =req[0].split("&req#")[1];
			wer =req[0].split("&req#")[2];
			wem = req[0].split("&req#")[3];
			bieten =req[0].split("&req#")[4];
			objekt = req[0].split("&req#")[5];
			verb = req[0].split("&req#")[6];
			priority = req[1];
			p_id=req[2];
			p_status=req[3];
			p_rel=req[4];
			
			//Erzeuge Edit-Form
			body.html("<h3 class='marginClass'>Hallo "+user+", bearbeiten Sie Ihre Anforderung:</h3>\
				<fieldset>\
					<div class='col-md-3'><input type='text' class='form-control' name='wann' id='wann' value='"+wann+"'></div>\
					<div class='col-md-2'><select class='form-control' name='muss' id='muss'>\
						<option>"+muss+"</option>\
						<option>muss</option>\
						<option>sollte</option>\
						<option>wird</option>\
					</select></div>\
					<div class='col-md-3'><input type='text' class='form-control' name='system' id='system' value='"+wer+"'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='wem' id='wem' value='"+wem+"'></div>\
					<div class='col-md-2'><select class='form-control' name='bieten' id='bieten'>\
						<option>"+bieten+"</option>\
						<option>fähig sein,</option>\
						<option>die Möglichkeit bieten,</option>\
					</select></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' value='"+objekt+"'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb'  value='"+verb+"'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='identity' id='identity'  value='"+p_id+"'></div>\
					<div class='col-md-3'><input type='text' class='form-control' name='relations' id='relations'  value='"+p_rel+"'></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'>Priorität:<select id='prio' class='form-control'>\
													<option>"+priority+"</option>\
													<option>0</option>\
													<option>1</option>\
													<option>2</option>\
													<option>3</option>\
												</select></div>\
					<div class='col-md-3'>Status:<select id='status' class='form-control'>\
						<option>"+p_status+"</option>\
						<option>im Backlog</option>\
						<option>in Bearbeitung</option>\
						<option>in Testphase</option>\
						<option>abgeschlossen</option>\
					</select>\
					</div>\
				</fieldset>\
				<button class='btn btn-success marginClass' id='reg_submit' onClick='edit("+id+")'>Bestätigen</button>");
		}
	});
}
var patchnotes = "\
	<h3><span style='font-style:bold'>Version 1.0</span></h3>\
	<div><ul>\
		<li>Allgemeine Änderungen:</li><ul>\
			<li>Versionsübersicht hinzugefügt</li>\
			<li>Inputfeld für Name wird beim Laden der Loginseite automatisch ausgewählt</li>\
		</ul>\
	</ul></div>\
	\
	<h3>Version 0.9</h3>\
	<div><ul>\
		<li>Allgemeine Änderungen:</li><ul>\
			<li>Feed-Performance verbessert</li>\
			<li>Feed-Nachricht bei neuen Anforderungen geändert</li>\
			<li>Feed-Nachricht bei bearbeiteter Anforderung hinzugefügt</li>\
			<li>Link zu Kontaktmöglichkeiten hinzugefügt</li>\
		</ul></br>\
		<li>Visuelle Änderungen:</li><ul>\
			<li>Stern bei neuen Feeds hinzugefügt</li>\
			<li>Anforderungen sind bei kleinem Bildschirm scrollbar</li>\
		</ul>\
	</ul></div>\
	\
	<h3>Version 0.8</h3>\
	<div><ul>\
		<li>News-Feed hinzugefügt:</li><ul>\
			<li>Information bei neuen / gelöschten Anforderungen</li>\
			<li>Feed wird nach nach Aktualisierung des Dashboards zurückgesetzt</li>\
		</ul></br>\
		<li>Visuelle Änderungen:</li><ul>\
			<li>Login und Dashboard für Mobilgeräte angepasst</li>\
			<li>Neue Positionen für Tooltips</li>\
		</ul></br>\
		<li>Bugfixes:</li><ul>\
			<li>Bugfix bezüglich Uhrzeitanzeige</li>\
		</ul>\
	</ul></div>\
	\
	<h3>Version 0.7</h3>\
	<div><ul>\
		<li>Allgemeine Änderungen:</li><ul>\
			<li>Zu Anforderungen wird der Zeitpunkt der letzten Änderungen angezeigt</li>\
			<li>Automatische Suche nach Änderungen von Anforderungen</li>\
			<li>Anzahl der Änderungen wird dargestellt</li>\
		</ul></br>\
		<li>Visuelle Änderungen:</li><ul>\
			<li>Aussehen des Suche-Buttons geändert</li>\
		</ul></br>\
		<li>Bugfixes:</li><ul>\
			<li>Bugfix bezüglich Menüdarstellung</li>\
		</ul>\
	</ul></div>\
	\
	<h3>Version 0.6</h3>\
	<div><ul>\
		<li>Allgemeine Änderungen:</li><ul>\
			<li>Geschwindigkeit verbessert</li>\
		</ul></br>\
		<li>Visuelle Änderungen:</li><ul>\
			<li>Logo geändert</li>\
		</ul></br>\
		<li>Bugfixes:</li><ul>\
			<li>Bugfix bezüglich der Edit-Funktion</li>\
			<li>Bugfix bezüglich der Tabellendarstellung der Anforderungen</li>\
		</ul>\
	</ul></div>\
	<h3>Version 0.5</h3>\
	<div><ul>\
		<li>Teams hinzugefügt:</li>\
		<ul>\
			<li>Teams erstellen, bearbeiten und löschen</li>\
			<li>Eigenen Teams beitreten oder verlassen</li>\
			<li>Mitglieder zu Teams hinzufügen</li>\
		</ul></br>\
		<li>Visuelle Änderungen:</li><ul>\
			<li>Anzeige von Tooltips hinzugefügt</li>\
		</ul></br>\
		<li>Bugfixes:</li><ul>\
			<li>Bugfix bezüglich Menüdarstellung</li>\
		</ul>\
	</ul></div>\
	";