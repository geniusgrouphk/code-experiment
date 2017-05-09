import paypal from 'paypal-rest-sdk'

import config from './config'

module.exports = paypal.configure({
  'mode': 'sandbox', // sandbox or live
  'client_id': config.credentials.paypal.clientId,
  'client_secret': config.credentails.paypal.secret
})
