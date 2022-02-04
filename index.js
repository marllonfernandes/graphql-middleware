require('dotenv').config()
const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')
const context = require('./config/context')
const port = process.env.APP_PORT || 4444

const schemaPath = './schema/index.graphql'
const server = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers,
    context
})


server.listen({ port }).then(({ url }) => {
    console.log(`Running on ${url}`)
})