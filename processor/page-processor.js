var path = require("path");
var fs = require("fs");
var swig = require("swig");

/**
 * @param {object} way
 * @param {object} data
 * @constructor
 */
function PageProcessor(way, data) {
  this._fileLink = null;

  if (!data) {
    data = [];
  }

  this.way = this._preprocessWay(way);
  this.data = data;
}

/**
 * @param {[]} way
 * @return {[]}
 * @private
 */
PageProcessor.prototype._preprocessWay = function(way) {
  if (way.length == 0 && config.app.indexPage) {
    way = [config.app.indexPage];
  }

  return way;
};

/**
 * @return {null|string|*}
 * @private
 */
PageProcessor.prototype._getPageFileLink = function () {
  var PPObject = this;

  if (!this._fileLink) {
    var dirConfig = config.app.dir;
    var link = dirConfig.root + dirConfig.page + '/' + this.way.join('/');

    if (fs.existsSync(link)) {
      this._fileLink = link;
    } else if(config.app.template.extensions) {
      config.app.template.extensions.forEach(function(extension) {
        var stepLink = link + '.' + extension;

        if (fs.existsSync(stepLink)) {
          PPObject._fileLink = stepLink;
        }
      });
    }
  }

  return this._fileLink;
};

/**
 * @return {boolean}
 */
PageProcessor.prototype.pageExists = function() {
  return fs.existsSync(this._getPageFileLink());
};

/**
 * @return {string}
 */
PageProcessor.prototype.getPageContent = function() {
  return swig.renderFile(this._getPageFileLink(), {data: this.data, config: config});
};

module.exports = PageProcessor;