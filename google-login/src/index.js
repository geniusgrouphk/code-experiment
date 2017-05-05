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

app.get('/oauth2/google/callback',   // Finish OAuth 2 flow using Passport.js
  passport.authenticate('google'),

  // Redirect back to the original page, if any
  (req, res) => {
    logger.debug('user come back...')
    logger.debug(util.inspect(req.user))
    res.json(req.user)
  })

app.listen(config.port, () => {
  logger.debug('app listening to port: ' + config.port)
})
