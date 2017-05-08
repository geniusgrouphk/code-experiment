const AWS = require('aws-sdk')
const config = require('./config/config')
AWS.config.loadFromPath('./config/aws.json')
const SQS = new AWS.SQS({ apiVersion: '2012-11-05' })
const Lambda = new AWS.Lambda({ apiVersion: '2015-03-31' })

// Your queue URL stored in the queueUrl environment variable
const QUEUE_URL = config.queueUrl
const PROCESS_MESSAGE = 'process-message'


const invokePoller = (functionName, message) => {
  const payload = {
    operation: PROCESS_MESSAGE,
    message
  }
  const params = {
    FunctionName: functionName,
    InvocationType: 'Event',
    Payload: new Buffer(JSON.stringify(payload))
  }
  return new Promise((resolve, reject) => {
    Lambda.invoke(params, (err) => (err ? reject(err) : resolve()))
  })
}

const processMessage = (message, callback) => {
  console.log(message)

    // delete message
  const params = {
    QueueUrl: QUEUE_URL,
    ReceiptHandle: message.ReceiptHandle
  }
  SQS.deleteMessage(params, (err) => callback(err, message))
}

const poll = (functionName, callback) => {
  const params = {
    QueueUrl: QUEUE_URL,
    MaxNumberOfMessages: 10,
    VisibilityTimeout: 10
  }

  SQS.receiveMessage(params, (err, data) => {
    if (err) {
      return callback(err)
    }
    if (!data.Messages) {
      console.log('queue is empty, quite now')
      return
    }

    const promises = data.Messages.map((message) => invokePoller(functionName, message))
    Promise.all(promises).then(() => {
      const result = `Messages received: ${data.Messages.length}`
      console.log(result)
      callback(null, result)
    })
  })
}

exports.handle = (event, context, callback) => {
  try {
    if (event.operation === PROCESS_MESSAGE) {
      processMessage(event.message, callback)
    } else {
      poll(context.functionName, callback)
    }
  } catch (err) {
    callback(err)
  }
}
