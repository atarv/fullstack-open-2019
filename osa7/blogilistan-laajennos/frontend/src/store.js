import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// Tähän reducereiden importtaus
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    loggedUser: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
