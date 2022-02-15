import axios from "../axios";

const getAllBillsService = (inputId) => {

    return axios.get(`/api/get-all-bills?id=${inputId}`)
}

const getSearchBillsService = (key) => {

    return axios.get(`/api/search-bills?key=${key}`)
}

const getAllBillsDeletedService = (inputId) => {

    return axios.get(`/api/get-all-bills-deleted?id=${inputId}`)
}

const createNewBillService = (data) => {
    return axios.post('/api/create-new-bill', data)
}

const editBillService = (inputData) => {
    return axios.put('/api/edit-bill', inputData)
}

const deleteBillService = (billId) => {
    return axios.delete('/api/delete-bill', {
        data: {
            id: billId
        }
    })
}

const recoverBillService = (billId) => {
    return axios.delete('/api/recover-bill', {
        data: {
            id: billId
        }
    })
}

export {
    getAllBillsService,
    getSearchBillsService,
    getAllBillsDeletedService,
    createNewBillService,
    editBillService,
    deleteBillService,
    recoverBillService,
}
