import axios from "../axios";

const getAllInvoicedetailsService = (inputId) => {

    return axios.get(`/api/get-all-invoicedetails?id=${inputId}`)
}

const getAllInvoicedetailsByBillService = (inputId) => {

    return axios.get(`/api/get-all-invoicedetails-by-bill?id=${inputId}`)
}

const createNewInvoicedetailService = (data) => {
    return axios.post('/api/create-new-invoicedetail', data)
}

const bulkCreateInvoicedetailService = (data) => {
    return axios.post('/api/bulk-create-invoicedetail', data)
}

const deleteInvoicedetailService = (invoicedetailId) => {
    return axios.delete('/api/delete-invoicedetail', {
        data: {
            id: invoicedetailId
        }
    })
}

const editInvoicedetailService = (inputData) => {
    return axios.put('/api/edit-invoicedetail', inputData)
}

export {
    getAllInvoicedetailsService,
    getAllInvoicedetailsByBillService,
    createNewInvoicedetailService,
    bulkCreateInvoicedetailService,
    deleteInvoicedetailService,
    editInvoicedetailService
}
