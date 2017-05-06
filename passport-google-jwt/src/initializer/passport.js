import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import config from './config'
import logger from '../util/logger'

passport.use('jwt', new JwtStrategy({
  // jwtFromRequest: ExtractJwt.fromAuthHeader(), // not using header due to demo
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
  secretOrKey: config.auth.jwt.secret
}, (user, next) => {
  logger.debug('payload received', user)
  user.from = 'jwt'
  next(null, user)
}))

passport.use('google', new GoogleStrategy({
  clientID: config.auth.google.clientId,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.callbackUrl,
  accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, ((profile) => {
    let imageUrl = ''
    if (profile.photos && profile.photos.length) {
      imageUrl = profile.photos[0].value
    }

    return {
      id: profile.id,
      displayName: profile.displayName,
      image: imageUrl
    }
  })(profile))
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

module.exports = passport
