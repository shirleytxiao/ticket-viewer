#!/usr/bin/env node
CLIENT_DOMAIN = '';                  // Enter Zendesk account domain here. <'https://example.zendesk.com'>
CLIENT_ID = '';                      // Enter account email here. <'example@abc.com'>
CLIENT_SECRET = '';                  // Enter account password here. <'donthackmeplz'>







// ASCII art logo
const logo = require('asciiart-logo');
const logoconfig = require('../package.json');
console.log(logo(logoconfig).render());

const axios = require("axios");

// To read user input in CLI
const readline = require("readline");
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Link to fetch tickets from
const url = CLIENT_DOMAIN + "/api/v2/tickets.json";

// Initialize ticket list table
const {table} = require('table');
let dtable = [];
dtable.push(['#', 'Requester', 'Subject', 'Last Updated']);
config = {
    columns: {
      3: {
        width: 30,
        wrapWord: true
      }
    }
  };
let singletable = [];
singletable.push(['#', 'Requester', 'Subject', 'Description', 'Last Updated', 'Status']);
let outtable;



// Viewer opening greeting
console.log(`Hello! \n
Welcome to the ticket viewer. \n`);
ask();



// Functions

// First question
function ask() {
    interface.question("What would you like to do? \n\nOptions: \nEnter a number <x> greater than 0 to see the first x tickets. \nEnter 'range' to see a range of tickets. \nEnter 'all' to view all tickets. \nEnter 'bye' to exit. \n> ", function(answer1) {
        // input: range
        if (answer1 == "range") {askRange();} 
        // input: all
        else if (answer1 == "all") {
            console.log(`\nOkay, here are all your tickets (showing 25 at a time).\n`);
            getTickets(0, 25, 1);
        // input: bye
        } else if (answer1 == "bye") {
            interface.close();
        // input: number
        } else if (Number(answer1)) {
            if (Number(answer1) == 1) {console.log(`\nOkay, here's your first ticket.\n`);} 
            else {console.log(`\nOkay, here are your first ${answer1} tickets.\n`);}
            getTickets(0, Number(answer1), 0);
        // invalid input
        } else {
            console.log('\nHmm, I didn`t quite get that. Can you try again?\n');
            ask();
        }
    });
};

// Follow-up question
function askAgain(startTicket, endTicket) {
    interface.question("What would you like to do next? Enter 'help' for options.\n> ", function(answer2) {
        if (answer2 == "help") {
            console.log("\n\nOptions: \nEnter 'see <x>' to view the x-th ticket.\nEnter a number <x> greater than 0 to see the first x tickets. \nEnter 'range' to see a range of tickets. \nEnter 'all' to view all tickets. \nEnter 'bye' to exit.\n")
            askAgain(startTicket, endTicket);
        } else if (answer2.substring(0,3) == "see") {
            var ticketNum = Number(answer2.substring(3,answer2.length));
            if (ticketNum > endTicket || ticketNum < startTicket) {
                console.log("\nTicket not on this page. Can you try again?\n");
                askAgain(startTicket, endTicket);
            } else {
                seeTicket(Number(answer2.substring(3,answer2.length)), startTicket, endTicket);
            }
        } else if (answer2 == "range") {
            askRange();
        } else if (answer2 == "all") {
            console.log(`\nOkay, here are all your tickets (showing 25 at at time).\n`);
            getTickets(0, 25, 1);
        } else if (answer2 == "bye") {
            interface.close();
        } else if (Number(answer2)) {
            if (Number(answer2) == 1) {console.log(`\nOkay, here's your first ticket.\n`);} 
            else {console.log(`\nOkay, here are your first ${answer2} tickets.\n`);}
            getTickets(0, Number(answer2), 0);
        } else {
            console.log('\nHmm, I didn`t quite get that. Can you try again?\n');
            askAgain(startTicket, endTicket);
        }
    });
};

// Follow-up question
function askAgain_page(startTicket, endTicket, all) {
    interface.question("Next page? [y/n]\n> ", function(nextpage) {
        if (nextpage == "y") {
            if (all) { getTickets(startTicket + 25, endTicket + 25, 1); }
            else { getTickets(startTicket + 25, endTicket, 0); }
        } else {
            interface.question("Previous page? [y/n]\n> ", function(prevpage) {
                if (prevpage == "y") {
                    if (all) { getTickets(startTicket - 25, endTicket - 25, 1); }
                    else { getTickets(startTicket - 25, endTicket - 25, 0); }
                } else {
                    askAgain(startTicket, endTicket);
                }
            });
        };
    });
};

