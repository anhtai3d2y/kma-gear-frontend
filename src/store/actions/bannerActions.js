import actionTypes from './actionTypes';
import {
    getAllBannersService,
    getSearchBannersService,
    getAllBannersDeletedService,
    getAllMainBannersService,
    getAllSubBannersService,
    createNewBannerService,
    editBannerService,
    deleteBannerService,
    recoverBannerService,
} from "../../services/bannerService";
import { toast } from 'react-toastify';


// export const fetchBannerStart = () => ({
//     type: actionTypes.FETCH_BANNER_START
// })

export const fetchBannerStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BANNER_START
            })

            let res = await getAllBannersService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchBannerSuccess(res.banners))
            } else {
                dispatch(fetchBannerFailed())
            }
        } catch (error) {
            dispatch(fetchBannerFailed())
            console.log(error)
        }
    }
}

export const fetchBannerSuccess = (bannersData) => ({
    type: actionTypes.FETCH_BANNER_SUCCESS,
    data: bannersData
})

export const fetchBannerFailed = () => ({
    type: actionTypes.FETCH_BANNER_FAILED
})

export const fetchSearchBannerStart = (key) => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_SEARCH_BANNER_START
            })

            let res = await getSearchBannersService(key)
            if (res && res.errCode === 0) {
                dispatch(fetchSearchBannerSuccess(res.banners))
            } else {
                dispatch(fetchSearchBannerFailed())
            }
        } catch (error) {
            dispatch(fetchSearchBannerFailed())
            console.log(error)
        }
    }
}

export const fetchSearchBannerSuccess = (bannersData) => ({
    type: actionTypes.FETCH_SEARCH_BANNER_SUCCESS,
    data: bannersData
})

export const fetchSearchBannerFailed = () => ({
    type: actionTypes.FETCH_SEARCH_BANNER_FAILED
})

export const fetchBannerDeletedStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BANNER_DELETED_START
            })

            let res = await getAllBannersDeletedService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchBannerDeletedSuccess(res.banners))
            } else {
                dispatch(fetchBannerDeletedFailed())
            }
        } catch (error) {
            dispatch(fetchBannerDeletedFailed())
            console.log(error)
        }
    }
}

export const fetchBannerDeletedSuccess = (bannersData) => ({
    type: actionTypes.FETCH_BANNER_DELETED_SUCCESS,
    data: bannersData
})

export const fetchBannerDeletedFailed = () => ({
    type: actionTypes.FETCH_BANNER_DELETED_FAILED
})

export const fetchMainBannerStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_MAIN_BANNER_START
            })

            let res = await getAllMainBannersService()
            if (res && res.errCode === 0) {
                dispatch(fetchMainBannerSuccess(res.banners))
            } else {
                dispatch(fetchMainBannerFailed())
            }
        } catch (error) {
            dispatch(fetchMainBannerFailed())
            console.log(error)
        }
    }
}

export const fetchMainBannerSuccess = (bannersData) => ({
    type: actionTypes.FETCH_MAIN_BANNER_SUCCESS,
    data: bannersData
})

export const fetchMainBannerFailed = () => ({
    type: actionTypes.FETCH_MAIN_BANNER_FAILED
})

export const fetchSubBannerStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_SUB_BANNER_START
            })

            let res = await getAllSubBannersService()
            if (res && res.errCode === 0) {
                dispatch(fetchSubBannerSuccess(res.banners))
            } else {
                dispatch(fetchSubBannerFailed())
            }
        } catch (error) {
            dispatch(fetchSubBannerFailed())
            console.log(error)
        }
    }
}

export const fetchSubBannerSuccess = (bannersData) => ({
    type: actionTypes.FETCH_SUB_BANNER_SUCCESS,
    data: bannersData
})

export const fetchSubBannerFailed = () => ({
    type: actionTypes.FETCH_SUB_BANNER_FAILED
})

export const createNewBanner = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBannerService(data)
            if (res && res.errCode === 0) {
                dispatch(saveBannerSuccess())
            } else {
                toast.error('Thêm biển quảng cáo thất bại!')
                dispatch(saveBannerFailed())
            }
        } catch (error) {
            toast.error('Thêm biển quảng cáo thất bại!')
            dispatch(saveBannerFailed())
            console.log(error)
        }
    }
}

export const saveBannerSuccess = () => ({
    type: actionTypes.CREATE_BANNER_SUCCESS
})
export const saveBannerFailed = () => ({
    type: actionTypes.CREATE_BANNER_FAILED
})

export const editBanner = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editBannerService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật biển quảng cáo thành công!')
                dispatch(editBannerSuccess())
            } else {
                toast.error('Cập nhật biển quảng cáo thất bại!')
                dispatch(editBannerFailed())
            }
        } catch (error) {
            toast.error('Cập nhật biển quảng cáo thất bại!')
            dispatch(editBannerFailed())
            console.log(error)
        }
    }
}

export const editBannerSuccess = () => ({
    type: actionTypes.EDIT_BANNER_SUCCESS
})
export const editBannerFailed = () => ({
    type: actionTypes.EDIT_BANNER_FAILED
})

export const deleteBanner = (bannerId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBannerService(bannerId)
            if (res && res.errCode === 0) {
                dispatch(deleteBannerSuccess())
                toast('Xóa biển quảng cáo thành công')
            } else {
                toast.error('Xóa biển quảng cáo thất bại!')
                dispatch(deleteBannerFailed())
            }
        } catch (error) {
            toast.error('Xóa biển quảng cáo thất bại!')
            dispatch(deleteBannerFailed())
            console.log(error)
        }
    }
}

export const deleteBannerSuccess = () => ({
    type: actionTypes.DELETE_BANNER_SUCCESS
})
export const deleteBannerFailed = () => ({
    type: actionTypes.DELETE_BANNER_FAILED
})

export const recoverBanner = (bannerId) => {
    return async (dispatch, getState) => {
        try {
            let res = await recoverBannerService(bannerId)
            if (res && res.errCode === 0) {
                dispatch(recoverBannerSuccess())
                toast('Khôi phục biển quảng cáo thành công')
            } else {
                toast.error('Khôi phục biển quảng cáo thất bại!')
                dispatch(recoverBannerFailed())
            }
        } catch (error) {
            toast.error('Khôi phục biển quảng cáo thất bại!')
            dispatch(recoverBannerFailed())
            console.log(error)
        }
    }
}

export const recoverBannerSuccess = () => ({
    type: actionTypes.RECOVER_BANNER_SUCCESS
})
export const recoverBannerFailed = () => ({
    type: actionTypes.RECOVER_BANNER_FAILED
})
