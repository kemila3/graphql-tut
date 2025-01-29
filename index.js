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
    },
    Game : {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Review : {
        author : (parent) => db.authors.find((r) => r.id === parent.author_id ),
        game : (parent) => db.games.find((r) => r.id === parent.game_id)

    },
    Author : {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Mutation : {
        deleteAuthor(_, args) {
            db.authors =  db.authors.filter((R) => R.id !== args.id)
            return db.authors
        }
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