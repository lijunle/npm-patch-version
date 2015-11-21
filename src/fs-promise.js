var fs = require('fs');
var Promise = require('es6-promise').Promise;

exports.readFile = function readFile(filePath) {
  return new Promise(function readFilePromise(resolve, reject) {
    fs.readFile(filePath, 'utf-8', function readFileHandler(error, content) {
      return error ? reject(error) : resolve(content);
    });
  });
};

exports.writeFile = function writeFile(filePath, content) {
  return new Promise(function writeFilePromise(resolve, reject) {
    fs.writeFile(filePath, content, function writeFileHandler(error) {
      return error ? reject(error) : resolve();
    });
  });
};
