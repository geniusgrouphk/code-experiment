'use strict';

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arr = [1, 2, 3, 4, 5];

_async2.default.map(arr, function (e, cb) {
  cb(null, e * e);
}, function (err, results) {
  if (err) {
    console.err(err);
  }
  console.log(_util2.default.inspect(results));
});

var result = [];
var addOneAsync = function addOneAsync(e, cb) {
  console.log(e + 1);
  cb(null, e + 1);
};
// test function work
addOneAsync(1, function (err, r) {});

var map = function map(arr, aFn, cbFinal) {
  var result = [];
  var finalErr = null;
  console.log('test start: ' + _util2.default.inspect(arr));

  var _loop = function _loop(i) {
    aFn(arr[i], function (err, res) {
      if (err) {
        finalErr = err;
      }
      result[i] = res;
    });
  };

  for (var i = 0; i < arr.length; i++) {
    _loop(i);
  }

  cbFinal(finalErr, result);
};

map([1, 2, 3], addOneAsync, function (err, result) {
  console.log('final: ' + _util2.default.inspect(result));
});