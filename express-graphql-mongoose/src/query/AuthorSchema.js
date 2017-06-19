import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean
} from 'graphql/type'

import Author from '../model/Author'

export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true
    return projections
  }, {})
}

const authorType = new GraphQLObjectType({
  name: 'author',
  description: 'Author of books',
  fields: () => ({
    _id: {
      type: (GraphQLID),
      description: 'Object ID of an author',
    },
    name: {
      type: GraphQLString,
      description: 'Name of Author',
    }
  })
})

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      authors: {
        type: new GraphQLList(authorType),
        args: {
          name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, { name }) => {
          return Author.find({ name: { "$regex": name, "$options": "i" } })
        }
      }
    }
  })

})

export default schema
