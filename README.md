# skatApps

Kør applikation på localhost
npm start

Gør klar til produktion, som lægger ressourcer i /dist
npm run build

Der er få productions variabler, der skal sættes
* Bilafgifter
  - mainComponent.ts 
    production = false/true
 
 * Alle applikationer 
 - infrastructure/app.module.ts
   skal udkommenteres i produktion: InMemoryWebApiModule.forRoot(InMemoryDataService) 
   
    
For at uploade/sync med bibliotek CasperSond
git kommandoer
- add .
- commit -m "text"
- push 


