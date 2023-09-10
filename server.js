var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function (request, response) {
    /*Investigate the request object. 
      You will need to use several of its properties: url and method
    */
    //console.log(request);
    if (request.url === '/listings' && request.method === 'GET') {
        //check if method is get and whether it is sent to '/listing' path
        response.writeHead(200, { 'Content-Type': 'application/json' });
        //sending 200 status and using the correct MIME type to retrieve data
        response.end(listingData);
        //list the listingData
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        //if not then send 404 status to server
        response.end('404 not found')
        //list the status on screen
    }
    
};

fs.readFile('listings.json', 'utf8', function (err, data) {

    //Check for errors
    if (err) {
        throw err;
    }


    //Save the data in the listingData variable already defined
    listingData = data;

    //Creates the server
    server = http.createServer(requestHandler);
    //Start the server
    server.listen(port, function () {
        console.log('Server listening on: http://127.0.0.1:' + port);
    });

});
