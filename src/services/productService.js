import axios from "../axios";

const getAllProductsService = (inputId) => {
    return axios.get(`/api/get-all-products?id=${inputId}`)
}

const getAllProductsDeletedService = (inputId) => {
    return axios.get(`/api/get-all-products-deleted?id=${inputId}`)
}

const getTopProductsHomeService = (limit) => {
    return axios.get(`/api/get-top-products-home?limit=${limit}`)
}

const getSearchProducts = (key) => {
    return axios.get(`/api/search-products?key=${key}`)
}

const createNewProductService = (data) => {
    return axios.post('/api/create-new-product', data)
}

const updateAmountProductService = (data) => {
    return axios.post('/api/bulk-update-amount-product', data)
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

const recoverProductService = (productId) => {
    return axios.delete('/api/recover-product', {
        data: {
            id: productId
        }
    })
}


export {
    getAllProductsService,
    getAllProductsDeletedService,
    getTopProductsHomeService,
    getSearchProducts,
    createNewProductService,
    updateAmountProductService,
    deleteProductService,
    recoverProductService,
    editProductService,
}
