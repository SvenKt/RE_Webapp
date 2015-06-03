var l1 ;
var l2 ;
var l3 ;
var l4 ;
var l5 ;
var l6 ;

var sh1 ;
var sh2 ;
var sh3 ;
var sh4 ;
var sh5 ;
	
var search ;
var sfp;
var news ;

var th1;
var th2;
var th3;
var th4;
var th5;
var th6;

var m1;
var m2;
var m3;
var m4;
var m5;
var m6;

var head_dash1;
var head_dash2;

var news_text;

function defineTranslationVars(lang){
	//deutsch
	if(lang == "de"){
	console.log("de");
		l1 ='Gehen Sie zurück auf den Startbildschirm';
		l2 ='Erstellen Sie eine neue Anforderung';
		l3 ='Erstellen Sie ein Team und arbeiten Sie mit anderen zusammen';
		l4 ='Ändern Sie Ihre persönlichen Informationen';
		l5 ='Laden Sie Ihre Anforderungen als .csv Datei herunter';
		l6 ='Melden Sie sich vom System ab';
	
		sh1 ='Klicken zum Sortieren nach ID';
		sh2 ='Klicken um alphabetisch zu sortieren';
		sh3 ='Klicken zum Sortieren nach Priorität';
		sh4 ='Klicken zum Sortieren nach Status';
		sh6 ='Klicken um nach Änderungsdatum zu sortieren';
	
		search ='Durchsuchen Sie Ihre Anforderungen';
		sfp = 'Suche...';
		news ='Klicken zum Aktualisieren';
		
		th1 = "ID";
		th2 = "Anforderung";
		th3 = "Priorität";
		th4 = "Status";
		th5 = "Abhängigkeiten";
		th6 = "Geändert am";
		th7 = "Optionen";
		
		m1="Home";
		m2="Anforderung erstellen";
		m3="Team";
		m4="Profil";
		m5="Download";
		m6="Logout";
		
		head_dash1= "Anforderungen";
		head_dash2= "Anforderungen von Team ";
		
		news_text="Aktualisieren   ";
	} 
	if(lang == "en"){
	//englisch
	console.log("en");
		l1 ='Go to home screen';
		l2 ='Create a new requirement';
		l3 ='Manage your teams and do some teamwork!';
		l4 ='change your personal data';
		l5 ='Download your requirements a .csv data';
		l6 ='Logout from the system';
	
		sh1 ='Click for ID sort';
		sh2 ='Click for alphabetical sort';
		sh3 ='Click for priotity sort';
		sh4 ='Click for status sort';
		sh6 ='Click for date time sort';
	
		search ='Search for matching requirements';
		sfp = 'pattern...';
		news ='Click to update';
		
		th1 = "ID";
		th2 = "Requirement";
		th3 = "Priority";
		th4 = "Status";
		th5 = "Dependencies";
		th6 = "Last change";
		th7 = "Options";
		
		m1="Home";
		m2="Create Requirement";
		m3="Team";
		m4="Profile";
		m5="Download";
		m6="Logout";
		
		head_dash1= "Requirements";
		head_dash2= "Requirements of team ";
		
		news_text="Update   ";
	}	
}