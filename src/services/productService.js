import axios from "../axios";

const getAllProductsService = (inputId) => {
    return axios.get(`/api/get-all-products?id=${inputId}`)
}

const getProductsByTypeService = (inputId) => {
    return axios.get(`/api/get-products-by-type?id=${inputId}`)
}

const getProductsByBrandService = (inputId) => {
    return axios.get(`/api/get-products-by-brand?id=${inputId}`)
}

const getAllProductsDeletedService = (inputId) => {
    return axios.get(`/api/get-all-products-deleted?id=${inputId}`)
}

const getTopProductsHomeService = () => {
    return axios.get(`/api/get-top-products-home`)
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

const deleteProductService = (ProductId) => {
    return axios.delete('/api/delete-product', {
        data: {
            id: ProductId
        }
    })
}

const recoverProductService = (ProductId) => {
    return axios.delete('/api/recover-product', {
        data: {
            id: ProductId
        }
    })
}


export {
    getAllProductsService,
    getProductsByTypeService,
    getProductsByBrandService,
    getAllProductsDeletedService,
    getTopProductsHomeService,
    getSearchProducts,
    createNewProductService,
    updateAmountProductService,
    deleteProductService,
    recoverProductService,
    editProductService,
}
