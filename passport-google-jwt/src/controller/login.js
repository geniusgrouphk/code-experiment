import { Router } from 'express'
import passport from 'passport'

import logger from '../util/logger'
import config from '../config/config'

const router = Router()

router.get('/', (req, res, next) => {
  res.send('please choose a social platform to login: http://localhost:8080/login/google')
})

router.get('/:platform', (req, res, next) => {
  logger.debug('log in to platform: ' + req.params.platform)
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })(req, res, next)
})

module.exports = router
