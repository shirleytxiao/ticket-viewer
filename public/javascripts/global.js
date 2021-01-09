var ticketListData = [];                                    // ticketlist data array for filling in info box
var url = '/tickets/ticketlist';

$(document).ready(function() {                              // DOM ready, functions on initial page load
  populateTable();

  // ticket link click
  $('#ticketList table tbody').on('click', 'td a.linkshowticket', showTicketInfo);

});

// Functions

function populateTable() {
  var tableItem = '';

  $.getJSON( url, function(data) {                          // jQuery AJAX call for JSON
    for (i = 0; i < 100; i++) {                             // for each item in our JSON, add a table row and cells to the item string
      $.each(data, function(){
        ticketListData.push(this[i]);

        tableItem += '<tr>';
        tableItem += '<td><a href="#" class="linkshowticket" rel="' + this[i].requester_id + '" title="Show Details">' + this[i].requester_id + '</a></td>';
        tableItem += '<td>' + this[i].subject + '</td>';
        tableItem += '<td>' + this[i].updated_at + '</td>';
        tableItem += '</tr>';
      });
    };
    $('#ticketList table tbody').html(tableItem);           // put entire ticket item string into HTML table

  });
};

// finds index of ticket to show
function findTicket(allTickets, ticketID) {
  for (currTicket = 0; currTicket < allTickets.length; currTicket++) {
    if (allTickets[currTicket].requester_id == ticketID) {
      return currTicket;
    };
  };
};

function showTicketInfo(event) {
  event.preventDefault();                                   // prevent link from firing on page load

  var thisTicketName = $(this).attr('rel');                 // retrieve ticketname from link rel attribute
  var arrayPosition = findTicket(ticketListData, thisTicketName);
  var thisTicketObject = ticketListData[arrayPosition];     // get our ticket object

  //populate info box
  $('#ticketInfoRequester').text(thisTicketObject.requester_id);
  $('#ticketInfoUpdatedAt').text(thisTicketObject.updated_at);
  $('#ticketInfoSubject').text(thisTicketObject.subject);
  $('#ticketInfoContent').text(thisTicketObject.description);
};
