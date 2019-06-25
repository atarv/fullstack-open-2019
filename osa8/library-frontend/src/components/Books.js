import React, { useState, useEffect } from 'react'

const Books = props => {
    const initialFilter = props.filter || ''
    const [genreFilter, setGenreFilter] = useState(initialFilter)
    const [genres, setGenres] = useState([])
    const [books, setBooks] = useState([])
    const result = props.booksQuery

    useEffect(() => {
        // fetch books in given genre
        props.client
            .query({
                query: props.booksQuery,
                variables: {
                    genre: genreFilter
                }
            })
            .then(res => setBooks(res.data.allBooks))
        // fetch genres
        props.client
            .query({
                query: props.genreQuery,
                variables: {}
            })
            .then(res =>
                setGenres(
                    Array.from(
                        new Set(
                            res.data.allBooks.reduce((prev, cur) => prev.concat(cur.genres), [])
                        )
                    )
                )
            )
            .catch(err => console.log('vituks meni:', err))
    }, [genreFilter, props.genreQuery, props.booksQuery])

    if (!props.show) {
        return null
    }

    if (result.loading) return <div>Loading...</div>

    if (result.error) return <div>Error fetching books</div>

    return (
        <div>
            <h2>books</h2>
            <table>
                <tbody>
                    <tr>
                        <th />
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map(a => {
                        return (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {genres.map(genre => (
                <button key={genre} onClick={() => setGenreFilter(genre)}>
                    {genre}
                </button>
            ))}
            <button key="$all" onClick={() => setGenreFilter('')}>
                all genres
            </button>
        </div>
    )
}

export default Books
