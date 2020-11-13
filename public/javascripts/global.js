// ticketlist data array for filling in info box
var ticketListData = [];
var url = '/tickets/ticketlist';
// var url = 'https://stxiao.zendesk.com/api/v2/tickets.json';

// DOM ready, functions on initial page load
$(document).ready(function() {
  populateTable();

  // ticket link click
  $('#ticketList table tbody').on('click', 'td a.linkshowticket', showTicketInfo);

});

// functions

function populateTable() {

  var tableItem = '';

  // jQuery AJAX call for JSON
  $.getJSON( url, function(data) {

    // stick our ticket data array into a ticketlist variable in the global object
    ticketListData = data;

    // for each item in our JSON, add a table row and cells to the item string
    $.each(data, function(){
      tableItem += '<tr>';
      tableItem += '<td><a href="#" class="linkshowticket" rel="' + this[0].requester_id + '" title="Show Details">' + this[0].requester_id + '</a></td>';
      tableItem += '<td>' + this[0].subject + '</td>';
      tableItem += '<td>' + this[0].updated_at + '</td>';
      tableItem += '</tr>';
    });

    // put entire ticket item string into HTML table
    $('#ticketList table tbody').html(tableItem);
  });
};

function showTicketInfo(event) {

  // prevent link from firing on page load
  event.preventDefault();

  // retrieve ticketname from link rel attribute
  var thisTicketName = $(this).attr('rel');

  // get index of object based on id value
  var arrayPosition = ticketListData.map(function(arrayItem) { return arrayItem.ticketname; }).indexOf(thisTicketName);

  // get our ticket object
  var thisTicketObject = ticketListData[arrayPosition];

  //populate info box
  $('#ticketInfoRequester').text(thisTicketObject[0].requester_id);
  $('#ticketInfoUpdatedAt').text(thisTicketObject[0].updated_at);
  $('#ticketInfoSubject').text(thisTicketObject[0].subject);
  $('#ticketInfoContent').text(thisTicketObject[0].description);

};
