module.exports = {
  paypal: {
    customer: {
      buyer: {
        email: 'email1@email.com',
        accountNumber: '0000000',
        routingNumber: '000',
        creditCardNumber: '0000000000000000',
        cardType: 'VISA',
        cardExpiry: '01/2017',
        country: 'HK'
      },
      poor: {

      }
    },
    facilitator: {
      username: 'facilitator_user_name',
      password: 'IDontKnowWhatPasswordIs',
      signature: 'signYourNameHere',
      accessToken: {
        token: 'yourTokenHere',
        expiry: '01 JAN 2017'
      }
    }
  }
}
