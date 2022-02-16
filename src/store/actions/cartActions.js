import actionTypes from './actionTypes';
import { getAllCartsService, createNewCartService, deleteCartService, editCartService } from "../../services/cartService";
import { toast } from 'react-toastify';


// export const fetchCartStart = () => ({
//     type: actionTypes.FETCH_CART_START
// })

export const fetchCartStart = (UserId) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_CART_START
            })

            let res = await getAllCartsService(UserId.toString())
            if (res && res.errCode === 0) {
                dispatch(fetchCartSuccess(res.carts))
            } else {
                dispatch(fetchCartFailed())
            }
        } catch (error) {
            dispatch(fetchCartFailed())
            console.log(error)
            toast.error('Lấy giỏ hàng thất bại!')
        }
    }
}

export const fetchCartSuccess = (typesData) => ({
    type: actionTypes.FETCH_CART_SUCCESS,
    data: typesData
})

export const fetchCartFailed = () => ({
    type: actionTypes.FETCH_CART_FAILED
})


export const createNewCart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCartService(data)
            if (res && res.errCode === 0) {
                dispatch(saveCartSuccess())
            } else {
                toast.error('Thêm giỏ hàng thất bại!')
                dispatch(saveCartFailed())
            }
        } catch (error) {
            toast.error('Thêm giỏ hàng thất bại!')
            dispatch(saveCartFailed())
            console.log(error)
        }
    }
}

export const saveCartSuccess = () => ({
    type: actionTypes.CREATE_CART_SUCCESS
})
export const saveCartFailed = () => ({
    type: actionTypes.CREATE_CART_FAILED
})

export const editCart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCartService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật giỏ hàng thành công!')
                dispatch(editCartSuccess())
            } else {
                toast.error('Cập nhật giỏ hàng thất bại!')
                dispatch(editCartFailed())
            }
        } catch (error) {
            toast.error('Cập nhật giỏ hàng thất bại!')
            dispatch(editCartFailed())
            console.log(error)
        }
    }
}

export const editCartSuccess = () => ({
    type: actionTypes.EDIT_CART_SUCCESS
})
export const editCartFailed = () => ({
    type: actionTypes.EDIT_CART_FAILED
})

export const deleteCart = (CartId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCartService(CartId)
            if (res && res.errCode === 0) {
                dispatch(deleteCartSuccess())
            } else {
                toast.error('Xóa giỏ hàng thất bại!')
                dispatch(deleteCartFailed())
            }
        } catch (error) {
            toast.error('Xóa giỏ hàng thất bại!')
            dispatch(deleteCartFailed())
            console.log(error)
        }
    }
}

export const deleteCartSuccess = () => ({
    type: actionTypes.DELETE_CART_SUCCESS
})
export const deleteCartFailed = () => ({
    type: actionTypes.DELETE_CART_FAILED
})