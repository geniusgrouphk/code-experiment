import { Router } from 'express'

import logger from '../util/logger'

const router = Router()

router.get('/:platform', (req, res, next) => {
  logger.debug('log in to platform: ' + req.params.platform)
})

module.exports = router
