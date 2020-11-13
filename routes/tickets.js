var express = require('express');
var router = express.Router();
const fs = require('fs');

let url = 'https://www.stxiao.zendesk.com/api/v2/tickets.json';

/* GET ticketlist. */

// if i do an HTTP GET to /tickets/ticketlist, server will return JSON 
// that lists all of the tickets in the data base.
// for viewer, want to put in limits as to how much
// data gets spewed out at one time, (e.g. pagination).


router.get('/ticketlist', (req, res) => {

  fs.readFile('./tickets' + ".json", 'utf8', function (err, data) {
      res.send(data);
  });
});

// router.get('/ticketlist', function(req, res) {
//   // fetch data from database
//   var db = req.db;
//   var collection = db.get('userlist');
//   collection.find({},{},function(e,docs){
//     res.json(docs);
//   });
// });


module.exports = router;