import express from 'express'
import logger from './util/logger'
import config from './config/config'
import authController from './controller/auth'

const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
  logger.debug('app listening to port: ' + port)
})

app.use('auth', authController)
