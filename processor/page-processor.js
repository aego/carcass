/**
 * @param {object} way
 * @param {object} config
 * @param {object} data
 * @constructor
 */
function PageProcessor(way, config, data) {
  this.way = way;
  this.config = config;
  this.data = data;
}

PageProcessor.prototype._getPageFileLink = function () {

};

PageProcessor.prototype.pageExists = function() {
  return true;
};

PageProcessor.prototype.getPageContent = function() {
  return JSON.stringify(this.way);
};

module.exports = PageProcessor;