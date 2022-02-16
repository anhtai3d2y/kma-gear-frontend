import axios from "../axios";

const getAllCategorysService = (inputId) => {

    return axios.get(`/api/get-all-categorys?id=${inputId}`)
}

const getSearchCategorysService = (key) => {

    return axios.get(`/api/search-categorys?key=${key}`)
}

const getAllCategorysDeletedService = (inputId) => {

    return axios.get(`/api/get-all-categorys-deleted?id=${inputId}`)
}

const createNewCategoryService = (data) => {
    return axios.post('/api/create-new-category', data)
}

const editCategoryService = (inputData) => {
    return axios.put('/api/edit-category', inputData)
}

const deleteCategoryService = (CategoryId) => {
    return axios.delete('/api/delete-category', {
        data: {
            id: CategoryId
        }
    })
}

const recoverCategoryService = (CategoryId) => {
    return axios.delete('/api/recover-category', {
        data: {
            id: CategoryId
        }
    })
}


export {
    getAllCategorysService,
    getSearchCategorysService,
    getAllCategorysDeletedService,
    createNewCategoryService,
    editCategoryService,
    deleteCategoryService,
    recoverCategoryService,
}
