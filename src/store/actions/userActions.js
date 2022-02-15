import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
    createNewUserService,
    getAllUsers,
    getAllUsersDeletedService,
    getSearchUsers,
    recoverUserService,
} from "../../services/userService";

export const fetchUserDeletedStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_USER_DELETED_START
            })

            let res = await getAllUsersDeletedService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchUserDeletedSuccess(res.users))
            } else {
                dispatch(fetchUserDeletedFailed())
            }
        } catch (error) {
            dispatch(fetchUserDeletedFailed())
            console.log(error)
            toast.error('Lấy danh sách người dùng thất bại!')
        }
    }
}

export const fetchUserDeletedSuccess = (typesData) => ({
    type: actionTypes.FETCH_USER_DELETED_SUCCESS,
    data: typesData
})

export const fetchUserDeletedFailed = () => ({
    type: actionTypes.FETCH_USER_DELETED_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ALL_USER_START
            })
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users))
            } else {
                dispatch(fetchAllUsersFailed())
            }
        } catch (error) {
            dispatch(fetchUserDeletedFailed())
            console.log(error)
            toast.error('Lấy danh sách người dùng thất bại!')
        }
    }
}

export const fetchAllUsersSuccess = (typesData) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: typesData
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const fetchSearchUserStart = (key) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_SEARCH_USER_START
            })
            let res = await getSearchUsers(key)
            if (res && res.errCode === 0) {
                dispatch(fetchSearchUserSuccess(res.users))
            } else {
                dispatch(fetchSearchUserFailed())
            }
        } catch (error) {
            dispatch(fetchSearchUserFailed())
            console.log(error)
            toast.error('Lấy danh sách người dùng thất bại!')
        }
    }
}

export const fetchSearchUserSuccess = (typesData) => ({
    type: actionTypes.FETCH_SEARCH_USER_SUCCESS,
    data: typesData
})

export const fetchSearchUserFailed = () => ({
    type: actionTypes.FETCH_SEARCH_USER_FAILED
})

export const recoverUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await recoverUserService(userId)
            if (res && res.errCode === 0) {
                dispatch(recoverUserSuccess())
                toast('Khôi phục người dùng thành công')
            } else {
                toast.error('Khôi phục người dùng thất bại!')
                dispatch(recoverUserFailed())
            }
        } catch (error) {
            toast.error('Khôi phục người dùng thất bại!')
            dispatch(recoverUserFailed())
            console.log(error)
        }
    }
}

export const recoverUserSuccess = () => ({
    type: actionTypes.RECOVER_USER_SUCCESS
})
export const recoverUserFailed = () => ({
    type: actionTypes.RECOVER_USER_FAILED
})

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo
})

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL
})

export const processUserLogout = () => ({
    type: actionTypes.PROCESS_USER_LOGOUT
})

export const customerLoginSuccess = (customerInfo) => ({
    type: actionTypes.CUSTOMER_LOGIN_SUCCESS,
    customerInfo: customerInfo
})

export const customerLoginFail = () => ({
    type: actionTypes.CUSTOMER_LOGIN_FAIL
})

export const processCustomerLogout = () => ({
    type: actionTypes.PROCESS_CUSTOMER_LOGOUT
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                console.log('response: ', res)
                dispatch(saveUserSuccess(res))
            } else {
                toast.error('Đăng ký thất bại!')
                dispatch(saveUserFailed())
            }
        } catch (error) {
            toast.error('Đăng ký thất bại!')
            dispatch(saveUserFailed())
            console.log(error)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.ADD_USER_FAIL
})
