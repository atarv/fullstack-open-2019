import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { notify, hide } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
    const showWithTimeout = (message, timeout = 5000) => {
        props.notify(message)
        setTimeout(() => {
            props.hide()
        }, timeout)
    }

    const newAnecdote = async event => {
        event.preventDefault()
        const content = event.target.content.value
        props.addAnecdote(content)
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
            <br />
        </div>
    )
}

const mapDispatchToProps = {
    addAnecdote,
    notify,
    hide
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
