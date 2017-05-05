import express from 'express'
import jwt from 'jsonwebtoken'
const routes = express.Router()

routes.get('/login', res => {

})

routes.get('/profile', (req, res, next) => {
  res.json('')
})

module.exports = routes
