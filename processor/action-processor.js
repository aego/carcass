/**
 * @param {object} way
 * @param {object} config
 * @param {object} data
 * @constructor
 */
function ActionProcessor(way, config, data) {
  this.way = way;
  if (config) this.config = config;
  if (data) this.data = data;
}

ActionProcessor.prototype._getActionFileLink = function () {

};

ActionProcessor.prototype.pageExists = function() {

};

ActionProcessor.prototype.getPageContent = function() {
  return JSON.stringify(this.way);
};

module.exports = ActionProcessor;
