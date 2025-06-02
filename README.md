# Dein Radio SRF 1 Song Tracker

## Kurzbeschreibung (max. 500 Zeichen)

Als Projekt im 2. Semester des Moduls «Interaktive Medien» habe ich die Website «Dein Radio SRF 1 Song Tracker» programmiert. Sie zeigt in Echtzeit den aktuell gespielten Titel von Radio SRF 1, sowie die zuletzt gespielten Titel in einer scrollbaren Historie, mit ein paar Zusatzinformationen an. Die Daten werden über eine öffentlich zugängliche API eingebunden und auf der Website dynamisch dargestellt. Um die Interaktivität zu erhöhen und nicht nur Informationen passiv anzuzeigen, habe ich ein Quiz integriert. Dabei können Nutzer*innen anhand eines Songtitels aus mehreren Optionen die richtigen Interpreten auswählen. 

## Learnings und Schwierigkeiten (max. 200 Zeichen)

Ich konnte meine Kenntnisse im Bereich der Interaktiven Medien weiter festigen und habe gelernt, wie man APIs in Webseiten integriert und mit JavaScript arbeitet. Der interaktive Part meiner Website stellte mich vor eine grosse Herausforderung, dennoch konnte ich aus diesen Schwierigkeiten lernen und wertvolles Wissen erlangen.

## Benutzte Ressourcen
- Radio SRF 1 API von Free Public APIs
- Figma
- ChatGPT
- Visual Studio Code
- Google Chrome
- Google Fonts

## Prompts

### Zwei gut funktionierende Prompts
1. «Hey Chat, folgende Probleme gibts noch: Die API wird nicht korrekt geladen. Gleich auf der Startseite steht anstatt Titel, Künstler und Länge des Songs nur «wird geladen...» an was genau liegt das? Ich bitte um Hilfe, weil die API eigentlich schon richtig eingebunden ist. Anbei stelle ich dir die Files zur Verfügung und lade dir einen Screenshot vom Fehler hoch.»
> So habe ich rausgefunden, dass ich unbedingt noch Fallbacks einbauen muss. 
2. «Die Dauer der API, also «duration» funktioniert noch nicht ganz. Teilweise wird sie angezeigt und teilweise wird NaN ausgegeben. Wo liegt das Problem hier. Anbei stelle ich dir meine Files sowie die browser console Ausgaben zur Verfügung für die Fehlersuche.»
> Hier hat Chat herausgefunden, dass die Dauer in manchen Fällen im JSON fehlt.

### Zwei schlecht funktionierende Prompts

1. «Wieso geht das nicht was ich machen wollte, irgendwas stimmt hier nicht.»
> Dieser Prompt hat mir gar nicht weiter geholfen, weil ich gar keinen Kontext gegeben habe, was genau nicht funktioniert.
2. «Die API hat eine Error Rate von angeblich 0% dafür ist die API aber ziemlich Fehleranfällig, mal kommen die Daten und mal werden nur ein paar angezeigt».  
> Hier habe ich auch keine wirklich hilfreiche Antwort bekommen, da auch ChatGPT die API nicht ändern kann und man die Ausfälle der Datenanzeige selber beheben muss.