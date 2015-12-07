var Server = require("./server");
var Config = require("./config");

global.config = new Config();

var Carcass = {
  server: null,

  start: function() {
    this._init();
  },

  /**
   * @private
   */
  _init: function() {
    this._initServer();
  },

  /**
   * @private
   */
  _initServer: function() {
    this.server = new Server(config.app.http.port);
    this.server.start();
    console.log("Carcass has been started!");
  }
};

Carcass.start();