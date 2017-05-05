import credentials from './credentials'

const port = process.env.PORT || 8080

module.exports = {
  'port': port,
  'loginUrl': 'http://localhost:' + port + '/login',
  'auth': {
    'google': {
      'clientId': credentials.googleClientId,
      'clientSecret': credentials.googleClientSecret,
      'callbackUrl': 'http://localhost:8080/oauth2/google/callback'
    }
  },
  'mongoDbUrl': 'mongodb://' +
    credentials.dbUser +
    ':' + credentials.dbPassword +
    '@cluster0-shard-00-00-qipx2.mongodb.net:27017,' +
    'cluster0-shard-00-01-qipx2.mongodb.net:27017,' +
     'cluster0-shard-00-02-qipx2.mongodb.net:27017/codeExperiment?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

}
