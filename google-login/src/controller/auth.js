import express from 'express'

import logger from '../util/logger'

const routes = express.Router()

routes.get('/', res => {
  logger.debug('user login')
})

routes.get('/profile', (req, res, next) => {
  res.json('')
})

module.exports = routes
