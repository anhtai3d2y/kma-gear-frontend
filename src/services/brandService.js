import axios from "../axios";

const getAllBrandsService = (inputId) => {
    return axios.get(`/api/get-all-brands?id=${inputId}`)
}

const createNewBrandService = (data) => {
    return axios.post('/api/create-new-brand', data)
}

const deleteBrandService = (brandId) => {
    return axios.delete('/api/delete-brand', {
        data: {
            id: brandId
        }
    })
}

const editBrandService = (inputData) => {
    return axios.put('/api/edit-brand', inputData)
}

export { getAllBrandsService, createNewBrandService, deleteBrandService, editBrandService }
