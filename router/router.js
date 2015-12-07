var RouterResponse = require('./router-response');
var url = require("url");
var fs = require('fs');

/**
 * @param {Config} config
 * @constructor
 */
function Router(config) {
  this.REQUEST_TYPE_ACTION = 'action';
  this.REQUEST_TYPE_PAGE = 'page';

  this.config = config;
  this.currentRequest = null;
  this.response = RouterResponse;
}

/**
 * @param {object} request
 * @return {RouterResponse}
 */
Router.prototype.route = function(request) {
  this.currentRequest = request;
  this.processRequest();

  return this.response;
};

Router.prototype.processRequest = function() {
//{"protocol":null,"slashes":null,"auth":null,"host":null,"port":null,"hostname":null,"hash":null,"search":"?v1=d1&v2=d3","query":"v1=d1&v2=d3","pathname":"/frefeefrf/frf","path":"/frefeefrf/frf?v1=d1&v2=d3","href":"/frefeefrf/frf?v1=d1&v2=d3"}
  var parsedUrl = url.parse(this.currentRequest.url);
  var way = this.getRequestedWay(parsedUrl.pathname);
  var requestType = this.getRequestType(way);

  if (requestType == this.REQUEST_TYPE_ACTION) {
    this.processPageRequest(way);
  } else if (requestType == this.REQUEST_TYPE_PAGE) {
    this.processActionRequest(way);
  } else {
    process.error("Could not determinate request type.");
  }

  this.response.setContent(requestType + '\n' + JSON.stringify(way));
};

/**
 * @param {string} pathname
 * @return {Array}
 */
Router.prototype.getRequestedWay = function(pathname) {
  var resultWay = [];

  pathname.split('/').forEach(function(stepElement) {
    if (stepElement) {
      resultWay.push(stepElement);
    }
  });

  return resultWay;
};

Router.prototype.processPageRequest = function(askedWay) {
  
};

Router.prototype.processActionRequest = function (askedWay) {
  
};

/**
 *
 * @param {object} requestWay
 * @return {string}
 */
Router.prototype.getRequestType = function(requestWay) {
  if (requestWay[0] == 'action') {
    return this.REQUEST_TYPE_ACTION;
  }

  return this.REQUEST_TYPE_PAGE;
};

module.exports = Router;