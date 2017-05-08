const AWS = require('aws-sdk')
const config = require('./config/config')

AWS.config.loadFromPath('./config/aws-credentials.json')
const SQS = new AWS.SQS({ apiVersion: '2012-11-05' })
const Lambda = new AWS.Lambda({ apiVersion: '2015-03-31' })

// Your queue URL stored in the queueUrl environment variable
const QUEUE_URL = config.queueUrl

exports.handle = (event, context, callback) => {
  var params = {
     QueueUrl: QUEUE_URL,
     VisibilityTimeout: 600
 };

 SQS.receiveMessage(params, (err, data) => {
     if (err) {
       callback(err)
     }

     callback(null, data)
   })
 }
