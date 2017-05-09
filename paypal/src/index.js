import express from 'express'

import config from './config'


const app = express()

app.use('/', (req, res, errHandler) => {

})

app.listen(config.port, () => {
  console.log('app listening to port: ' + config.port)
})
