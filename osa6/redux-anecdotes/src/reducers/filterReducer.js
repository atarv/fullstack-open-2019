const initialState = ''

export const filter = text => {
    return {
        type: 'FILTER',
        text
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.text
        default:
            return state
    }
}

export default reducer
