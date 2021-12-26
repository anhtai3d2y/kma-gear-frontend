import actionTypes from './actionTypes';
import { getAllProducttypesService, createNewProducttypeService, deleteProducttypeService, editProducttypeService } from "../../services/producttypeService";
import { toast } from 'react-toastify';


// export const fetchProducttypeStart = () => ({
//     type: actionTypes.FETCH_PRODUCTTYPE_START
// })

export const fetchProducttypeStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_PRODUCTTYPE_START
            })

            let res = await getAllProducttypesService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchProducttypeSuccess(res.producttypes))
            } else {
                dispatch(fetchProducttypeFailed())
            }
        } catch (error) {
            dispatch(fetchProducttypeFailed())
            console.log(error)
            toast.error('Lấy loại sản phẩm thất bại!')
        }
    }
}

export const fetchProducttypeSuccess = (typesData) => ({
    type: actionTypes.FETCH_PRODUCTTYPE_SUCCESS,
    data: typesData
})

export const fetchProducttypeFailed = () => ({
    type: actionTypes.FETCH_PRODUCTTYPE_FAILED
})


export const createNewProducttype = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log('create new type: ', data)
            let res = await createNewProducttypeService(data)
            if (res && res.errCode === 0) {
                dispatch(saveProducttypeSuccess())
            } else {
                toast.error('Thêm loại sản phẩm thất bại!')
                dispatch(saveProducttypeFailed())
            }
        } catch (error) {
            toast.error('Thêm loại sản phẩm thất bại!')
            dispatch(saveProducttypeFailed())
            console.log(error)
        }
    }
}

export const saveProducttypeSuccess = () => ({
    type: actionTypes.CREATE_PRODUCTTYPE_SUCCESS
})
export const saveProducttypeFailed = () => ({
    type: actionTypes.CREATE_PRODUCTTYPE_FAILED
})

export const editProducttype = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editProducttypeService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật loại sản phẩm thành công!')
                dispatch(editProducttypeSuccess())
            } else {
                toast.error('Cập nhật loại sản phẩm thất bại!')
                dispatch(editProducttypeFailed())
            }
        } catch (error) {
            toast.error('Cập nhật loại sản phẩm thất bại!')
            dispatch(editProducttypeFailed())
            console.log(error)
        }
    }
}

export const editProducttypeSuccess = () => ({
    type: actionTypes.EDIT_PRODUCTTYPE_SUCCESS
})
export const editProducttypeFailed = () => ({
    type: actionTypes.EDIT_PRODUCTTYPE_FAILED
})

export const deleteProducttype = (producttypeId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteProducttypeService(producttypeId)
            if (res && res.errCode === 0) {
                dispatch(deleteProducttypeSuccess())
                toast('Xóa loại sản phẩm thành công')
            } else {
                toast.error('Xóa loại sản phẩm thất bại!')
                dispatch(deleteProducttypeFailed())
            }
        } catch (error) {
            toast.error('Xóa loại sản phẩm thất bại!')
            dispatch(deleteProducttypeFailed())
            console.log(error)
        }
    }
}

export const deleteProducttypeSuccess = () => ({
    type: actionTypes.DELETE_PRODUCTTYPE_SUCCESS
})
export const deleteProducttypeFailed = () => ({
    type: actionTypes.DELETE_PRODUCTTYPE_FAILED
})