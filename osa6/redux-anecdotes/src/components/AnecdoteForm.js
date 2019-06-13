import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
    const newAnecdote = async event => {
        event.preventDefault()
        const content = event.target.content.value
        props.addAnecdote(content)
        props.setNotification(`Added new anecdote '${content}'`)
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
    setNotification
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)
