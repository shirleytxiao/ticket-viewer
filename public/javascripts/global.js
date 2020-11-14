// ticketlist data array for filling in info box
var ticketListData = [];
var url = '/tickets/ticketlist';
// var url = "https://stxiao.zendesk.com/api/v2/tickets.json";

// DOM ready, functions on initial page load
$(document).ready(function() {
  populateTable();

  // ticket link click
  $('#ticketList table tbody').on('click', 'td a.linkshowticket', showTicketInfo);

});

// functions

function populateTable() {

  var tableItem = '';

  // ORIGINAL USING TICKETS/TICKETLIST
  // jQuery AJAX call for JSON
  $.getJSON( url, function(data) {

    // stick our ticket data array into a ticketlist variable in the global object
    // ticketListData = data;


    // for each item in our JSON, add a table row and cells to the item string
    for (i = 0; i < 100; i++) {
      $.each(data, function(){
        ticketListData.push(this[i]);

        tableItem += '<tr>';
        tableItem += '<td><a href="#" class="linkshowticket" rel="' + this[i].requester_id + '" title="Show Details">' + this[i].requester_id + '</a></td>';
        tableItem += '<td>' + this[i].subject + '</td>';
        tableItem += '<td>' + this[i].updated_at + '</td>';
        tableItem += '</tr>';
      });
    };


    // put entire ticket item string into HTML table
    $('#ticketList table tbody').html(tableItem);
  });

  // FETCH ATTEMPT 1 WITH REQUEST


    // request({
    //   url: url,
    //   json: true,
    //   headers : { 
    //       "Authorization" : "Basic c3R4aWFvQGJlcmtlbGV5LmVkdTozNFR3aW5reTc5IQ=="
    //   }
    // }, function (error, response, data) {
    //     if (error) {
    //         console.log(error)
    //     }
    //     if (!error && response.statusCode === 200) {
    //       for (i = 0; i < 100; i++) {
    //         $.each(data, function(){
    //           ticketListData.push(this[i]);
      
    //           tableItem += '<tr>';
    //           tableItem += '<td><a href="#" class="linkshowticket" rel="' + this[i].requester_id + '" title="Show Details">' + this[i].requester_id + '</a></td>';
    //           tableItem += '<td>' + this[i].subject + '</td>';
    //           tableItem += '<td>' + this[i].updated_at + '</td>';
    //           tableItem += '</tr>';
    //         });
    //       };
      
      
    //       // put entire ticket item string into HTML table
    //       $('#ticketList table tbody').html(tableItem);    
    //     };
    //   }
    // )

};

// finds index of ticket to show
function findTicket(allTickets, ticketID) {
  // var confirmation = confirm(ticketID);
  // var confirmation = confirm(JSON.stringify(allTickets[0], null, 4)); // {"requester_id" : 1, "assignee_id" : 5 ...}
  // var confirmation = confirm(allTickets.length);

  for (currTicket = 0; currTicket < allTickets.length; currTicket++) {
    // var confirmation = confirm(JSON.stringify(currTicket, null, 4)); // {"requester_id" : 1, "assignee_id" : 5 ...}
    // var confirmation = confirm(JSON.stringify(allTickets[currTicket], null, 4)); // {"requester_id" : 1, "assignee_id" : 5 ...}
    // var confirmation = confirm(ticketID); // [object Object], [object Object], [object Object]

    // var confirmation = confirm(allTickets[currTicket].indexOf(ticketID));
    if (allTickets[currTicket].requester_id == ticketID) {
      // return allTickets[currTicket].indexOf(ticketID);
      return currTicket;
    };
  };
};


function showTicketInfo(event) {

  // prevent link from firing on page load
  event.preventDefault();

  // retrieve ticketname from link rel attribute
  var thisTicketName = $(this).attr('rel');
  // var confirmation = confirm(thisTicketName); // 0 / 1 / 2 / 3 / 4 ...

  // var confirmation = confirm(ticketListData); // [object Object], [object Object], [object Object] ...
  // var confirmation = confirm(JSON.stringify(ticketListData[0], null, 4)); // {"requester_id" : 1, "assignee_id" : 5 ...}

  // // get index of object based on id value
  // var arrayPosition = ticketListData.map(function(arrayItem) {
  //   // var confirmation = confirm(JSON.stringify(arrayItem, null, 4)); // [object Object] (x3)
  //   // var confirmation = confirm(arrayItem.requester_id == thisTicketName);

  //   return arrayItem.requester_id; 
  // }).indexOf(thisTicketName);
    // var confirmation = confirm(arrayPosition); // 0 / 1 / 2 / 3 / 4 ...

    var arrayPosition = findTicket(ticketListData, thisTicketName);


  // get our ticket object
  var thisTicketObject = ticketListData[arrayPosition];
  // var confirmation = confirm(arrayPosition);


  //populate info box
  $('#ticketInfoRequester').text(thisTicketObject.requester_id);
  $('#ticketInfoUpdatedAt').text(thisTicketObject.updated_at);
  $('#ticketInfoSubject').text(thisTicketObject.subject);
  $('#ticketInfoContent').text(thisTicketObject.description);

};
