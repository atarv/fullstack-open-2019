import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, hide } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotes = props.visibleAnecdotes
    const showWithTimeout = (message, timeout = 5000) => {
        props.notify(message)
        setTimeout(() => {
            props.hide()
        }, timeout)
    }

    const vote = id => {
        props.voteAnecdote(id)
        const message = "You voted '" + props.visibleAnecdotes.find(a => a.id === id).content + "'"
        showWithTimeout(message)
    }

    const style = {
        borderStyle: 'solid',
        borderWidth: 1,
        padding: '0.5em',
        marginBottom: '1em'
    }

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id} style={style}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    return anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = state => {
    return {
        visibleAnecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    notify,
    hide
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
