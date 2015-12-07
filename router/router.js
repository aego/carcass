var RouterResponse = require('./router-response');
var PageProcessor = require('../processor/page-processor');
var ActionProcessor = require('../processor/action-processor');
var url = require("url");

/**
 * @constructor
 */
function Router() {
  this.REQUEST_TYPE_ACTION = 'action';
  this.REQUEST_TYPE_PAGE = 'page';

  this.currentRequest = null;
  this.response = RouterResponse;
  this.processor = null;
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
  var parsedUrl = url.parse(this.currentRequest.url);
  var way = this.getRequestedWay(parsedUrl.pathname);
  var requestType = this.getRequestType(way);
  this.initProcessor(requestType, way);

  if (this.processor && this.processor.pageExists()) {
    this.response.setContent(this.processor.getPageContent());
    this.response.setHttpCode(200);
  } else {
    this.errorNotFound();
  }
};

Router.prototype.errorNotFound = function() {
  var content = "Sorry, page not found :(";

  if (config.app.notFoundPage) {
    var processor = new PageProcessor([config.app.notFoundPage]);
    content = processor.getPageContent();
  }

  this.response.setContent(content);
  this.response.setHttpCode(404);
};

/**
 * @param {string} requestType
 */
Router.prototype.initProcessor = function(requestType, way) {
  if (requestType == this.REQUEST_TYPE_ACTION) {
    this.processor = new ActionProcessor(way);
  } else if (requestType == this.REQUEST_TYPE_PAGE) {
    this.processor = new PageProcessor(way);
  } else {
    this.responseError("Could not determinate request type.");
  }
};

/**
 * @todo: tmp, need refactor
 * @param {string} errorText
 */
Router.prototype.responseError = function (errorText) {
  this.response.setHttpCode(500);
  this.response.setContent(errorText);
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