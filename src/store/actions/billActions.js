import actionTypes from './actionTypes';
import { getAllBillsService, createNewBillService, deleteBillService, editBillService } from "../../services/billService";
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


export const createNewBill = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBillService(data)
            if (res && res.errCode === 0) {
                dispatch(saveBillSuccess())
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

export const saveBillSuccess = () => ({
    type: actionTypes.CREATE_BILL_SUCCESS
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

export const deleteBill = (billId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBillService(billId)
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