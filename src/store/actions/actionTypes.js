const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //type product
    FETCH_TYPEPRODUCT_START: 'FETCH_TYPEPRODUCT_START',
    FETCH_TYPEPRODUCT_SUCCESS: 'FETCH_TYPEPRODUCT_SUCCESS',
    FETCH_TYPEPRODUCT_FAILED: 'FETCH_TYPEPRODUCT_FAILED',

    //brand
    FETCH_BRAND_START: 'FETCH_BRAND_START',
    FETCH_BRAND_SUCCESS: 'FETCH_BRAND_SUCCESS',
    FETCH_BRAND_FAILED: 'FETCH_BRAND_FAILED'
})

export default actionTypes;