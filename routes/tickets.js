var express = require('express');
var router = express.Router();
const fs = require('fs');

// Read data from tickets.json and send to tickets/ticketlist
router.get('/ticketlist', (req, res) => {
  fs.readFile('./tickets' + ".json", 'utf8', function (err, data) {
      res.send(data);
  });
});

module.exports = router;
