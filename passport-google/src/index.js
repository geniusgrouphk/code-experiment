import express from 'express'
import bodyParser from 'body-parser'
import util from 'util'

import logger from './util/logger'
import config from './config/config'
import passport from './config/passport'

const app = express()

app.use(passport.initialize())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.get('/',
(req, res) => {
  res.json(req.user)
})

app.get('/login/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
)

app.get('/oauth2/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      logger.warn(util.inspect(err))
      res.json('failed retrieving user info')
    }

    logger.debug('user come back...')
    logger.debug(util.inspect(req.user))
    res.json(req.user)
  })(req, res, next)
})

app.listen(config.port, () => {
  logger.debug('app listening to port: ' + config.port)
})
