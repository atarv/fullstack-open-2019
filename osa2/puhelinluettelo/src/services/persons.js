import axios from 'axios'

const baseURL = 'http://localhost:3001'

const getAll = () => {
    const response = axios.get(`${baseURL}/persons`)
    return response.then(response => response.data)
}

const post = newPerson => {
    const response = axios.post(`${baseURL}/persons`, newPerson)
    return response.then(response => response.data)
}

const remove = id => {
    const response = axios.delete(`${baseURL}/persons/${id}`)
    return response.then(response => response.data)
}

const replace = person => {
    const response = axios.put(`${baseURL}/persons/${person.id}`, person)
    return response.then(response => response.data)
}

export default { getAll, post, remove, replace }
