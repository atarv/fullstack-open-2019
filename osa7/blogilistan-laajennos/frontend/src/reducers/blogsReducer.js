import blogService from '../services/blogs'

const initialState = []

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export const addBlog = (blog, username) => {
    return async dispatch => {
        let res = await blogService.createBlog(blog, username)
        dispatch({
            type: 'ADD_BLOG',
            data: res
        })
    }
}

export const removeBlog = blog => {
    return async dispatch => {
        await blogService.deleteBlog(blog)
        dispatch({
            type: 'REMOVE_BLOG',
            data: blog
        })
    }
}

export const likeBlog = blog => {
    blog = { ...blog, likes: blog.likes + 1 }
    return async dispatch => {
        await blogService.updateBlog(blog)
        dispatch({
            type: 'LIKE',
            data: blog
        })
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'INIT':
        return action.data
    case 'ADD_BLOG':
        return [...state, action.data]
    case 'REMOVE_BLOG':
        return [...state].filter(blog => blog.id !== action.data.id)
    case 'LIKE':
        return state.map(blog => (blog.id === action.data.id ? action.data : blog))
    default:
        return state
    }
}

export default reducer
