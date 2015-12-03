var Server = require("./server");
var Config = require("./config");

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
    this.config = new Config();
  },

  /**
   * @private
   */
  _initServer: function() {
    this.server = new Server(this.config.app.http.port);
    this.server.start();
    console.log("Carcass has been started!");
  }
};

Carcass.start();