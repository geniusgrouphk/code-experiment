import { Router } from 'express'

import logger from '../util/logger'

const router = Router()

router.get('/:platform/callback', (req, res, next) => {
  logger.debug('oauth2 callback, from: ' + req.params.platform)
})

module.exports = router
