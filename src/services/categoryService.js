import axios from "../axios";

const getAllCategorysService = (inputId) => {

    return axios.get(`/api/get-all-categorys?id=${inputId}`)
}

const createNewCategoryService = (data) => {
    return axios.post('/api/create-new-category', data)
}

const deleteCategoryService = (categoryId) => {
    return axios.delete('/api/delete-category', {
        data: {
            id: categoryId
        }
    })
}

const editCategoryService = (inputData) => {
    return axios.put('/api/edit-category', inputData)
}

export { getAllCategorysService, createNewCategoryService, deleteCategoryService, editCategoryService }
