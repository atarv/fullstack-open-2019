import axios from 'axios'
const baseUrl = '/api/blogs'
let userToken = null

const setToken = token => {
    userToken = `bearer ${token}`
}

const unsetToken = () => {
    userToken = null
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createBlog = async (blog, username) => {
    const config = {
        headers: { Authorization: userToken }
    }
    blog.username = username
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const updateBlog = async blog => {
    const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
    return request
}

const deleteBlog = async blog => {
    const config = {
        headers: { Authorization: userToken }
    }
    const request = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return request
}

export default { setToken, unsetToken, getAll, createBlog, updateBlog, deleteBlog }
