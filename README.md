- added tickets.json file
- ran cURL to generate dummy tickets in stxiao zendesk account
curl https://stxiao.zendesk.com/api/v2/imports/tickets/create_many.json -v -u stxiao@berkeley.edu:34Twinky79! -X POST -d @tickets.json -H "Content-Type: application/json"




- created "data" directory to store database files before running MongoDB

- views/index.jade: template of web app

- public/stylesheets/style.css: appearance, fonts, spacing, etc.

- app.js: heart and soul of our app. 
	- by default Express has set it up pretty well
	- added some hooks for Monk
	- made our database accessible to (1) router and (2) to various http requests (placement in code is important because Express middleware is sequential)

- tickets.js: tickets route
	- NEED TO CHANGE: limit how much data gets returned by JSON (incorporate pagination)

- global.js: 
	- NEED TO CHANGE: how data is pulled
		- NOW: using a global variable and defining our functions at the top level (only done for speed and simplicity)
		- IN A REAL APP: define a single master global, which you can then populate with properties, methods, etc. as needed, thus helping to avoid conflicts or generally pollute the namespace
	- NEED TO CHANGE: how table is populated (populateTable() function)
		- line 33: "ticketListData = data;" sticks ALL of our ticket data into the array we established earlier (not recommended if dealing with thousands of tickets)






- build node web app to function on localhost:3000
- deploy on heroku
	- push to heroku 
	- modify dns records of domain name ("shirleytxiao.github.io/ticketviewer") to point to heroku app
	- update domain settings on heroku to include new domain name

