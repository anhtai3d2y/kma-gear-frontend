import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isCustomerLoggedIn: false,
    customerInfo: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.userInfo
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.PROCESS_USER_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null
            }
        case actionTypes.CUSTOMER_LOGIN_SUCCESS:
            return {
                ...state,
                isCustomerLoggedIn: true,
                customerInfo: action.customerInfo
            }
        case actionTypes.CUSTOMER_LOGIN_FAIL:
            return {
                ...state,
                isCustomerLoggedIn: false,
                customerInfo: null
            }
        case actionTypes.PROCESS_CUSTOMER_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                customerInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;