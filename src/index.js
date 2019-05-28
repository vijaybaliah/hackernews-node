const { GraphQLServer } = require('graphql-yoga')
const typeDefs = './src/schema.graphql'

let links = [
  {
    id: 'link-0',
    description: 'first link',
    url: 'first'
  }
]

const linkLength = links.length

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (parent, {id}) => {
      const result = links.find(currentLink => currentLink.id === id)
      return result
    }
  },

  Mutation: {
    post: (parent, {description, url}) => {
      const link = {
        id: `link-${linkLength++}`,
        description,
        url
      }
      links.push(link)
      return link
    },
    updateLink: (parent, {id, description, url}) => {
      const result = links.find(currentLink => currentLink.id === id)
      if (result) {
        result['description'] = description
        result['url'] = url
      }
      return result
    },
    deleteLink: (parent, {id}) => {
      let result = null
      const filteredResult = links.filter(currentLink => {
        if (currentLink.id !== id) {
          return currentLink
        } else {
          result = currentLink
        }
      })
      links = filteredResult
      return result
    }
  },

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('Server is running on http://localhost:4000'))
