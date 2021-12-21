import axios from "../axios";

const getAllProductsService = (inputId) => {
    return axios.get(`/api/get-all-products?id=${inputId}`)
}

const createNewProductService = (data) => {
    return axios.post('/api/create-new-product', data)
}

const deleteProductService = (productId) => {
    return axios.delete('/api/delete-product', {
        data: {
            id: productId
        }
    })
}

const editProductService = (inputData) => {
    return axios.put('/api/edit-product', inputData)
}

export { getAllProductsService, createNewProductService, deleteProductService, editProductService }
