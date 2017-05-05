import { Router } from 'express'

import logger from '../util/logger'

const router = Router()

router.get('/:platform/callback', (req, res, next) => {
  let platform = req.params.platform
  passport.authenticate(platform, (err, user, info) => {
    if (err) {
      logger.warn(util.inspect(err))
      res.json('failed retrieving user info')
      return
    }

    logger.debug('user come back...')
    logger.debug(util.inspect(user))
    res.json(user)
  })(req, res, next)
})

module.exports = router
