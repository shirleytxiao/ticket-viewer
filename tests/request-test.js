// email and password: stxiao@berkeley.edu:34Twinky79!
// base64 encoded: c3R4aWFvQGJlcmtlbGV5LmVkdTozNFR3aW5reTc5IQ==

var request = require("request")
var url = "https://stxiao.zendesk.com/api/v2/tickets.json"

request({
    url: url,
    json: true,
    headers : { 
        "Authorization" : "Basic c3R4aWFvQGJlcmtlbGV5LmVkdTozNFR3aW5reTc5IQ=="
    }
}, function (error, response, body) {
    if (error) {
        console.log(error)
    }
    if (!error && response.statusCode === 200) {
        // console.log(body) // Print the json response

        var data = JSON.stringify(body);  
        console.log(data);
    }
})
