import { Router } from 'express'

import AuthorController from './AuthorController'
import BookController from './BookController'
import QueryController from './QueryController'
const router = Router()

router.use('/authors', AuthorController)
router.use('/books', BookController)
router.use('/query', QueryController)

module.exports = router
