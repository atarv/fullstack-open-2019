import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notify, hide } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
    const showWithTimeout = (message, timeout = 5000) => {
        props.store.dispatch(notify(message))
        setTimeout(() => {
            props.store.dispatch(hide())
        }, timeout)
    }

    const newAnecdote = event => {
        event.preventDefault()
        const content = event.target.content.value
        console.log('add', content)
        props.store.dispatch(addAnecdote(content))
        showWithTimeout("Added new anecdote '" + content + "'")
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
