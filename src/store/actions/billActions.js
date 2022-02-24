import actionTypes from './actionTypes';
import {
    getAllBillsService,
    getAllBillsByCustomerService,
    getSearchBillsService,
    getAllBillsDeletedService,
    createNewBillService,
    editBillService,
    deleteBillService,
    recoverBillService,
} from "../../services/billService";
import { toast } from 'react-toastify';


// export const fetchBillStart = () => ({
//     type: actionTypes.FETCH_BILL_START
// })

export const fetchBillStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BILL_START
            })

            let res = await getAllBillsService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchBillSuccess(res.bills.reverse()))
            } else {
                dispatch(fetchBillFailed())
            }
        } catch (error) {
            dispatch(fetchBillFailed())
            console.log(error)
            toast.error('Lấy đơn hàng thất bại!')
        }
    }
}

export const fetchBillSuccess = (typesData) => ({
    type: actionTypes.FETCH_BILL_SUCCESS,
    data: typesData
})

export const fetchBillFailed = () => ({
    type: actionTypes.FETCH_BILL_FAILED
})

export const fetchBillByCustomerStart = (id) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BILL_BY_CUSTOMER_START
            })

            let res = await getAllBillsByCustomerService(id)
            if (res && res.errCode === 0) {
                dispatch(fetchBillByCustomerSuccess(res.bills.reverse()))
            } else {
                dispatch(fetchBillByCustomerFailed())
            }
        } catch (error) {
            dispatch(fetchBillByCustomerFailed())
            console.log(error)
            toast.error('Lấy đơn hàng thất bại!')
        }
    }
}

export const fetchBillByCustomerSuccess = (typesData) => ({
    type: actionTypes.FETCH_BILL_BY_CUSTOMER_SUCCESS,
    data: typesData
})

export const fetchBillByCustomerFailed = () => ({
    type: actionTypes.FETCH_BILL_BY_CUSTOMER_FAILED
})

export const fetchSearchBillStart = (key) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_SEARCH_BILL_START
            })

            let res = await getSearchBillsService(key)
            if (res && res.errCode === 0) {
                dispatch(fetchSearchBillSuccess(res.bills.reverse()))
            } else {
                dispatch(fetchSearchBillFailed())
            }
        } catch (error) {
            dispatch(fetchSearchBillFailed())
            console.log(error)
            toast.error('Lấy đơn hàng thất bại!')
        }
    }
}

export const fetchSearchBillSuccess = (typesData) => ({
    type: actionTypes.FETCH_SEARCH_BILL_SUCCESS,
    data: typesData
})

export const fetchSearchBillFailed = () => ({
    type: actionTypes.FETCH_SEARCH_BILL_FAILED
})

export const fetchBillDeletedStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BILL_DELETED_START
            })

            let res = await getAllBillsDeletedService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchBillDeletedSuccess(res.bills))
            } else {
                dispatch(fetchBillDeletedFailed())
            }
        } catch (error) {
            dispatch(fetchBillDeletedFailed())
            console.log(error)
            toast.error('Lấy đơn hàng thất bại!')
        }
    }
}

export const fetchBillDeletedSuccess = (typesData) => ({
    type: actionTypes.FETCH_BILL_DELETED_SUCCESS,
    data: typesData
})

export const fetchBillDeletedFailed = () => ({
    type: actionTypes.FETCH_BILL_DELETED_FAILED
})


export const createNewBill = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBillService(data)
            if (res && res.errCode === 0) {
                dispatch(saveBillSuccess(res.bill))
            } else {
                toast.error('Thêm đơn hàng thất bại!')
                dispatch(saveBillFailed())
            }
        } catch (error) {
            toast.error('Thêm đơn hàng thất bại!')
            dispatch(saveBillFailed())
            console.log(error)
        }
    }
}

export const saveBillSuccess = (typesData) => ({
    type: actionTypes.CREATE_BILL_SUCCESS,
    data: typesData
})
export const saveBillFailed = () => ({
    type: actionTypes.CREATE_BILL_FAILED
})

export const editBill = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editBillService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật đơn hàng thành công!')
                dispatch(editBillSuccess())
            } else {
                toast.error('Cập nhật đơn hàng thất bại!')
                dispatch(editBillFailed())
            }
        } catch (error) {
            toast.error('Cập nhật đơn hàng thất bại!')
            dispatch(editBillFailed())
            console.log(error)
        }
    }
}

export const editBillSuccess = () => ({
    type: actionTypes.EDIT_BILL_SUCCESS
})
export const editBillFailed = () => ({
    type: actionTypes.EDIT_BILL_FAILED
})

export const deleteBill = (BillId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBillService(BillId)
            if (res && res.errCode === 0) {
                dispatch(deleteBillSuccess())
                toast('Xóa đơn hàng thành công')
            } else {
                toast.error('Xóa đơn hàng thất bại!')
                dispatch(deleteBillFailed())
            }
        } catch (error) {
            toast.error('Xóa đơn hàng thất bại!')
            dispatch(deleteBillFailed())
            console.log(error)
        }
    }
}

export const deleteBillSuccess = () => ({
    type: actionTypes.DELETE_BILL_SUCCESS
})
export const deleteBillFailed = () => ({
    type: actionTypes.DELETE_BILL_FAILED
})

export const recoverBill = (BillId) => {
    return async (dispatch, getState) => {
        try {
            let res = await recoverBillService(BillId)
            if (res && res.errCode === 0) {
                dispatch(recoverBillSuccess())
                toast('Khôi phục đơn hàng thành công')
            } else {
                toast.error('Khôi phục đơn hàng thất bại!')
                dispatch(recoverBillFailed())
            }
        } catch (error) {
            toast.error('Khôi phục đơn hàng thất bại!')
            dispatch(recoverBillFailed())
            console.log(error)
        }
    }
}

export const recoverBillSuccess = () => ({
    type: actionTypes.RECOVER_BILL_SUCCESS
})
export const recoverBillFailed = () => ({
    type: actionTypes.RECOVER_BILL_FAILED
})