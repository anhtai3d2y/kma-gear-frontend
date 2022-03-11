import actionTypes from './actionTypes';
import {
    getAllProducttypesService,
    getSearchProducttypesService,
    getAllProducttypesDeletedService,
    createNewProducttypeService,
    editProducttypeService,
    deleteProducttypeService,
    recoverProducttypeService,
} from "../../services/producttypeService";
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

export const fetchProducttypeByIdStart = (id) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_PRODUCTTYPE_BY_ID_START
            })

            let res = await getAllProducttypesService(id)
            if (res && res.errCode === 0) {
                dispatch(fetchProducttypeByIdSuccess(res.producttypes))
            } else {
                dispatch(fetchProducttypeByIdFailed())
            }
        } catch (error) {
            dispatch(fetchProducttypeByIdFailed())
            console.log(error)
            toast.error('Lấy loại sản phẩm thất bại!')
        }
    }
}

export const fetchProducttypeByIdSuccess = (typesData) => ({
    type: actionTypes.FETCH_PRODUCTTYPE_BY_ID_SUCCESS,
    data: typesData
})

export const fetchProducttypeByIdFailed = () => ({
    type: actionTypes.FETCH_PRODUCTTYPE_BY_ID_FAILED
})

export const fetchSearchProducttypeStart = (key) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_SEARCH_PRODUCTTYPE_START
            })
            let res = await getSearchProducttypesService(key)
            if (res && res.errCode === 0) {
                dispatch(fetchSearchProducttypeSuccess(res.producttypes))
            } else {
                dispatch(fetchSearchProducttypeFailed())
            }
        } catch (error) {
            dispatch(fetchSearchProducttypeFailed())
            console.log(error)
            toast.error('Lấy loại sản phẩm thất bại!')
        }
    }
}

export const fetchSearchProducttypeSuccess = (typesData) => ({
    type: actionTypes.FETCH_SEARCH_PRODUCTTYPE_SUCCESS,
    data: typesData
})

export const fetchSearchProducttypeFailed = () => ({
    type: actionTypes.FETCH_SEARCH_PRODUCTTYPE_FAILED
})

export const fetchProducttypeDeletedStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_PRODUCTTYPE_DELETED_START
            })

            let res = await getAllProducttypesDeletedService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchProducttypeDeletedSuccess(res.producttypes))
            } else {
                dispatch(fetchProducttypeDeletedFailed())
            }
        } catch (error) {
            dispatch(fetchProducttypeDeletedFailed())
            console.log(error)
            toast.error('Lấy loại sản phẩm thất bại!')
        }
    }
}

export const fetchProducttypeDeletedSuccess = (typesData) => ({
    type: actionTypes.FETCH_PRODUCTTYPE_DELETED_SUCCESS,
    data: typesData
})

export const fetchProducttypeDeletedFailed = () => ({
    type: actionTypes.FETCH_PRODUCTTYPE_DELETED_FAILED
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

export const recoverProducttype = (producttypeId) => {
    return async (dispatch, getState) => {
        try {
            let res = await recoverProducttypeService(producttypeId)
            if (res && res.errCode === 0) {
                dispatch(recoverProducttypeSuccess())
                toast('Khôi phục loại sản phẩm thành công')
            } else {
                toast.error('Khôi phục loại sản phẩm thất bại!')
                dispatch(recoverProducttypeFailed())
            }
        } catch (error) {
            toast.error('Khôi phục loại sản phẩm thất bại!')
            dispatch(recoverProducttypeFailed())
            console.log(error)
        }
    }
}

export const recoverProducttypeSuccess = () => ({
    type: actionTypes.RECOVER_PRODUCTTYPE_SUCCESS
})
export const recoverProducttypeFailed = () => ({
    type: actionTypes.RECOVER_PRODUCTTYPE_FAILED
})