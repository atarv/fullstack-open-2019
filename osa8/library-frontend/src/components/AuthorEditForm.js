import React, { useState } from 'react'

const AuthorEditForm = props => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const submit = async e => {
        e.preventDefault()
        console.log('submit edit', name, born, parseInt(born))

        await props.setBirthYear({
            variables: { name, born: parseInt(born) }
        })
        setName('')
        setBorn('')
    }

    return (
        <div>
            <h3>Set birth year</h3>
            <form onSubmit={submit}>
                <select onChange={e => setName(e.target.value)}>
                    {props.authors.map(author => (
                        <option key={author.name} value={author.name}>
                            {author.name}
                        </option>
                    ))}
                </select>
                <br />
                <label>born</label>
                <input type="text" value={born} onChange={e => setBorn(e.target.value)} />
                <br />
                <button>update author</button>
            </form>
        </div>
    )
}

export default AuthorEditForm
