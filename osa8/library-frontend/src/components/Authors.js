import React from 'react'
import AuthorEditForm from './AuthorEditForm'

const Authors = props => {
    if (!props.show) {
        return null
    }

    const result = props.result

    if (result.loading) return <div>Loading...</div>

    if (result.error) {
        console.log(result.error)
        return <div>Error</div>
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th />
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {result.data.allAuthors.map(a => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AuthorEditForm setBirthYear={props.setBirthYear} authors={result.data.allAuthors} />
        </div>
    )
}

export default Authors
