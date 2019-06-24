import React, { useState } from 'react'

const Books = props => {
    const initialFilter = props.filter || ''
    const [genreFilter, setGenreFilter] = useState(initialFilter)
    if (!props.show) {
        return null
    }

    const result = props.result

    if (result.loading) return <div>Loading...</div>

    if (result.error) return <div>Error fetching books</div>

    const books = result.data.allBooks
    const genres = new Set(books.reduce((prev, cur) => prev.concat(cur.genres), []))

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
                        if (genreFilter) {
                            if (a.genres.includes(genreFilter)) {
                                return (
                                    <tr key={a.title}>
                                        <td>{a.title}</td>
                                        <td>{a.author.name}</td>
                                        <td>{a.published}</td>
                                    </tr>
                                )
                            }
                        } else {
                            return (
                                <tr key={a.title}>
                                    <td>{a.title}</td>
                                    <td>{a.author.name}</td>
                                    <td>{a.published}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
            {Array.from(genres).map(genre => (
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
