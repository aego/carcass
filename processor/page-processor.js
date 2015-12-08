var path = require("path");
var fs = require("fs");

/**
 * @param {object} way
 * @param {object} config
 * @param {object} data
 * @constructor
 */
function PageProcessor(way, config, data) {
  this._fileLink = null;

  if (!data) {
    data = [];
  }

  this.way = way;
  this.data = data;
}

PageProcessor.prototype._getPageFileLink = function () {
  var PPObject = this;

  if (!this._fileLink) {
    var dirConfig = config.app.dir;
    var link = dirConfig.root + dirConfig.page + '/' + this.way.join('/');

    if (fs.existsSync(link)) {
      this._fileLink = link;
    } else if(config.app.template.extensions){
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

PageProcessor.prototype.pageExists = function() {
  return fs.existsSync(this._getPageFileLink());
};

PageProcessor.prototype.getPageContent = function() {
  return JSON.stringify(this.way) + '\n' + this._getPageFileLink();
};

module.exports = PageProcessor;