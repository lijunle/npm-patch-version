var test = require('ava');
var path = require('path');
var fsp = require('../src/fs-promise');
var patchVersion = require('../src/index');

function storage() {
  var value = '';

  function store(newValue) {
    value = newValue;
  }

  Object.defineProperty(store, 'value', {
    get: function get() {
      return value;
    },
  });

  return store;
}

function include(str, substr) {
  return str.indexOf(substr) !== -1;
}

test(function testPatchVersion(t) {
  var dir = path.resolve(__dirname, './fake');
  var file = path.resolve(dir, './package.json');
  var version = '0.0.2';
  var log = storage();
  var error = storage();
  var exit = storage();

  return fsp.readFile(file, 'utf-8')
    .then(function backup(content) {
      t.context.content = content;
      return content;
    })
    .then(function prepareAct(content) {
      var metadata = JSON.parse(content);
      t.same(metadata.version, '0.0.1');
      t.notSame(metadata.version, version);
    })
    .then(function act() {
      return patchVersion(dir, version, log, error, exit);
    })
    .then(function prepareAssert() {
      return fsp.readFile(file, 'utf-8');
    })
    .then(function assert(content) {
      var metadata = JSON.parse(content);
      t.same(metadata.version, version);
      t.same(metadata.name, 'fake');
      t.ok(include(log.value, 'version'));
      t.ok(include(log.value, version));
      t.ok(include(log.value, file));
      t.ok(error.value === '');
      t.ok(exit.value === 0);
    })
    .then(function restore() {
      return fsp.writeFile(file, t.context.content);
    }, function restore() {
      return fsp.writeFile(file, t.context.content);
    });
});

test(function testFileNotFound(t) {
  var version = '0.0.3';
  var log = storage();
  var error = storage();
  var exit = storage();

  return patchVersion(__dirname, version, log, error, exit)
    .then(function assert() {
      var metadata = require('./fake/package.json');
      t.same(metadata.version, '0.0.1');
      t.same(metadata.name, 'fake');
      t.ok(include(error.value, 'ENOENT'));
      t.ok(include(error.value, path.resolve(__dirname, './package.json')));
      t.ok(log.value === '');
      t.ok(exit.value === -1);
    });
});
