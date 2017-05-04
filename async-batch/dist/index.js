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

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var addOneAsync = async function addOneAsync(e, cb) {
  if (e % 2) {
    await sleep(2000);
  }
  console.log(e + 1);
  cb(null, e + 1);
};

var map = async function map(arr, aFn, cbFinal) {
  var result = [];
  var finalErr = null;
  console.log('test start: ' + _util2.default.inspect(arr));

  var _loop = async function _loop(i) {
    await aFn(arr[i], function (err, res) {
      if (err) {
        finalErr = err;
      }
      result[i] = res;
    });
  };

  for (var i = 0; i < arr.length; i++) {
    await _loop(i);
  }

  cbFinal(finalErr, result);
};

map([1, 2, 3], addOneAsync, function (err, result) {
  console.log('final: ' + _util2.default.inspect(result));
});