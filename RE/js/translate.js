var button = {
	ok:"",
	dismiss:""
}
var menu = {
 item1:"",
 item2:"",
 item3:"",
 item4:"",
 item5:"",
 item6:"",
 item1_tt: "",
 item2_tt: "",
 item3_tt: "",
 item4_tt: "",
 item5_tt: "",
 item6_tt: ""
}

var tableHead = {
 item1:"",
 item2:"",
 item3:"",
 item4:"",
 item5:"",
 item6:"",
 item1_tt: "" ,
 item2_tt: "" ,
 item3_tt: "" ,
 item4_tt: "" ,
 item6_tt: "" 
}

var otherContent = {
 search:"",
 sfp:"",
 news:"",
 head_dash1:"",
 head_dash:"",
 news_text:"",
 helpbox:""
}

var modal_team = {
 headline:"",
 subheadline:"",
 topic:"",
 add_members_head:"",
 create_team_Button:"",
 add_mem1:"",
 add_mem2:"" ,
 add_mem_button:""
}

var editForm = {
	greeting:"",
	prio:""
}

var modal_editTeam = {
 headline:""
}

var modal_profile = {
 tophead:"",
 headline:"",
 pw1:"",
 pw2:"",
 mail:""
}

var team = {
 del:""
}

var reqForm = {
 headline:"",
 prio:"",
 status:""
}

var csvtxt = {
 req:"",
 prio:"",
 dep:""
}

