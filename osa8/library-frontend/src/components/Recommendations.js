import React from 'react'
import Books from './Books'

const Recommendations = props => {
    if (!props.show) return null
    if (props.user.error || props.books.error) return <div>Error</div>
    if (!props.user.data || !props.books.data) return <div>Loading</div>
    return (
        <div>
            <h2>Recommendations</h2>
            <p>
                Books in your favorite genre: <b>{props.user.data.me.favoriteGenre}</b>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th />
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {props.books.data.allBooks.map(book =>
                        book.genres.includes(props.user.data.me.favoriteGenre) ? (
                            <tr key={book.title}>
                                <td>{book.title}</td>
                                <td>{book.author.name}</td>
                                <td>{book.published}</td>
                            </tr>
                        ) : null
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations
