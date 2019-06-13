const initialState = null

const notify = message => {
    return {
        type: 'SHOW',
        message
    }
}

const hide = () => {
    return {
        type: 'HIDE'
    }
}

export const setNotification = (message, secondsVisible) => {
    return async dispatch => {
        await dispatch(notify(message))
        await setTimeout(() => {
            dispatch(hide())
        }, secondsVisible * 1000)
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW':
            state = action.message
            return state
        case 'HIDE':
            state = null
            return state
        default:
            return initialState
    }
}

export default reducer
