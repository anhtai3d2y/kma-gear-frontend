import axios from "../axios";

const getAllBillsService = (inputId) => {

    return axios.get(`/api/get-all-bills?id=${inputId}`)
}

const getAllBillsByCustomerService = (inputId) => {

    return axios.get(`/api/get-all-bills-by-customer?id=${inputId}`)
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

const deleteBillService = (BillId) => {
    return axios.delete('/api/delete-bill', {
        data: {
            id: BillId
        }
    })
}

const recoverBillService = (BillId) => {
    return axios.delete('/api/recover-bill', {
        data: {
            id: BillId
        }
    })
}

export {
    getAllBillsService,
    getAllBillsByCustomerService,
    getSearchBillsService,
    getAllBillsDeletedService,
    createNewBillService,
    editBillService,
    deleteBillService,
    recoverBillService,
}
