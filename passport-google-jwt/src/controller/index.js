import { Router } from 'express'

import loginController from './login'
import userController from './user'
import oauth2CallbackController from './oauth2Callback'
import logger from '../util/logger'

const router = Router()

router.get('/', (req, res) => {
  logger.debug('test')
  res.json('test')
})

router.use('/login', loginController)
router.use('oauth2', oauth2CallbackController)
router.use('/user', userController)

module.exports = router
