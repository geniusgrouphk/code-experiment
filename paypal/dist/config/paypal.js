'use strict';

var _paypalRestSdk = require('paypal-rest-sdk');

var _paypalRestSdk2 = _interopRequireDefault(_paypalRestSdk);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _paypalRestSdk2.default.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id': _config2.default.credentials.paypal.clientId,
  'client_secret': _config2.default.credentails.paypal.secret
});