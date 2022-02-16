import axios from "../axios";

const getAllCartsService = (inputId) => {
    return axios.get(`/api/get-all-carts?id=${inputId}`)
}

const createNewCartService = (data) => {
    return axios.post('/api/create-new-cart', data)
}

const deleteCartService = (CartId) => {
    return axios.delete('/api/delete-cart', {
        data: {
            id: CartId
        }
    })
}

const editCartService = (inputData) => {
    return axios.put('/api/edit-cart', inputData)
}

export { getAllCartsService, createNewCartService, deleteCartService, editCartService }
