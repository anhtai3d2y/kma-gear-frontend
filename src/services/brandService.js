import axios from "../axios";

const getAllBrandsService = (inputId) => {
    return axios.get(`/api/get-all-brands?id=${inputId}`)
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

const deleteBrandService = (brandId) => {
    return axios.delete('/api/delete-brand', {
        data: {
            id: brandId
        }
    })
}

const recoverBrandService = (brandId) => {
    return axios.delete('/api/recover-brand', {
        data: {
            id: brandId
        }
    })
}


export {
    getAllBrandsService,
    getAllBrandsDeletedService,
    createNewBrandService,
    editBrandService,
    deleteBrandService,
    recoverBrandService,
}
