import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const anecdotes = props.visibleAnecdotes
    const vote = anecdote => {
        props.voteAnecdote(anecdote)
        const message = "You voted '" + anecdote.content + "'"
        props.setNotification(message, 5)
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
                        <button onClick={() => vote(anecdote)}>vote</button>
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
    setNotification,
    voteAnecdote
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
