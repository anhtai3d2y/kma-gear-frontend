import actionTypes from './actionTypes';
import { getAllBannersService, createNewBannerService, deleteBannerService, editBannerService } from "../../services/bannerService";
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

export const createNewBanner = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBannerService(data)
            if (res && res.errCode === 0) {
                dispatch(saveBannerSuccess())
            } else {
                toast.error('Thêm nhãn hàng thất bại!')
                dispatch(saveBannerFailed())
            }
        } catch (error) {
            toast.error('Thêm nhãn hàng thất bại!')
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
                toast('Cập nhật nhãn hàng thành công!')
                dispatch(editBannerSuccess())
            } else {
                toast.error('Cập nhật nhãn hàng thất bại!')
                dispatch(editBannerFailed())
            }
        } catch (error) {
            toast.error('Cập nhật nhãn hàng thất bại!')
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
                toast('Xóa nhãn hàng thành công')
            } else {
                toast.error('Xóa nhãn hàng thất bại!')
                dispatch(deleteBannerFailed())
            }
        } catch (error) {
            toast.error('Xóa nhãn hàng thất bại!')
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
