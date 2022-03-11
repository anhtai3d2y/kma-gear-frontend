import actionTypes from './actionTypes';
import {
    createNewProductService,
    getAllProductsDeletedService,
    getProductsByTypeService,
    getProductsByBrandService,
    getAllProductsService,
    getTopProductsHomeService,
    getSearchProducts,
    updateAmountProductService,
    deleteProductService,
    recoverProductService,
    editProductService,
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

export const fetchProductsByTypeStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getProductsByTypeService(id)
            if (res && res.errCode === 0) {
                dispatch(fetchProductsByTypeSuccess(res.products.reverse()))
            } else {
                toast.error('Lấy sản phẩm thất bại!')
                dispatch(fetchProductsByTypeFailed())
            }
        } catch (error) {
            toast.error('Lấy sản phẩm thất bại!')
            dispatch(fetchProductsByTypeFailed())
            console.log(error)
        }
    }
}

export const fetchProductsByTypeSuccess = (data) => ({
    type: actionTypes.FETCH_PRODUCTS_BY_TYPE_SUCCESS,
    products: data
})
export const fetchProductsByTypeFailed = () => ({
    type: actionTypes.FETCH_PRODUCTS_BY_TYPE_FAILED
})

export const fetchProductsByBrandStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getProductsByBrandService(id)
            if (res && res.errCode === 0) {
                dispatch(fetchProductsByBrandSuccess(res.products.reverse()))
            } else {
                toast.error('Lấy sản phẩm thất bại!')
                dispatch(fetchProductsByBrandFailed())
            }
        } catch (error) {
            toast.error('Lấy sản phẩm thất bại!')
            dispatch(fetchProductsByBrandFailed())
            console.log(error)
        }
    }
}

export const fetchProductsByBrandSuccess = (data) => ({
    type: actionTypes.FETCH_PRODUCTS_BY_BRAND_SUCCESS,
    products: data
})
export const fetchProductsByBrandFailed = () => ({
    type: actionTypes.FETCH_PRODUCTS_BY_BRAND_FAILED,
})

export const fetchSearchProductsStart = (key) => {
    return async (dispatch, getState) => {
        try {
            let res = await getSearchProducts(key)
            if (res && res.errCode === 0) {
                dispatch(fetchSearchProductsSuccess(res.products.reverse()))
            } else {
                dispatch(fetchSearchProductsFailed())
            }
        } catch (error) {
            dispatch(fetchSearchProductsFailed())
            console.log(error)
        }
    }
}

export const fetchSearchProductsSuccess = (data) => ({
    type: actionTypes.FETCH_SEARCH_PRODUCTS_SUCCESS,
    products: data
})
export const fetchSearchProductsFailed = () => ({
    type: actionTypes.FETCH_SEARCH_PRODUCTS_FAILED
})

export const fetchSearchProductsShowStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchSearchProductsShowSuccess())
        } catch (error) {
            dispatch(fetchSearchProductsShowFailed())
            console.log(error)
        }
    }
}

export const fetchSearchProductsShowSuccess = () => ({
    type: actionTypes.FETCH_SEARCH_PRODUCTS_SHOW_SUCCESS,
})
export const fetchSearchProductsShowFailed = () => ({
    type: actionTypes.FETCH_SEARCH_PRODUCTS_SHOW_FAILED
})

export const fetchOutstandingProductsShowStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchOutstandingProductsShowSuccess())
        } catch (error) {
            dispatch(fetchOutstandingProductsShowFailed())
            console.log(error)
        }
    }
}

export const fetchOutstandingProductsShowSuccess = () => ({
    type: actionTypes.FETCH_TOP_NEW_PRODUCTS_SHOW_SUCCESS,
})
export const fetchOutstandingProductsShowFailed = () => ({
    type: actionTypes.FETCH_TOP_NEW_PRODUCTS_SHOW_FAILED
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
            let res = await getTopProductsHomeService()

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

export const deleteProduct = (ProductId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteProductService(ProductId)
            if (res && res.errCode === 0) {
                dispatch(deleteProductSuccess())
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

export const recoverProduct = (ProductId) => {
    return async (dispatch, getState) => {
        try {
            let res = await recoverProductService(ProductId)
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