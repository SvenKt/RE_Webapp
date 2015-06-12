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
function defineTranslationVars(lang){
	//deutsch
	if(lang == "de"){
	//console.log("de");
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
	} 
	if(lang == "en"){
	//englisch
	//console.log("en");
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
	}	
}