import _ from 'lodash'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import passportJWT from 'passport-jwt'

import logger from '../util/logger'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = 'tasmanianDevil'

const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  logger.debug('payload received', jwt_payload)
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})]
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})

passport.use(strategy)

module.exports = passport
