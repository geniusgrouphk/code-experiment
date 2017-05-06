import { Router } from 'express'
import passport from 'passport'
import util from 'util'
import jwt from 'jsonwebtoken'

import config from '../config/config'
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
    logger.debug(util.inspect(info))
    let token = jwt.sign(user, config.auth.jwt.secret, { expiresIn:  config.auth.jwt.ttl })

    res.json({user: user, token: token})
  })(req, res, next)
})

module.exports = router
