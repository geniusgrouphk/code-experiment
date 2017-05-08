const AWS = require('aws-sdk')
const config = require('./config/config')

AWS.config.loadFromPath('./config/aws.json')

const SQS = new AWS.SQS({ apiVersion: '2012-11-05' })
const Lambda = new AWS.Lambda({ apiVersion: '2015-03-31' })

// Your queue URL stored in the queueUrl environment variable
const QUEUE_URL = config.queueUrl

exports.handle = (event, context, callback) => {
  var params = {
    MessageBody: event.message || 'test',
    QueueUrl: QUEUE_URL,
    DelaySeconds: 0
  }

  SQS.sendMessage(params, (err, data) => {
    if (err) {
      callback(err)
    }

    callback(null, { requestId: data.ResponseMetadata.RequestId, messageId: data.MessageId })
  });
}
