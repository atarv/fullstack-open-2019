import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify, hide } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotes = props.store.getState().anecdotes
    const filter = props.store.getState().filter

    const showWithTimeout = (message, timeout = 5000) => {
        props.store.dispatch(notify(message))
        setTimeout(() => {
            props.store.dispatch(hide())
        }, timeout)
    }

    const vote = id => {
        console.log('vote', id)
        props.store.dispatch(voteAnecdote(id))
        const message =
            "You voted '" + props.store.getState().anecdotes.find(a => a.id === id).content + "'"
        showWithTimeout(message)
    }

    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    anecdote.content.toLowerCase().includes(filter.toLowerCase()) ? (
                        <div key={anecdote.id}>
                            <div>{anecdote.content}</div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => vote(anecdote.id)}>vote</button>
                            </div>
                        </div>
                    ) : null
                )}
        </div>
    )
}

export default AnecdoteList
