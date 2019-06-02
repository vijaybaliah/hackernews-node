const { GraphQLServer } = require('graphql-yoga')
const typeDefs = './src/schema.graphql'
const { prisma } = require('./generated/prisma-client')


const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    },
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
    deletePost: (root, args, context) => {
      return context.prisma.deleteLink({
        id: args.id
      })
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { prisma }
})

server.start(() => console.log('Server is running on http://localhost:4000'))
