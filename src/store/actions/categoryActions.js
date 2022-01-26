import actionTypes from './actionTypes';
import {
    getAllCategorysService,
    getAllCategorysDeletedService,
    createNewCategoryService,
    editCategoryService,
    deleteCategoryService,
    recoverCategoryService,
} from "../../services/categoryService";
import { toast } from 'react-toastify';


// export const fetchCategoryStart = () => ({
//     type: actionTypes.FETCH_CATEGORY_START
// })

export const fetchCategoryStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_CATEGORY_START
            })

            let res = await getAllCategorysService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchCategorySuccess(res.categorys))
            } else {
                dispatch(fetchCategoryFailed())
            }
        } catch (error) {
            dispatch(fetchCategoryFailed())
            console.log(error)
            toast.error('Lấy danh mục thất bại!')
        }
    }
}

export const fetchCategorySuccess = (typesData) => ({
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    data: typesData
})

export const fetchCategoryFailed = () => ({
    type: actionTypes.FETCH_CATEGORY_FAILED
})

export const fetchCategoryDeletedStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_CATEGORY_DELETED_START
            })

            let res = await getAllCategorysDeletedService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchCategoryDeletedSuccess(res.categorys.reverse()))
            } else {
                dispatch(fetchCategoryDeletedFailed())
            }
        } catch (error) {
            dispatch(fetchCategoryDeletedFailed())
            console.log(error)
            toast.error('Lấy danh mục thất bại!')
        }
    }
}

export const fetchCategoryDeletedSuccess = (typesData) => ({
    type: actionTypes.FETCH_CATEGORY_DELETED_SUCCESS,
    data: typesData
})

export const fetchCategoryDeletedFailed = () => ({
    type: actionTypes.FETCH_CATEGORY_DELETED_FAILED
})


export const createNewCategory = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCategoryService(data)
            if (res && res.errCode === 0) {
                dispatch(saveCategorySuccess())
            } else {
                toast.error('Thêm danh mục thất bại!')
                dispatch(saveCategoryFailed())
            }
        } catch (error) {
            toast.error('Thêm danh mục thất bại!')
            dispatch(saveCategoryFailed())
            console.log(error)
        }
    }
}

export const saveCategorySuccess = () => ({
    type: actionTypes.CREATE_CATEGORY_SUCCESS
})
export const saveCategoryFailed = () => ({
    type: actionTypes.CREATE_CATEGORY_FAILED
})

export const editCategory = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCategoryService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật danh mục thành công!')
                dispatch(editCategorySuccess())
            } else {
                toast.error('Cập nhật danh mục thất bại!')
                dispatch(editCategoryFailed())
            }
        } catch (error) {
            toast.error('Cập nhật danh mục thất bại!')
            dispatch(editCategoryFailed())
            console.log(error)
        }
    }
}

export const editCategorySuccess = () => ({
    type: actionTypes.EDIT_CATEGORY_SUCCESS
})
export const editCategoryFailed = () => ({
    type: actionTypes.EDIT_CATEGORY_FAILED
})

export const deleteCategory = (categoryId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCategoryService(categoryId)
            if (res && res.errCode === 0) {
                dispatch(deleteCategorySuccess())
                toast('Xóa danh mục thành công')
            } else {
                toast.error('Xóa danh mục thất bại!')
                dispatch(deleteCategoryFailed())
            }
        } catch (error) {
            toast.error('Xóa danh mục thất bại!')
            dispatch(deleteCategoryFailed())
            console.log(error)
        }
    }
}

export const deleteCategorySuccess = () => ({
    type: actionTypes.DELETE_CATEGORY_SUCCESS
})
export const deleteCategoryFailed = () => ({
    type: actionTypes.DELETE_CATEGORY_FAILED
})

export const recoverCategory = (categoryId) => {
    return async (dispatch, getState) => {
        try {
            let res = await recoverCategoryService(categoryId)
            if (res && res.errCode === 0) {
                dispatch(recoverCategorySuccess())
                toast('Xóa danh mục thành công')
            } else {
                toast.error('Xóa danh mục thất bại!')
                dispatch(recoverCategoryFailed())
            }
        } catch (error) {
            toast.error('Xóa danh mục thất bại!')
            dispatch(recoverCategoryFailed())
            console.log(error)
        }
    }
}

export const recoverCategorySuccess = () => ({
    type: actionTypes.RECOVER_CATEGORY_SUCCESS
})
export const recoverCategoryFailed = () => ({
    type: actionTypes.RECOVER_CATEGORY_FAILED
})