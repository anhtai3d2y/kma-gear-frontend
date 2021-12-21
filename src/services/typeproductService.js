import axios from "../axios";

const getAllTypeproductsService = (inputId) => {
    return axios.get(`/api/get-all-Typeproducts?id=${inputId}`)
}

const createNewTypeproductService = (data) => {
    return axios.post('/api/create-new-typeproduct', data)
}

const deleteTypeproductService = (typeproductId) => {
    return axios.delete('/api/delete-typeproduct', {
        data: {
            id: typeproductId
        }
    })
}

const editTypeproductService = (inputData) => {
    return axios.put('/api/edit-typeproduct', inputData)
}

export { getAllTypeproductsService, createNewTypeproductService, deleteTypeproductService, editTypeproductService }
