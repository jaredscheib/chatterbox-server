/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  // console.log(request);
  //
  // case for get/post
  // get -> statuscode 200, default respond with 100 newest messages
  //        format: {username: '', text: '', createdAt: date, ID: ''}
  //        flags: order, limit, roomname
  //
  // post -> we get {username:'', text:''}
  //         we store: user;name, text, createdat, objectID
  //         response: head: statuscode 201, body: {objectID: ''}

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;
  //all data is being sent back in JSON format
  headers['Content-Type'] = 'application/json';


  var statusCode;
  var serverResponse = {};

  if (request.method === 'OPTIONS') {
    statusCode = 200;


    serverResponse = {
      POST: {
        description: 'post a new message',
        parameters: {
          order: 'string',
          limit: 'number',
          username: 'string'
        }
      },
      GET: {
        description: 'get chat messages'
      }
    };

  } else if (request.method === 'GET') {
    statusCode = 200;




  } else if(request.method === 'POST') {
    statusCode = 201;
    console.log('GET');
  }


  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  response.end(JSON.stringify(serverResponse));
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
