import express from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import passportJWT from 'passport-jwt'

const routes = express.Router()

routes.get('/login', res => {

})

routes.get('/profile', (req, res, next) => {
  res.json('')
})

module.exports = routes
