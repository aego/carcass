RouterResponse = {
  //@todo: headers
  _httpCode: 500,
  _content: 'Here is no content',

  /**
   * @return {number}
   */
  getHttpCode: function () {
    return this._httpCode;
  },

  /**
   * @return {string}
   */
  getContent: function() {
    return this._content;
  }
};

module.exports = RouterResponse;