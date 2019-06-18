export const login = user => {
    return {
        type: 'LOGIN',
        user
    }
}

export const logout = () => ({ type: 'LOGOUT' })

const reducer = (state = null, action) => {
    // console.log('loginReducer', state, action)

    switch (action.type) {
    case 'LOGIN':
        return action.user
    case 'LOGOUT':
        return null
    default:
        return state
    }
}

export default reducer
