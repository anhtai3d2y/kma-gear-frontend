import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    userInfo: null,
    isCustomerLoggedIn: false,
    customerInfo: null,
    users: [],
    usersDeleted: [],
}

const appReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case actionTypes.FETCH_USER_DELETED_START:
            // let copyState = { ...state }
            state.isLoadingUser = true
            return {
                ...state,
            }
        case actionTypes.FETCH_USER_DELETED_SUCCESS:
            copyState = { ...state }
            copyState.usersDeleted = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_USER_DELETED_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.usersDeleted = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_START:
            // let copyState = { ...state }
            state.isLoadingUser = true
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            copyState = { ...state }
            copyState.users = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.users = []
            return {
                ...state,
            }

        case actionTypes.FETCH_SEARCH_USER_START:
            // let copyState = { ...state }
            state.isLoadingUser = true
            return {
                ...state,
            }
        case actionTypes.FETCH_SEARCH_USER_SUCCESS:
            copyState = { ...state }
            copyState.users = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_SEARCH_USER_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.users = []
            return {
                ...state,
            }
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
                isCustomerLoggedIn: false,
                customerInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;