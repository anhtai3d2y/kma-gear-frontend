import axios from "../axios";

const getAllProducttypesService = (inputId) => {

    return axios.get(`/api/get-all-producttypes?id=${inputId}`)
}

const createNewProducttypeService = (data) => {
    return axios.post('/api/create-new-producttype', data)
}

const deleteProducttypeService = (producttypeId) => {
    return axios.delete('/api/delete-producttype', {
        data: {
            id: producttypeId
        }
    })
}

const editProducttypeService = (inputData) => {
    return axios.put('/api/edit-producttype', inputData)
}

export { getAllProducttypesService, createNewProducttypeService, deleteProducttypeService, editProducttypeService }
