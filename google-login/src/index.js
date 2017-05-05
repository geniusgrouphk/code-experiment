import express from 'express'
import bodyParser from 'body-parser'

import logger from './util/logger'
import config from './config/config'
import authController from './controller/auth'
import passport from './config/passport'

const app = express()

app.use(passport.initialize())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: config.loginUrl
  }),
  (req, res) => {
    res.json({ message: 'Success! You can not see this without a token' })
  }
)

app.use('/auth', authController)

app.listen(config.port, () => {
  logger.debug('app listening to port: ' + config.port)
})
