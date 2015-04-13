////////////////
//USES user.js//
////////////////

$(document).ready(function(){
refreshTeamData(true);
$(this).tooltip();
$("#accordion").accordion({collapsible: true});

//enter best�tigung beim erstellen von teams
$("#team_name").keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			createTeam();
		}
		event.stopPropagation();
	});

//enter best�tigung beim hinzuf�gen von teammitgliedern
$("#team_user").keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		addTeamMember();
	}
	event.stopPropagation();
});

//enter best�tigung im suchfeld
$("#search_field").keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13'){
			getResult();
		}
		event.stopPropagation();
	});
});

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
						<option>f�hig sein,</option>\
						<option>die M�glichkeit bieten,</option>\
					</select></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' placeholder='Objekt?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb' placeholder='Verb?'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='identity' id='identity' placeholder='ID?'></div>\
					<div class='col-md-4'><input type='text' class='form-control' name='relations' id='relations' placeholder='Abh�ngigkeiten? (optional)'></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'>Priorit�t:<input type='number' class='form-control' name='prio' id='prio' max=3 min=0 step=1 value=0 onkeydown='return false'></div>\
					<div class='col-md-3'>Status:<select id='status' class='form-control'>\
													<option>im Backlog</option>\
													<option>in Bearbeitung</option>\
													<option>in Testphase</option>\
													<option>abgeschlossen</option>\
												</select>\
					</div>\
				</fieldset>\
		<button class='btn btn-success marginClass' id='reg_submit' onClick='insertReq()'>Best�tigen</button>");

}

//Formular f�r Anforderung bearbeiten
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
			wann = req[0].split(":")[0];
			muss =req[0].split(":")[1];
			wer =req[0].split(":")[2];
			wem = req[0].split(":")[3];
			bieten =req[0].split(":")[4];
			objekt = req[0].split(":")[5];
			verb = req[0].split(":")[6];
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
						<option>f�hig sein,</option>\
						<option>die M�glichkeit bieten,</option>\
					</select></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'><input type='text' class='form-control' name='objekt'	id='objekt' value='"+objekt+"'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='verb' id='verb'  value='"+verb+"'></div>\
					<div class='col-md-2'><input type='text' class='form-control' name='identity' id='identity'  value='"+p_id+"'></div>\
					<div class='col-md-3'><input type='text' class='form-control' name='relations' id='relations'  value='"+p_rel+"'></div>\
				</fieldset></br>\
				<fieldset>\
					<div class='col-md-2'>Priorit�t:<input type='number' class='form-control' name='prio' id='prio' max=3 min=0 step=1 value='"+priority+"' onkeydown='return false'></div>\
					<div class='col-md-3'>Status:<select id='status' class='form-control'>\
						<option>"+p_status+"</option>\
						<option>im Backlog</option>\
						<option>in Bearbeitung</option>\
						<option>in Testphase</option>\
						<option>abgeschlossen</option>\
					</select>\
					</div>\
				</fieldset>\
				<button class='btn btn-success marginClass' id='reg_submit' onClick='edit("+id+")'>Best�tigen</button>");
		}
	});
}