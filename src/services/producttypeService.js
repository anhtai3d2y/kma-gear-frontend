import axios from "../axios";

const getAllProducttypesService = (inputId) => {

    return axios.get(`/api/get-all-producttypes?id=${inputId}`)
}

const getAllProducttypesDeletedService = (inputId) => {

    return axios.get(`/api/get-all-producttypes-deleted?id=${inputId}`)
}

const createNewProducttypeService = (data) => {
    return axios.post('/api/create-new-producttype', data)
}

const editProducttypeService = (inputData) => {
    return axios.put('/api/edit-producttype', inputData)
}

const deleteProducttypeService = (producttypeId) => {
    return axios.delete('/api/delete-producttype', {
        data: {
            id: producttypeId
        }
    })
}

const recoverProducttypeService = (producttypeId) => {
    return axios.delete('/api/recover-producttype', {
        data: {
            id: producttypeId
        }
    })
}


export {
    getAllProducttypesService,
    getAllProducttypesDeletedService,
    createNewProducttypeService,
    editProducttypeService,
    deleteProducttypeService,
    recoverProducttypeService,
}
