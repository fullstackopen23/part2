import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const create = newPerson => axios.post(baseUrl, newPerson)
const update = (id, changedPerson) => axios.put(`${baseUrl}/${id}`, changedPerson)
const get = () => axios.get(baseUrl)
const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { create, get, deletePerson, update }
