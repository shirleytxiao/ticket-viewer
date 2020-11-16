#Zendesk Ticket Viewer using Node.js

A simple CLI app that displays support tickets from a Zendesk account.


## Intro

This is a ticket viewer for Zendesk accounts, implemented two ways. The command line interface (CLI) app requests tickets from a Zendesk account and displays them in the terminal. 

The browser-based app uses tickets from a local JSON file, instead of those requested from a Zendesk account due to cross-domain restrictions. The browser-based app has less features (i.e. no pagination) and limited capabilities. 


## Author

Shirley Xiao is an aspiring software engineer and second-year student at University of Berkeley, California. She is currently studying computer science.


## Contents

* /bin/cli.js - central app file for CLI ticket viewer
* /public - static directories such as /images
* /routes - route files for browser-based ticket viewer
* /tests - test files
* /views - views for browser-based ticket viewer
* README.md - this file
* app.js - central app file for browser-based ticket viewer
* package.json, package-lock.json - package info for ticket viewer
* tickets.json - sample tickets for browser-based ticket viewer


## Install

**To run the CLI ticket viewer:**
1. Clone the repository: `git clone git@github.com:shirleytxiao/ticket-viewer`
2. Install the application: `npm install`
3. Enter your Zendesk account information in `bin/cli.js`
4. Start the app: `hello`

To avoid formatting issues, it is recommended to use the CLI on a full-screen terminal. 

**To run the browser-based viewer:**
1. Clone the repository: `git clone git@github.com:shirleytxiao/ticket-viewer`
2. Install the application: `npm install`
3. Start the server: `npm start`
4. View in browser at `http://localhost:3000`


## Tests

```sh
npm tests
```

