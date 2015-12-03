var fs = require("fs");

function Config() {
  var configPath = './config';
  var configObject = this;

  if (!fs.existsSync(configPath)) {
    throw Error("Specified config directory [" + configPath + "] does not exists!");
  }

  var configFilesList = fs.readdirSync(configPath);

  configFilesList.forEach(function (fileInDirectory) {
    var fileContents = fs.readFileSync(configPath + '/' + fileInDirectory, 'utf8');

    readConfigFile(fileInDirectory, fileContents);
  });

  /**
   * @param fileName
   * @param fileContents
   */
  function readConfigFile(fileName, fileContents) {
    try {
      var configJSON = JSON.parse(fileContents);
      var configElemName = fileName.replace('.json', '');
      configObject[configElemName] = configJSON;
    } catch (Exception) {
      console.error('Could not read config file named [' + fileName + '], file ignored.');
    }
  }
}

module.exports = Config;