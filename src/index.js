var path = require('path');
var format = require('util').format;
var fsp = require('./fs-promise');

module.exports = function patchVersion(dir, version, log, error, exit) {
  var packagePath = path.resolve(dir, './package.json');

  return fsp.readFile(packagePath)
    .then(function patch(content) {
      var metadata = JSON.parse(content);
      metadata.version = version;
      return metadata;
    })
    .then(function dump(json) {
      var content = JSON.stringify(json, null, 2);
      return fsp.writeFile(packagePath, content + '\n');
    })
    .then(function success() {
      log(format('Patch version %s to file %s', version, packagePath));
      exit(0);
    }, function fail(exception) {
      error(exception.toString());
      exit(-1);
    });
};
