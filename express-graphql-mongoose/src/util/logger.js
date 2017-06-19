import bunyan from 'bunyan'

module.exports = bunyan.createLogger({
  name: 'code-experiment/graphql',
  streams: [{
    level: 'debug',
    stream: process.stdout
  }]
})
