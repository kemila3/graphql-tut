import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import db from "./db.js"

const resolvers = {
    Query: {
        games : () => db.games,
        authors : () => db.authors,
        reviews : () => db.reviews,
        review : (_,args) => db.reviews.find((review) => review.id === args.id),
        game : (_,args) => db.games.find((game) => game.id === args.id),
        author : (_,args) => db.authors.find((author) => author.id === args.id),
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


const {url} = await startStandaloneServer(server, {
    listen : {port : 3000}
})

console.log(`🚀  Server ready at: ${url}`);