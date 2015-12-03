var url = require("url");

/**
 * @param port
 * @constructor
 */
function Server(port) {
  this.port = port;
  this.http = require("http");
}

/**
 * @param request
 * @param response
 */
Server.prototype.onRequest = function onRequest(request, response) {
  var parsedUrl = url.parse(request.url);

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Hi! Url: '" + parsedUrl.pathname + "'");
  response.end();
};

Server.prototype.start = function start() {
  console.log("Binding server on port " + this.port);
  this.http.createServer(this.onRequest).listen(this.port);
};

module.exports = Server;