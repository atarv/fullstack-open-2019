import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const MostVoted = ({anecdotes, votes}) => {

    let bestIndex = 0
    votes.reduce((prev, cur, i) => {
        if (prev > cur) return prev
        bestIndex = i
        return cur
    })
    
    return (
        <p>{anecdotes[bestIndex]}</p>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
    const nextAnecdote = () => getRandom(0, props.anecdotes.length)
    const Vote = (i) => {
        let copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>Has {votes[selected]} votes</p>
            <p>
                <button onClick={() => Vote(selected)}>Vote</button>
                <button onClick={() => setSelected(nextAnecdote)}> Next anecdote </button>
            </p>
            <h1>Anecdote with most votes</h1>
            <MostVoted anecdotes={props.anecdotes} votes={votes}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));