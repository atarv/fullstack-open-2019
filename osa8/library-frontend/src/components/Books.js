import React from 'react'

const Books = props => {
    if (!props.show) {
        return null
    }

    const result = props.result

    if (result.loading) return <div>Loading...</div>

    if (result.error) return <div>Error fetching books</div>

    const books = result.data.allBooks

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
                    {books.map(a => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
<<<<<<< HEAD
                            <td>{a.author.name}</td>
=======
                            <td>{a.author}</td>
>>>>>>> 2825b4a507f4ace26e91e59f62a188055926d17b
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Books
