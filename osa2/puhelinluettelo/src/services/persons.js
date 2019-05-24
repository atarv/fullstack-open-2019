import axios from 'axios'

const baseURL = 'http://localhost:3001'

const getAll = () => {
    const response = axios.get(`${baseURL}/persons`)
    return response.then(response => response.data)
}

const post = newPerson => {
    const response = axios.post(`${baseURL}/persons`, newPerson)
    return response.then(console.log('lähetetty', newPerson))
}

const remove = id => {
    const response = axios.delete(`${baseURL}/persons/${id}`)
    return response
}

export default { getAll, post, remove }
