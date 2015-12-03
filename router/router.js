var RouterResponse = require('./router-response');
var url = require("url");
var fs = require('fs');

function Router() {
  this.response = RouterResponse;
  //function route(request) {
  //  console.log(request);
  //}
}

Router.prototype.route = function(request) {
  this.processRequest(request);
  return this.response;
};

Router.prototype.processRequest = function(request) {

};


module.exports = Router;