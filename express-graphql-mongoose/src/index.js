import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import config from './config/config'
import controllers from './controller'

const app = express()

console.log('init DB...')
mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl)

console.log('init server...')
app.listen(process.env.PORT || config.port || 3000)

app.use(bodyParser.json({
  type: '*/json'
}))

app.use('/', controllers)

app.disable('x-powered-by')

export default app
