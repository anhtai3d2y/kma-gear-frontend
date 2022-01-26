import axios from "../axios";

const getAllCategorysService = (inputId) => {

    return axios.get(`/api/get-all-categorys?id=${inputId}`)
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

const deleteCategoryService = (categoryId) => {
    return axios.delete('/api/delete-category', {
        data: {
            id: categoryId
        }
    })
}

const recoverCategoryService = (categoryId) => {
    return axios.delete('/api/recover-category', {
        data: {
            id: categoryId
        }
    })
}


export {
    getAllCategorysService,
    getAllCategorysDeletedService,
    createNewCategoryService,
    editCategoryService,
    deleteCategoryService,
    recoverCategoryService,
}
