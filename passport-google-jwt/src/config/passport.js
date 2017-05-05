import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'
import config from './config'

const extractGoogleProfile = (profile) => {
  let imageUrl = ''
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl
  }
}

passport.use(new Strategy({
  clientID: config.auth.google.clientId,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.callbackUrl,
  accessType: 'offline'
}, (accessToken, refreshToken, profile, cb) => {
  cb(null, extractGoogleProfile(profile))
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

module.exports = passport
