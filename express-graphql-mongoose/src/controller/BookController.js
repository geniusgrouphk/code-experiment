import { Router } from 'express'

import Book from '../model/Book'
import logger from '../util/logger'

const router = Router()

router.get('/', (req, res, next) => {
  const cursor = Book.find().cursor().on('data', (data) => {
    logger.debug(data)
    res.json(data)
  }).on('error', () => {
    res.status(500).send('db error')
  }).on('close', () => {
    logger.debug('cursor close')
    res.json('no result found')
  })
})

router.post('/', () => {

})

module.exports = router
