import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

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
            author {
                name
            }
            published
            genres
        }
    }
`

const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            author {
                name
            }
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

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

const GET_USER = gql`
    query me {
        me {
            username
            favoriteGenre
        }
    }
`

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(localStorage.getItem('book-app-user-token', token))
    }, [])

    const handleError = error => {
        console.log(error)
    }

    const client = useApolloClient()
    const authorsQuery = useQuery(ALL_AUTHORS)
    const booksQuery = useQuery(ALL_BOOKS)
    const user = useQuery(GET_USER)
    const addBook = useMutation(ADD_BOOK, {
        onError: handleError,
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
    })
    const setBirthYear = useMutation(SET_BIRTH_YEAR, {
        onError: handleError,
        refetchQueries: [{ query: ALL_AUTHORS }]
    })
    const login = useMutation(LOGIN, {
        onError: handleError
    })

    const handleLogout = () => {
        setToken(null)
        localStorage.clear()
        setPage('login')
        client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>

                {localStorage.getItem('book-app-user-token') ? (
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommendations')}>recommendations</button>
                        <button onClick={handleLogout}>logout</button>
                    </>
                ) : (
                    <button onClick={() => setPage('login')}>login</button>
                )}
            </div>

            <Authors show={page === 'authors'} result={authorsQuery} setBirthYear={setBirthYear} />

            <Books show={page === 'books'} result={booksQuery} />

            <NewBook show={page === 'add'} addBook={addBook} />

            <Recommendations show={page === 'recommendations'} books={booksQuery} user={user} />

            <LoginForm
                show={page === 'login'}
                login={login}
                setToken={token => setToken(token)}
                handleError={handleError}
            />
        </div>
    )
}

export default App
