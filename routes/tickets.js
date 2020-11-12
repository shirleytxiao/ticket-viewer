var express = require('express');
var router = express.Router();

/* GET ticketlist. */
// if i do an HTTP GET to /tickets/ticketlist, server will return JSON 
// that lists all of the tickets in the data base.
// for viewer, want to put in limits as to how much
// data gets spewed out at one time, (e.g. pagination).
router.get('/ticketlist', function(req, res) {
  var db = req.db;
  var collection = db.get('ticketlist');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

module.exports = router;