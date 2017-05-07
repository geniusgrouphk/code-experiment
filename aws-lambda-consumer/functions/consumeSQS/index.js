const AWS = require('aws-sdk')
const config = require('./config/config')

AWS.config.loadFromPath('./config/aws.json')

var sqs = new AWS.SQS({apiVersion: '2012-11-05'})

var queueURL = config.queueUrl;

var params = {
  AttributeNames: [
    'SentTimestamp'
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    'All'
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
}

console.log('starting sqs function')
sqs.receiveMessage(params, function(err, data) {
  if (!data.Messages) {
    console.log('queue is empty, process is exiting now');
    return;
  }

  if (err) {
    console.log("Receive Error", err);
  } else {
    var deleteParams = {
      QueueUrl: queueURL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };
    sqs.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});
exports.handle = function (e, ctx, cb) {
  console.log('processing event: %j', e)
  cb(null, { hello: 'world' })
}
