require('dotenv').config()
const uuid = require('uuid/v1')
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to ', MONGODB_URI)
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB: ', err))

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]
        allAuthors: [Author]
    }
    type Mutation {
        addBook(title: String!, author: String!, published: Int!, genres: [String]!): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author })
                return Book.find({ author: author.id, genres: { $in: args.genre } })
            } else if (args.author) {
                const author = await Author.findOne({ name: args.author })
                console.log('author', author)
                return Book.find({ author: author.id })
            } else if (args.genre) {
                return Book.find({ genres: { $in: args.genre } })
            }
            return Book.find({}).populate('author')
        },
        bookCount: (root, args) => Book.find({ author: args.name }),
        allAuthors: () => Author.find({})
    },
    Mutation: {
        addBook: async (root, args) => {
            if (await Author.find({ name: args.author })) {
                // existing author
                const book = new Book({ ...args })
                try {
                    return book.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            } else {
                // new author
                const newAuthor = new Author({ name: args.author, born: null })
                try {
                    newAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }

                const book = { ...args }
                try {
                    return book.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            }
        },
        editAuthor: (root, args) => {
            return Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo },
                { returnNewDocument: true }
            )
        }
    },
    Author: {
        bookCount: async root => {
            const books = await Book.find({ author: await Author.findOne({ name: root.name }) })
            return books.length
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
