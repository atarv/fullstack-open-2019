import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {
    const newAnecdote = event => {
        event.preventDefault()
        const content = event.target.content.value
        console.log('add', content)
        props.store.dispatch(addAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div>
                    <input name="content" />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
