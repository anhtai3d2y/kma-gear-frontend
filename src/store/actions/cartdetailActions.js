import actionTypes from './actionTypes';
import {
    getAllCartdetailsService,
    createNewCartdetailService,
    deleteCartdetailService,
    clearCartdetailService,
    editCartdetailService
} from "../../services/cartdetailService";
import { toast } from 'react-toastify';


// export const fetchCartdetailStart = () => ({
//     type: actionTypes.FETCH_CARTDETAIL_START
// })

export const fetchCartdetailStart = (CartId) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_CARTDETAIL_START
            })

            let res = await getAllCartdetailsService(CartId.toString())
            if (res && res.errCode === 0) {
                dispatch(fetchCartdetailSuccess(res.cartdetails))
            } else {
                dispatch(fetchCartdetailFailed())
            }
        } catch (error) {
            dispatch(fetchCartdetailFailed())
            console.log(error)
            toast.error('Lấy sản phẩm trong giỏ hàng thất bại!')
        }
    }
}

export const fetchCartdetailSuccess = (typesData) => ({
    type: actionTypes.FETCH_CARTDETAIL_SUCCESS,
    data: typesData
})

export const fetchCartdetailFailed = () => ({
    type: actionTypes.FETCH_CARTDETAIL_FAILED
})


export const createNewCartdetail = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCartdetailService(data)
            if (res && res.errCode === 0) {
                dispatch(saveCartdetailSuccess())
            } else {
                toast.error('Thêm sản phẩm trong giỏ hàng thất bại!')
                dispatch(saveCartdetailFailed())
            }
        } catch (error) {
            toast.error('Thêm sản phẩm trong giỏ hàng thất bại!')
            dispatch(saveCartdetailFailed())
            console.log(error)
        }
    }
}

export const saveCartdetailSuccess = () => ({
    type: actionTypes.CREATE_CARTDETAIL_SUCCESS
})
export const saveCartdetailFailed = () => ({
    type: actionTypes.CREATE_CARTDETAIL_FAILED
})

export const editCartdetail = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCartdetailService(data)
            if (res && res.errCode === 0) {
                dispatch(editCartdetailSuccess())
            } else {
                dispatch(editCartdetailFailed())
            }
        } catch (error) {
            dispatch(editCartdetailFailed())
            console.log(error)
        }
    }
}

export const editCartdetailSuccess = () => ({
    type: actionTypes.EDIT_CARTDETAIL_SUCCESS
})
export const editCartdetailFailed = () => ({
    type: actionTypes.EDIT_CARTDETAIL_FAILED
})

export const deleteCartdetail = (cartdetailId) => {
    return async (dispatch, getState) => {
        try {
            console.log(cartdetailId)
            let res = await deleteCartdetailService(cartdetailId)
            if (res && res.errCode === 0) {
                dispatch(deleteCartdetailSuccess())
                toast('Xóa sản phẩm trong giỏ hàng thành công')
            } else {
                toast.error('Xóa sản phẩm trong giỏ hàng thất bại!')
                dispatch(deleteCartdetailFailed())
            }
        } catch (error) {
            toast.error('Xóa sản phẩm trong giỏ hàng thất bại!')
            dispatch(deleteCartdetailFailed())
            console.log(error)
        }
    }
}

export const deleteCartdetailSuccess = () => ({
    type: actionTypes.DELETE_CARTDETAIL_SUCCESS
})
export const deleteCartdetailFailed = () => ({
    type: actionTypes.DELETE_CARTDETAIL_FAILED
})

export const clearCartdetail = (CartId) => {
    return async (dispatch, getState) => {
        try {
            let res = await clearCartdetailService(CartId)
            if (res && res.errCode === 0) {
                dispatch(clearCartdetailSuccess())
            } else {
                toast.error('Xóa sản phẩm trong giỏ hàng thất bại!')
                dispatch(clearCartdetailFailed())
            }
        } catch (error) {
            toast.error('Xóa sản phẩm trong giỏ hàng thất bại!')
            dispatch(clearCartdetailFailed())
            console.log(error)
        }
    }
}

export const clearCartdetailSuccess = () => ({
    type: actionTypes.CLEAR_CARTDETAIL_SUCCESS
})
export const clearCartdetailFailed = () => ({
    type: actionTypes.CLEAR_CARTDETAIL_FAILED
})