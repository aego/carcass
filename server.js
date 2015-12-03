var Router = require("./router/router");

/**
 * @param port
 * @constructor
 */
function Server(port) {
  this.port = port;
  this.http = require("http");
  this.router = new Router();
}

/**
 * @param router
 * @return {Function}
 */
Server.prototype.onRequest = function onRequest(router) {
  return function(request, response) {
    var routerResponse = router.route(request);

    response.writeHead(routerResponse.getHttpCode(), {"Content-Type": "text/html"});
    response.write(routerResponse.getContent());
    response.end();
  }
};

Server.prototype.start = function start() {
  console.log("Binding server on port " + this.port);
  this.http.createServer(this.onRequest(this.router)).listen(this.port);
};

module.exports = Server;