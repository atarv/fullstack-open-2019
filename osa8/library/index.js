require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')

const JWT_SECRET = 'JWT_SECRET_KEY'

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
        me: User
    }
    type Mutation {
        addBook(title: String!, author: String!, published: Int!, genres: [String]!): Book
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                const author = await Author.findOne({ name: args.author })
                return Book.find({ author: author.id, genres: { $in: args.genre } }).populate(
                    'author'
                )
            } else if (args.author) {
                const author = await Author.findOne({ name: args.author })
                return Book.find({ author: author.id }).populate('author')
            } else if (args.genre) {
                return Book.find({ genres: { $in: args.genre } }).populate('author')
            }
            return Book.find({}).populate('author')
        },
        bookCount: (root, args) => Book.find({ author: args.name }),
        allAuthors: () => Author.find({}),
        me: (root, args, context) => context.currentUser
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new UserInputError('Unauthorized')
            }
            const existingAuthor = await Author.findOne({ name: args.author })
            if (existingAuthor) {
                const book = new Book({ ...args, author: existingAuthor })
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
                let savedAuthor = null
                try {
                    savedAuthor = await newAuthor.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }

                const book = new Book({ ...args, author: savedAuthor })
                try {
                    return book.save()
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            }
        },
        editAuthor: (root, args, context) => {
            if (!context.currentUser) {
                throw new UserInputError('Unauthorized')
            }
            return Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo },
                { returnNewDocument: true }
            )
        },
        createUser: (root, args) => {
            const user = new User({ ...args, password: 'password' })
            return user.save().catch(error => {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'password') {
                throw new UserInputError('Invalid username or password')
            }

            const userToken = {
                username: user.username,
                favoriteGenre: args.favoriteGenre,
                id: user.id
            }

            return { value: jwt.sign(userToken, JWT_SECRET) }
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
    resolvers,
    context: async ({ req }) => {
        const authorization = req ? req.headers.authorization : null

        if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)

            return { currentUser }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
