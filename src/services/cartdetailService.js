import axios from "../axios";

const getAllCartdetailsService = (inputId) => {

    return axios.get(`/api/get-all-cartdetails?id=${inputId}`)
}

const createNewCartdetailService = (data) => {
    return axios.post('/api/create-new-cartdetail', data)
}

const deleteCartdetailService = (cartdetailId) => {
    return axios.delete('/api/delete-cartdetail', {
        data: {
            id: cartdetailId
        }
    })
}

const clearCartdetailService = (CartId) => {
    return axios.delete('/api/clear-cartdetail', {
        data: {
            id: CartId
        }
    })
}

const editCartdetailService = (inputData) => {
    return axios.put('/api/edit-cartdetail', inputData)
}

export { getAllCartdetailsService, createNewCartdetailService, deleteCartdetailService, clearCartdetailService, editCartdetailService }
