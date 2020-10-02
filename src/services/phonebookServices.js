import axios from 'axios'
const baseUrl = '/api/persons' //Relative URL since backend/frontend on same address

const getAll = () =>{ 
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.getaxios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, remove }