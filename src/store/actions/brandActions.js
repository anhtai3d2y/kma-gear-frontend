import actionTypes from './actionTypes';
import {
    getAllBrandsService,
    getSearchBrandsService,
    getAllBrandsDeletedService,
    createNewBrandService,
    editBrandService,
    deleteBrandService,
    recoverBrandService,
} from "../../services/brandService";
import { toast } from 'react-toastify';


// export const fetchBrandStart = () => ({
//     type: actionTypes.FETCH_BRAND_START
// })

export const fetchBrandStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BRAND_START
            })

            let res = await getAllBrandsService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchBrandSuccess(res.brands))
            } else {
                dispatch(fetchBrandFailed())
            }
        } catch (error) {
            dispatch(fetchBrandFailed())
            console.log(error)
        }
    }
}

export const fetchBrandSuccess = (brandsData) => ({
    type: actionTypes.FETCH_BRAND_SUCCESS,
    data: brandsData
})

export const fetchBrandFailed = () => ({
    type: actionTypes.FETCH_BRAND_FAILED
})

export const fetchBrandByIdStart = (id) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BRAND_BY_ID_START
            })

            let res = await getAllBrandsService(id)
            if (res && res.errCode === 0) {
                dispatch(fetchBrandByIdSuccess(res.brands))
            } else {
                dispatch(fetchBrandByIdFailed())
            }
        } catch (error) {
            dispatch(fetchBrandByIdFailed())
            console.log(error)
        }
    }
}

export const fetchBrandByIdSuccess = (brandsData) => ({
    type: actionTypes.FETCH_BRAND_BY_ID_SUCCESS,
    data: brandsData
})

export const fetchBrandByIdFailed = () => ({
    type: actionTypes.FETCH_BRAND_BY_ID_FAILED
})

export const fetchSearchBrandStart = (key) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_SEARCH_BRAND_START
            })

            let res = await getSearchBrandsService(key)
            if (res && res.errCode === 0) {
                dispatch(fetchSearchBrandSuccess(res.brands))
            } else {
                dispatch(fetchSearchBrandFailed())
            }
        } catch (error) {
            dispatch(fetchSearchBrandFailed())
            console.log(error)
        }
    }
}

export const fetchSearchBrandSuccess = (brandsData) => ({
    type: actionTypes.FETCH_SEARCH_BRAND_SUCCESS,
    data: brandsData
})

export const fetchSearchBrandFailed = () => ({
    type: actionTypes.FETCH_SEARCH_BRAND_FAILED
})

export const fetchBrandDeletedStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BRAND_DELETED_START
            })

            let res = await getAllBrandsDeletedService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchBrandDeletedSuccess(res.brands))
            } else {
                dispatch(fetchBrandDeletedFailed())
            }
        } catch (error) {
            dispatch(fetchBrandDeletedFailed())
            console.log(error)
        }
    }
}

export const fetchBrandDeletedSuccess = (brandsData) => ({
    type: actionTypes.FETCH_BRAND_DELETED_SUCCESS,
    data: brandsData
})

export const fetchBrandDeletedFailed = () => ({
    type: actionTypes.FETCH_BRAND_DELETED_FAILED
})

export const createNewBrand = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBrandService(data)
            if (res && res.errCode === 0) {
                dispatch(saveBrandSuccess())
            } else {
                toast.error('Thêm nhãn hàng thất bại!')
                dispatch(saveBrandFailed())
            }
        } catch (error) {
            toast.error('Thêm nhãn hàng thất bại!')
            dispatch(saveBrandFailed())
            console.log(error)
        }
    }
}

export const saveBrandSuccess = () => ({
    type: actionTypes.CREATE_BRAND_SUCCESS
})
export const saveBrandFailed = () => ({
    type: actionTypes.CREATE_BRAND_FAILED
})

export const editBrand = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editBrandService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật nhãn hàng thành công!')
                dispatch(editBrandSuccess())
            } else {
                toast.error('Cập nhật nhãn hàng thất bại!')
                dispatch(editBrandFailed())
            }
        } catch (error) {
            toast.error('Cập nhật nhãn hàng thất bại!')
            dispatch(editBrandFailed())
            console.log(error)
        }
    }
}

export const editBrandSuccess = () => ({
    type: actionTypes.EDIT_BRAND_SUCCESS
})
export const editBrandFailed = () => ({
    type: actionTypes.EDIT_BRAND_FAILED
})

export const deleteBrand = (BrandId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBrandService(BrandId)
            if (res && res.errCode === 0) {
                dispatch(deleteBrandSuccess())
                toast('Xóa nhãn hàng thành công')
            } else {
                toast.error('Xóa nhãn hàng thất bại!')
                dispatch(deleteBrandFailed())
            }
        } catch (error) {
            toast.error('Xóa nhãn hàng thất bại!')
            dispatch(deleteBrandFailed())
            console.log(error)
        }
    }
}

export const deleteBrandSuccess = () => ({
    type: actionTypes.DELETE_BRAND_SUCCESS
})
export const deleteBrandFailed = () => ({
    type: actionTypes.DELETE_BRAND_FAILED
})

export const recoverBrand = (BrandId) => {
    return async (dispatch, getState) => {
        try {
            let res = await recoverBrandService(BrandId)
            if (res && res.errCode === 0) {
                dispatch(recoverBrandSuccess())
                toast('Khôi phục nhãn hàng thành công')
            } else {
                toast.error('Khôi phục nhãn hàng thất bại!')
                dispatch(recoverBrandFailed())
            }
        } catch (error) {
            toast.error('Khôi phục nhãn hàng thất bại!')
            dispatch(recoverBrandFailed())
            console.log(error)
        }
    }
}

export const recoverBrandSuccess = () => ({
    type: actionTypes.RECOVER_BRAND_SUCCESS
})
export const recoverBrandFailed = () => ({
    type: actionTypes.RECOVER_BRAND_FAILED
})
