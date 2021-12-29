import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import { createNewUserService } from "../../services/userService";


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
