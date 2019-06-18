export const setUsers = users => {
    return {
        type: 'SET_USERS',
        users
    }
}

const reducer = (state = [], aciton) => {
    switch (aciton.type) {
    case 'SET_USERS':
        return aciton.users
    default:
        return state
    }
}

export default reducer
