import { Router } from 'express'
import graphqlHTTP from 'express-graphql'

import AuthorSchema from '../query/AuthorSchema'

const router = Router()

router.get('/authors', graphqlHTTP({
  schema: AuthorSchema
  // graphiql: true
}))

export default router
