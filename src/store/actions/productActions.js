import actionTypes from './actionTypes';
import {
    createNewProductService,
    getAllProductsDeletedService,
    getAllProductsService,
    updateAmountProductService,
    deleteProductService,
    recoverProductService,
    editProductService,
    getTopProductsHomeService
} from "../../services/productService";
import { toast } from 'react-toastify';


export const fetchAllProductsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductsService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllProductsSuccess(res.products.reverse()))
            } else {
                toast.error('Lấy sản phẩm thất bại!')
                dispatch(fetchAllProductsFailed())
            }
        } catch (error) {
            toast.error('Lấy sản phẩm thất bại!')
            dispatch(fetchAllProductsFailed())
            console.log(error)
        }
    }
}

export const fetchAllProductsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_PRODUCTS_SUCCESS,
    products: data
})
export const fetchAllProductsFailed = () => ({
    type: actionTypes.FETCH_ALL_PRODUCTS_FAILED
})

export const fetchAllProductsDeletedStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductsDeletedService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllProductsDeletedSuccess(res.products))
            } else {
                toast.error('Lấy sản phẩm thất bại!')
                dispatch(fetchAllProductsDeletedFailed())
            }
        } catch (error) {
            toast.error('Lấy sản phẩm thất bại!')
            dispatch(fetchAllProductsDeletedFailed())
            console.log(error)
        }
    }
}

export const fetchAllProductsDeletedSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_PRODUCTS_DELETED_SUCCESS,
    products: data
})
export const fetchAllProductsDeletedFailed = () => ({
    type: actionTypes.FETCH_ALL_PRODUCTS_DELETED_FAILED
})

export const fetchProductsByIdStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllProductsService(id)
            if (res && res.errCode === 0) {
                dispatch(fetchProductsByIdSuccess(res.products))
            } else {
                toast.error('Lấy sản phẩm thất bại!')
                dispatch(fetchProductsByIdFailed())
            }
        } catch (error) {
            toast.error('Lấy sản phẩm thất bại!')
            dispatch(fetchProductsByIdFailed())
            console.log(error)
        }
    }
}

export const fetchProductsByIdSuccess = (data) => ({
    type: actionTypes.FETCH_PRODUCTS_BY_ID_SUCCESS,
    products: data
})
export const fetchProductsByIdFailed = () => ({
    type: actionTypes.FETCH_PRODUCTS_BY_ID_FAILED
})

export const fetchTopProductsHomeStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopProductsHomeService(10)

            if (res && res.errCode === 0) {

                dispatch(fetchTopProductsHomeSuccess(res.products))
            } else {
                toast.error('Lấy sản phẩm thất bại!')
                dispatch(fetchTopProductsHomeFailed())
            }
        } catch (error) {
            toast.error('Lấy sản phẩm thất bại!')
            dispatch(fetchTopProductsHomeFailed())
            console.log(error)
        }
    }
}

export const fetchTopProductsHomeSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_PRODUCTS_HOME_SUCCESS,
    products: data
})
export const fetchTopProductsHomeFailed = () => ({
    type: actionTypes.FETCH_TOP_PRODUCTS_HOME_FAILED
})

export const createNewProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewProductService(data)
            if (res && res.errCode === 0) {
                dispatch(saveProductSuccess())
            } else {
                toast.error('Thêm sản phẩm thất bại!')
                dispatch(saveProductFailed())
            }
        } catch (error) {
            toast.error('Thêm sản phẩm thất bại!')
            dispatch(saveProductFailed())
            console.log(error)
        }
    }
}

export const saveProductSuccess = () => ({
    type: actionTypes.CREATE_PRODUCT_SUCCESS
})
export const saveProductFailed = () => ({
    type: actionTypes.CREATE_PRODUCT_FAILED
})

export const updateAmountProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateAmountProductService(data)
            if (res && res.errCode === 0) {
                dispatch(updateAmountProductSuccess())
            } else {
                toast.error('Cập nhật số lượng sản phẩm thất bại!')
                dispatch(updateAmountProductFailed())
            }
        } catch (error) {
            toast.error('Cập nhật số lượng sản phẩm thất bại!')
            dispatch(updateAmountProductFailed())
            console.log(error)
        }
    }
}

export const updateAmountProductSuccess = () => ({
    type: actionTypes.UPDATE_AMOUNT_PRODUCT_SUCCESS
})
export const updateAmountProductFailed = () => ({
    type: actionTypes.UPDATE_AMOUNT_PRODUCT_FAILED
})

export const editProduct = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editProductService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật sản phẩm thành công!')
                dispatch(editProductSuccess())
            } else {
                toast.error('Cập nhật sản phẩm thất bại!1')
                dispatch(editProductFailed())
            }
        } catch (error) {
            toast.error('Cập nhật sản phẩm thất bại!2')
            dispatch(editProductFailed())
            console.log(error)
        }
    }
}

export const editProductSuccess = () => ({
    type: actionTypes.EDIT_PRODUCT_SUCCESS
})
export const editProductFailed = () => ({
    type: actionTypes.EDIT_PRODUCT_FAILED
})

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteProductService(productId)
            if (res && res.errCode === 0) {
                dispatch(deleteProductSuccess())
                toast('Xóa sản phẩm thành công')
            } else {
                toast.error('Xóa sản phẩm thất bại!')
                dispatch(deleteProductFailed())
            }
        } catch (error) {
            toast.error('Xóa sản phẩm thất bại!')
            dispatch(deleteProductFailed())
            console.log(error)
        }
    }
}

export const deleteProductSuccess = () => ({
    type: actionTypes.DELETE_PRODUCT_SUCCESS
})
export const deleteProductFailed = () => ({
    type: actionTypes.DELETE_PRODUCT_FAILED
})

export const recoverProduct = (productId) => {
    return async (dispatch, getState) => {
        try {
            let res = await recoverProductService(productId)
            if (res && res.errCode === 0) {
                dispatch(recoverProductSuccess())
                toast('Khôi phục sản phẩm thành công')
            } else {
                toast.error('Khôi phục sản phẩm thất bại!')
                dispatch(recoverProductFailed())
            }
        } catch (error) {
            toast.error('Khôi phục sản phẩm thất bại!')
            dispatch(recoverProductFailed())
            console.log(error)
        }
    }
}

export const recoverProductSuccess = () => ({
    type: actionTypes.RECOVER_PRODUCT_SUCCESS
})
export const recoverProductFailed = () => ({
    type: actionTypes.RECOVER_PRODUCT_FAILED
})