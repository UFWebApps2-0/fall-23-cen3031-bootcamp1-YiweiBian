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
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(listingData);
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 not found')
    }
    /*
      Your request handler should send listingData in the JSON format as a response if a GET request 
      is sent to the '/listings' path. Otherwise, it should send a 404 error. 
  
      HINT: Explore the request object and its properties 
      HINT: Explore the response object and its properties
      https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
      
      HINT: Explore how callback's work 
      http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4
      
      HINT: Explore the list of MIME Types
      https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
     
      HINT: Explore mdn web docs for resources on how to use javascript.
      Helpful example: if-else structure- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
  
      */
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
