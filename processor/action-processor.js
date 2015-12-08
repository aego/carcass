

/**
 * @param {object} way
 * @param {object|undefined} data
 * @constructor
 */
function ActionProcessor(way, data) {
  if (!data) {
    data = [];
  }

  this._fileLink = null;
  this.way = way;
  this.data = data;
}

ActionProcessor.prototype._getActionFileLink = function () {

};

ActionProcessor.prototype.pageExists = function() {

};

ActionProcessor.prototype.getPageContent = function() {
  return JSON.stringify(this.way);
};

module.exports = ActionProcessor;
