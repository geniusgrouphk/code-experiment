import express from 'express'
import util from 'util'

import logger from '../util/logger'

const router = express.Router()

router.get('/', (req, res) => {
  logger.debug('user: ' + util.inspect(req.user))
  res.json(req.user)
})

module.exports = router
