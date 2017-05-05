import bunyan from 'bunyan'

module.exports = bunyan.createLogger({
  name: 'event-core-service',
  streams: [{
    level: 'debug',
    stream: process.stdout
  }]
})
