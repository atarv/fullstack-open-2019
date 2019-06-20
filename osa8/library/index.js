const uuid = require('uuid/v1')
const { ApolloServer, gql } = require('apollo-server')

let authors = [
    {
        name: 'Robert Martin',
        id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
        born: 1952
    },
    {
        name: 'Martin Fowler',
        id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
    }
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'revolution']
    }
]

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: String!
        id: String!
        genres: [String]!
    }
    type Author {
        name: String!
        id: String!
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
        editAuthor(name: String, setBornTo: Int): Author
    }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if (args.author && args.genre) {
                return books.filter(
                    book => book.author === args.author && book.genres.includes(args.genre)
                )
            } else if (args.author) {
                return books.filter(book => book.author === args.author)
            } else if (args.genre) {
                return books.filter(book => book.genres.includes(args.genre))
            }
            return books
        },
        bookCount: (root, args) => books.filter(book => args.name === book.author).length,
        allAuthors: () => {
            return authors.map(author => ({
                ...author,
                bookCount: books.filter(book => book.author === author.name).length
            }))
        }
    },
    Mutation: {
        addBook: (root, args) => {
            if (authors.find(author => author.name === args.author)) {
                const book = { ...args }
                books = books.concat(book)
                return book
            } else {
                // new author
                const author = { name: args.author, born: null, id: uuid() }
                console.log('author object', author)

                authors = authors.concat(author)

                const book = { ...args, id: uuid() }
                books = books.concat(book)
                return book
            }
        },
        editAuthor: (root, args) => {
            let authorToModify = authors.find(author => author.name === args.name)
            console.log(authors)
            if (authorToModify) {
                authorToModify.born = args.setBornTo
                authors = authors.map(author =>
                    author.name === authorToModify.name ? authorToModify : author
                )

                return authorToModify
            }
            return null
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
