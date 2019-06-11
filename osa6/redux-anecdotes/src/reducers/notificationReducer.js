const initialState = null

export const notify = message => {
    return {
        type: 'SHOW',
        message
    }
}

export const hide = () => {
    return {
        type: 'HIDE'
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.message
        case 'HIDE':
            return null
        default:
            return initialState
    }
}

export default reducer