var deleteReq = {
 confirm:"",
 feedmessage:""
}
function defineTranslationVars(lang){
	//deutsch
	if(lang == "de"){
	//console.log("de");
	
		team.del="Team mitsamt Anforderungen wirklich löschen?";
		
		deleteReq.confirm="Anforderung wirklich löschen?";
		deleteReq.feedmessage="Sie haben eine Anforderung gelöscht!";
		
		modal_profile.tophead="Profil";
		modal_profile.headline="Geben Sie Ihre neuen Daten ein:";
		modal_profile.pw1="Neues Passwort";
		modal_profile.pw2="Neues Passwort wiederholen";
		modal_profile.mail="Neue E-Mail";	
		
		button.ok="Bestätigen";
		button.dismiss="Abbrechen";
	
		menu.item1_tt ='Gehen Sie zurück auf den Startbildschirm';
		menu.item2_tt ='Erstellen Sie eine neue Anforderung';
		menu.item3_tt ='Erstellen Sie ein Team und arbeiten Sie mit anderen zusammen';
		menu.item4_tt ='Ändern Sie Ihre persönlichen Informationen';
		menu.item5_tt ='Laden Sie Ihre Anforderungen als .csv Datei herunter';
		menu.item6_tt ='Melden Sie sich vom System ab';
	
		tableHead.item1_tt ='Klicken zum Sortieren nach ID';
		tableHead.item2_tt ='Klicken um alphabetisch zu sortieren';
		tableHead.item3_tt ='Klicken zum Sortieren nach Priorität';
		tableHead.item4_tt ='Klicken zum Sortieren nach Status';
		tableHead.item6_tt ='Klicken um nach Änderungsdatum zu sortieren';
		
		tableHead.item1 = "ID";
		tableHead.item2 = "Anforderung";
		tableHead.item3 = "Priorität";
		tableHead.item4 = "Status";
		tableHead.item5 = "Abhängigkeiten";
		tableHead.item6 = "Geändert am";
		tableHead.item7 = "Optionen";
		
		menu.item1="Home";
		menu.item2="Anforderung erstellen";
		menu.item3="Team";
		menu.item4="Profil";
		menu.item5="Download";
		menu.item6="Logout";
		
		otherContent.search ='Durchsuchen Sie Ihre Anforderungen';
		otherContent.sfp = 'Suche...';
		otherContent.news ='Klicken zum Aktualisieren';
		otherContent.head_dash1= "Anforderungen";
		otherContent.head_dash2= "Anforderungen von Team ";
		otherContent.news_text="Aktualisieren   ";
		
		modal_team.headline = 'Teamoptionen';
		modal_team.subheadline ="Meine Teams";
		modal_team.topic = "Team erstellen";
		modal_team.create_team_Button="Team erstellen";
		modal_team.add_members_head="Mitglieder hinzufügen";
		modal_team.add_mem1="Mitglied";
		modal_team.add_mem2="Meine Teams";
		modal_team.add_mem_button="Mitglied hinzufügen";
		modal_team.tbl1="Mitglied";
		modal_team.tbl2="Optionen";
		modal_team.tbl_text="Sie sind Mitglied dieses Teams";
		
		modal_editTeam.headline="Bearbeiten Sie Ihr Team";
		
		editForm.greeting="Hallo "+getUserName()+", bearbeiten Sie Ihre Anforderungen";
		editForm.prio="Priorität";
		
		reqForm.headline="Hallo "+getUserName()+", geben Sie eine neue Anforderung ein:";
		reqForm.prio="Priorität";
		reqForm.status="Status";

		csvtxt.req="Anforderung";
		csvtxt.prio="Priorität";
		csvtxt.dep="Abhängigkeiten";
		
		
	} 
	if(lang == "en"){
	//englisch
	//console.log("en");
	
		team.del="Do you really want to delete the team with all it's requirements?";
		
		deleteReq.confirm="Are you sure?";
		deleteReq.feedmessage="You've deleted a requirement!";
		
		modal_profile.tophead="Profile";
		modal_profile.headline="Change your user data:";
		modal_profile.pw1="New password";
		modal_profile.pw2="Repeat new password";
		modal_profile.mail="New E-Mail";	
	
		button.ok="Send";
		button.dismiss="Cancel";
		
		menu.item1_tt ='Go to home screen';
		menu.item2_tt ='Create a new requirement';
		menu.item3_tt ='Manage your teams and do some teamwork!';
		menu.item4_tt ='change your personal data';
		menu.item5_tt ='Download your requirements a .csv data';
		menu.item6_tt ='Logout from the system';
	
		tableHead.item1_tt ='Click for ID sort';
		tableHead.item2_tt ='Click for alphabetical sort';
		tableHead.item3_tt ='Click for priotity sort';
		tableHead.item4_tt ='Click for status sort';
		tableHead.item6_tt ='Click for date time sort';
	
		tableHead.item1 = "ID";
		tableHead.item2 = "Requirement";
		tableHead.item3 = "Priority";
		tableHead.item4 = "Status";
		tableHead.item5 = "Dependencies";
		tableHead.item6 = "Last change";
		tableHead.item7 = "Options";
		
		menu.item1="Home";
		menu.item2="Create Requirement";
		menu.item3="Team";
		menu.item4="Profile";
		menu.item5="Download";
		menu.item6="Logout";
		
		otherContent.search ='Search for matching requirements';
		otherContent.sfp = 'pattern...';
		otherContent.news ='Click to update';
		otherContent.head_dash1= "Requirements";
		otherContent.head_dash2= "Requirements of team ";
		otherContent.news_text="Update   ";
		
		modal_team.headline = 'Team options';
		modal_team.subheadline ="My teams";
		modal_team.topic = "Create team";
		modal_team.create_team_Button="Create team";
		modal_team.add_members_head="Add members";
		modal_team.add_mem1="Member";
		modal_team.add_mem2="My teams";
		modal_team.add_mem_button="Add member";
		modal_team.tbl1="Member";
		modal_team.tbl2="Options";
		modal_team.tbl_text="You're a member of this team";
		
		modal_editTeam.headline="Edit your team";
		
		editForm.greeting="Hello "+getUserName()+", edit your team ";
		editForm.prio="Priority";
		
		reqForm.headline="Hello "+getUserName()+", enter a new requirement:";
		reqForm.prio="Priority";
		reqForm.status="Status";
		
		csvtxt.req="Requirement";
		csvtxt.prio="Priority";
		csvtxt.dep="Dependencies";
		
	}	
}