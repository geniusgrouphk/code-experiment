import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import config from './config'
import logger from '../util/logger'

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.auth.jwt.secret
}, (payload, next) => {
  logger.debug('payload received', payload);
}))

passport.use('google', new GoogleStrategy({
  clientID: config.auth.google.clientId,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.callbackUrl,
  accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, (profile) => {
    let imageUrl = ''
    if (profile.photos && profile.photos.length) {
      imageUrl = profile.photos[0].value
    }
    return {
      id: profile.id,
      displayName: profile.displayName,
      image: imageUrl
    }}
  )
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

module.exports = passport
