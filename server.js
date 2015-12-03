var url = require("url");

function Server() {
  this.http = require("http");
}

Server.prototype.onRequest = function onRequest(request, response) {
  var parsedUrl = url.parse(request.url);

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Hi! Url: '" + parsedUrl.pathname + "'");
  //response.write("Hi! Url: ");
  response.end();
};

Server.prototype.start = function start() {
  this.http.createServer(this.onRequest).listen(8888);
};

module.exports = Server;