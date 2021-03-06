import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
    // 'If it hurts, do it more often',
    // 'Adding manpower to a late software project makes it later!',
    // 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    // 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    // 'Premature optimization is the root of all evil.',
    // 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT',
            data: anecdotes
        })
    }
}

export const voteAnecdote = anecdote => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, {
            ...anecdote,
            votes: anecdote.votes + 1
        })
        dispatch({
            type: 'VOTE',
            data: updatedAnecdote
        })
    }
}

export const addAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createAnecdote(content)
        dispatch({
            type: 'ADD',
            data: asObject(newAnecdote)
        })
    }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT':
            return action.data
        case 'VOTE':
            return [...state].map(anecdote =>
                anecdote.id !== action.data.id ? anecdote : action.data
            )
        case 'ADD':
            const newAnecdote = action.data.content
            return [...state, newAnecdote]
        default:
            return state
    }
}

export default reducer
