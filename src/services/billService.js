import axios from "../axios";

const getAllBillsService = (inputId) => {

    return axios.get(`/api/get-all-bills?id=${inputId}`)
}

const createNewBillService = (data) => {
    return axios.post('/api/create-new-bill', data)
}

const deleteBillService = (billId) => {
    return axios.delete('/api/delete-bill', {
        data: {
            id: billId
        }
    })
}

const editBillService = (inputData) => {
    return axios.put('/api/edit-bill', inputData)
}

export { getAllBillsService, createNewBillService, deleteBillService, editBillService }
