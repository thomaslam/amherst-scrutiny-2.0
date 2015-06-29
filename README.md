## Roadmap
* Framework and DB used: 
    * Front-end: Angular
    * DB: Mongo with Mongoose
* Define fields for Mongo documents
* Routing
    * /GET / => homepage
    * /GET /search_result => page with results (department, class name, professor, semester)
    * /GET /postreview (authentication) => post review form
    * /POST /postreview => store data into db and return to homepage (flash message form submitted)
    * /GET /class_ratings with json data
    
* App tree map
    * app.js
    * server/server.js
    * routes/
        *
        
* Multiple pages into single page
* Authentication

** TODOS
- Read about angular services: ui.router, $stateProvider, $urlRouterProvider
- Read about changeLocation function in app.js http://www.yearofmoo.com/2012/10/more-angularjs-magic-to-supercharge-your-webapp.html#apply-digest-and-phase