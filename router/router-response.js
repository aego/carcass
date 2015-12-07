RouterResponse = {
  //@todo: headers
  _httpCode: 500,
  _content: 'Here is no content',

  /**
   * @param {number} code
   */
  setHttpCode: function(code) {
    this._httpCode = code;
  },

  /**
   * @return {number}
   */
  getHttpCode: function () {
    return this._httpCode;
  },

  /**
   * @param {string} content
   */
  setContent: function(content) {
    this._content = content;
  },

  /**
   * @return {string}
   */
  getContent: function() {
    return this._content;
  }
};

module.exports = RouterResponse;