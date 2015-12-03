var Server = require("./server");

var Carcass = {
  config: null,
  server: null,

  start: function() {
    this._init();
  },

  /**
   * @private
   */
  _init: function() {
    this._initConfig();
    this._initServer();
  },

  /**
   * @private
   */
  _initConfig: function() {

  },

  /**
   * @private
   */
  _initServer: function() {
    this.server = new Server();
    this.server.start();
    console.log("Carcass has been started!");
  }
};

Carcass.start();