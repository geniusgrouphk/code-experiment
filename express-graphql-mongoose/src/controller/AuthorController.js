import { Router } from 'express'

import Author from '../model/Author'
import logger from '../util/logger'

const router = Router()

router.get('/', (req, res, next) => {
  Author.find()
    .lean()
    .then(authors => res.json(authors)).catch(e => { throw e })
})

router.post('/', ({ body: { name } }, res, next) => {
  logger.debug(name)
  Author.create({ name: name }, (err, author) => {
    if (err) {
      return res.status(400).send(err)
    }

    res.json(author)
  })
})

module.exports = router
