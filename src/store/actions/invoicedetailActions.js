import actionTypes from './actionTypes';
import {
    getAllInvoicedetailsService,
    getAllInvoicedetailsByBillService,
    createNewInvoicedetailService,
    bulkCreateInvoicedetailService,
    deleteInvoicedetailService,
    editInvoicedetailService
} from "../../services/invoicedetailService";
import { toast } from 'react-toastify';


// export const fetchInvoicedetailStart = () => ({
//     type: actionTypes.FETCH_INVOICEDETAIL_START
// })

export const fetchInvoicedetailStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_INVOICEDETAIL_START
            })

            let res = await getAllInvoicedetailsService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchInvoicedetailSuccess(res.invoicedetails.reverse()))
            } else {
                dispatch(fetchInvoicedetailFailed())
            }
        } catch (error) {
            dispatch(fetchInvoicedetailFailed())
            console.log(error)
            toast.error('Lấy đơn hàng thất bại!')
        }
    }
}

export const fetchInvoicedetailSuccess = (typesData) => ({
    type: actionTypes.FETCH_INVOICEDETAIL_SUCCESS,
    data: typesData
})

export const fetchInvoicedetailFailed = () => ({
    type: actionTypes.FETCH_INVOICEDETAIL_FAILED
})

export const fetchInvoicedetailByBillStart = (id) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_INVOICEDETAIL_BY_BILL_START
            })

            let res = await getAllInvoicedetailsByBillService(id)
            if (res && res.errCode === 0) {
                dispatch(fetchInvoicedetailByBillSuccess(res.invoicedetails.reverse()))
            } else {
                dispatch(fetchInvoicedetailByBillFailed())
            }
        } catch (error) {
            dispatch(fetchInvoicedetailByBillFailed())
            console.log(error)
            toast.error('Lấy đơn hàng thất bại!')
        }
    }
}

export const fetchInvoicedetailByBillSuccess = (typesData) => ({
    type: actionTypes.FETCH_INVOICEDETAIL_BY_BILL_SUCCESS,
    data: typesData
})

export const fetchInvoicedetailByBillFailed = () => ({
    type: actionTypes.FETCH_INVOICEDETAIL_BY_BILL_FAILED
})


export const createNewInvoicedetail = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewInvoicedetailService(data)
            if (res && res.errCode === 0) {
                dispatch(saveInvoicedetailSuccess())
            } else {
                toast.error('Thêm đơn hàng thất bại!')
                dispatch(saveInvoicedetailFailed())
            }
        } catch (error) {
            toast.error('Thêm đơn hàng thất bại!')
            dispatch(saveInvoicedetailFailed())
            console.log(error)
        }
    }
}

export const saveInvoicedetailSuccess = () => ({
    type: actionTypes.CREATE_INVOICEDETAIL_SUCCESS
})
export const saveInvoicedetailFailed = () => ({
    type: actionTypes.CREATE_INVOICEDETAIL_FAILED
})

export const bulkCreateInvoicedetail = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await bulkCreateInvoicedetailService(data)
            if (res && res.errCode === 0) {
                dispatch(bulkInvoicedetailSuccess())
            } else {
                toast.error('Thêm chi tiết đơn hàng thất bại!')
                dispatch(bulkInvoicedetailFailed())
            }
        } catch (error) {
            toast.error('Thêm chi tiết đơn hàng thất bại!')
            dispatch(bulkInvoicedetailFailed())
            console.log(error)
        }
    }
}

export const bulkInvoicedetailSuccess = () => ({
    type: actionTypes.BULK_CREATE_INVOICEDETAIL_SUCCESS
})
export const bulkInvoicedetailFailed = () => ({
    type: actionTypes.BULK_CREATE_INVOICEDETAIL_FAILED
})

export const editInvoicedetail = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editInvoicedetailService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật đơn hàng thành công!')
                dispatch(editInvoicedetailSuccess())
            } else {
                toast.error('Cập nhật đơn hàng thất bại!')
                dispatch(editInvoicedetailFailed())
            }
        } catch (error) {
            toast.error('Cập nhật đơn hàng thất bại!')
            dispatch(editInvoicedetailFailed())
            console.log(error)
        }
    }
}

export const editInvoicedetailSuccess = () => ({
    type: actionTypes.EDIT_INVOICEDETAIL_SUCCESS
})
export const editInvoicedetailFailed = () => ({
    type: actionTypes.EDIT_INVOICEDETAIL_FAILED
})

export const deleteInvoicedetail = (invoicedetailId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteInvoicedetailService(invoicedetailId)
            if (res && res.errCode === 0) {
                dispatch(deleteInvoicedetailSuccess())
                toast('Xóa đơn hàng thành công')
            } else {
                toast.error('Xóa đơn hàng thất bại!')
                dispatch(deleteInvoicedetailFailed())
            }
        } catch (error) {
            toast.error('Xóa đơn hàng thất bại!')
            dispatch(deleteInvoicedetailFailed())
            console.log(error)
        }
    }
}

export const deleteInvoicedetailSuccess = () => ({
    type: actionTypes.DELETE_INVOICEDETAIL_SUCCESS
})
export const deleteInvoicedetailFailed = () => ({
    type: actionTypes.DELETE_INVOICEDETAIL_FAILED
})