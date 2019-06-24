import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks'

const ALL_AUTHORS = gql`
    {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

const ALL_BOOKS = gql`
    {
        allBooks {
            title
            author
            published
        }
    }
`

const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author
            published
            genres
        }
    }
`

const SET_BIRTH_YEAR = gql`
    mutation editAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
            bookCount
        }
    }
`

const App = () => {
    const [page, setPage] = useState('authors')

    const handleError = error => {
        console.log(error)
    }

    const authorsQuery = useQuery(ALL_AUTHORS)
    const booksQuery = useQuery(ALL_BOOKS)
    const addBook = useMutation(ADD_BOOK, {
        onError: handleError,
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
    })
    const setBirthYear = useMutation(SET_BIRTH_YEAR, {
        onError: handleError,
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors show={page === 'authors'} result={authorsQuery} setBirthYear={setBirthYear} />

            <Books show={page === 'books'} result={booksQuery} />

            <NewBook show={page === 'add'} addBook={addBook} />
        </div>
    )
}

export default App
