var express = require('express');
var router = express.Router();
const request = require('request');
var data = '';
// const fs = require('fs');

var url = "https://www.stxiao.zendesk.com/api/v2/tickets.json";

/* GET ticketlist. */

// if i do an HTTP GET to /tickets/ticketlist, server will return JSON 
// that lists all of the tickets in the data base.
// for viewer, want to put in limits as to how much
// data gets spewed out at one time, (e.g. pagination).

request({
  url: url,
  json: true,
  headers : { 
      "Authorization" : "Basic c3R4aWFvQGJlcmtlbGV5LmVkdTozNFR3aW5reTc5IQ=="
  }
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      data = JSON.stringify(body);  
    }
    if (error) {
      console.log(error)
    };
  }
)

router.get('/ticketlist', (req, res) => {

  res.send(data);
  // fs.readFile('./tickets' + ".json", 'utf8', function (err, data) {
  //     res.send(data);
  // });

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