import React from 'react'

const App = props => {
    const anecdotes = props.store.getState()

    const vote = id => {
        console.log('vote', id)
        props.store.dispatch({
            type: 'VOTE',
            id
        })
    }

    const addAnecdote = event => {
        event.preventDefault()
        const content = event.target.content.value
        console.log('add', content)
        props.store.dispatch({
            type: 'ADD',
            content
        })
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                ))}
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="content" />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App
