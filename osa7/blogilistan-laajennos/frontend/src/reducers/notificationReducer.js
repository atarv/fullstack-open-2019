export const clearNotification = () => ({ type: 'CLEAR' })

export const setNotification = (message, seconds = 5) => {
    return dispatch => {
        dispatch({
            type: 'SET',
            message
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, seconds * 1000)
    }
}

const reducer = (state = '', action) => {
    switch (action.type) {
    case 'SET':
        return action.message
    case 'CLEAR':
        return ''
    default:
        return state
    }
}

export default reducer
