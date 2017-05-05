import bodyParser from 'body-parser'
import express from 'express'
import passport from './passport'

const app = express()

app.use(passport.initialize())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

module.exports = app
