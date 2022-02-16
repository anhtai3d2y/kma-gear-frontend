import axios from "../axios";

const getAllBrandsService = (inputId) => {
    return axios.get(`/api/get-all-brands?id=${inputId}`)
}

const getSearchBrandsService = (key) => {
    return axios.get(`/api/search-brands?key=${key}`)
}

const getAllBrandsDeletedService = (inputId) => {
    return axios.get(`/api/get-all-brands-deleted?id=${inputId}`)
}

const createNewBrandService = (data) => {
    return axios.post('/api/create-new-brand', data)
}

const editBrandService = (inputData) => {
    return axios.put('/api/edit-brand', inputData)
}

const deleteBrandService = (BrandId) => {
    return axios.delete('/api/delete-brand', {
        data: {
            id: BrandId
        }
    })
}

const recoverBrandService = (BrandId) => {
    return axios.delete('/api/recover-brand', {
        data: {
            id: BrandId
        }
    })
}


export {
    getAllBrandsService,
    getSearchBrandsService,
    getAllBrandsDeletedService,
    createNewBrandService,
    editBrandService,
    deleteBrandService,
    recoverBrandService,
}