// Range question
function askRange() {
    interface.question("What ticket do you want to start with? \n> ", function(ticket1) {
        interface.question("What ticket do you want to end with? \n> ", function(ticket2) {
            // if ticket1 or ticket2 aren't numbers
            if (Number(ticket1) == 'NaN' || Number(ticket2) == 'NaN') {
                console.log(`\nAh, numbers only please. Can you try again?\n`);
                askRange();          
            } else if (Number(ticket1) == 0) {
                console.log(`\nTicket numbering starts at 1. Can you try again?\n`);
                askRange();          
            } else if (Number(ticket1) > Number(ticket2)) {            // if ticket2 < ticket1
                console.log(`\nInvalid range; second number must be greater than the first. Can you try again?\n`);
                askRange();
            } else {
                console.log(`\nOkay, here are tickets ${ticket1} through ${ticket2}.\n`);
                getTickets(Number(ticket1) - 1, Number(ticket2), 0);
            }

        });
    });
}

// Fetch tickets
function getTickets(startTicket, endTicket, all) {
    if (startTicket < 0) {
        console.log("\nYou are on the first page.\n");
        askAgain(startTicket + 25, endTicket + 25);
    }
    axios.get(url, {
        auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET
        }
    }).then(function(res) {
        if (endTicket > res.data.tickets.length) {                  // range specified goes past last ticket
            endTicket = res.data.tickets.length;
        } 
        if (res.data.tickets.length === 0) {                        // no tickets in account 
            console.log("\nLooks like you have no tickets.\n");
            askAgain(0, 0);
        } else if (startTicket == res.data.tickets.length) {        // no more tickets left
            console.log("\nNo more tickets left!\n");
            askAgain(0, 0);
        } else if (endTicket - startTicket > 25) {                  // pagination for if more than 25 tickets returned
            for (i = startTicket; i < startTicket + 25; i++) {
                dtable.push([res.data.tickets[i].id, res.data.tickets[i].requester_id, res.data.tickets[i].subject, res.data.tickets[i].updated_at]);
            }
            outtable = table(dtable);
            console.log(outtable);
            dtable.splice(1, dtable.length);
            if (all) { askAgain_page(startTicket, endTicket, 1); }
            else { askAgain_page(startTicket, endTicket, 0); }            
        } else {                                                    // return less than 25
            for (i = startTicket; i < endTicket; i++) {
                dtable.push([res.data.tickets[i].id, res.data.tickets[i].requester_id, res.data.tickets[i].subject, res.data.tickets[i].updated_at]);
            }
            outtable = table(dtable);
            console.log(outtable);
            dtable.splice(1, dtable.length);
            if (all) { askAgain_page(startTicket, endTicket, 1); } 
            else { askAgain(startTicket, endTicket); }
        }
    }).catch(function(error) {
        console.log('\nWhoops! I couldn`t find your tickets. :( Let`s try again.\n');
        askAgain(0, 0);
    });
}

// View single ticket
function seeTicket(ticket, startTicket, endTicket) {
    axios.get(url, {
        auth: {
            username: CLIENT_ID,
            password: CLIENT_SECRET
        }
    }).then(function(res) {
        ticket -= 1;
        singletable.push([res.data.tickets[ticket].id, res.data.tickets[ticket].requester_id, res.data.tickets[ticket].subject, res.data.tickets[ticket].description, res.data.tickets[ticket].updated_at, res.data.tickets[ticket].status]);
        outtable = table(singletable, config);
        console.log(outtable);
        singletable.splice(1, singletable.length);
        askAgain(startTicket, endTicket)
    }).catch(function(error) {
        console.log('\nWhoops! I couldn`t find that ticket. :( Let`s try again.\n');
        askAgain(startTicket, endTicket);
    });
}

// Close viewer
interface.on("close", function() {
    console.log("\nThank you for using the ticket viewer. Good-bye!");
    process.exit(0);
});