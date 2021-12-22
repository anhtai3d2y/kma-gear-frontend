import axios from "../axios";

const getAllProductsService = (inputId) => {
    return axios.get(`/api/get-all-products?id=${inputId}`)
}

const createNewProductService = (data) => {
    return axios.post('/api/create-new-product', data)
}

const editProductService = (data) => {
    return axios.put('/api/edit-product', data)
}

const deleteProductService = (productId) => {
    return axios.delete('/api/delete-product', {
        data: {
            id: productId
        }
    })
}


export { getAllProductsService, createNewProductService, deleteProductService, editProductService }
