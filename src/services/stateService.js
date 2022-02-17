import axios from "../axios";

const getAllStatesService = (inputId) => {
    return axios.get(`/api/get-all-states?id=${inputId}`)
}

const createNewStateService = (data) => {
    return axios.post('/api/create-new-state', data)
}

const deleteStateService = (StateId) => {
    return axios.delete('/api/delete-state', {
        data: {
            id: StateId
        }
    })
}

const editStateService = (inputData) => {
    return axios.put('/api/edit-state', inputData)
}

export { getAllStatesService, createNewStateService, deleteStateService, editStateService }
