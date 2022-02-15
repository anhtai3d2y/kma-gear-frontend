const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    CHANGE_CUSTOMER_LOGIN: 'CHANGE_CUSTOMER_LOGIN',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    ADD_USER_FAIL: 'ADD_USER_FAIL',

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_USER_LOGOUT: 'PROCESS_USER_LOGOUT',

    CUSTOMER_LOGIN_SUCCESS: 'CUSTOMER_LOGIN_SUCCESS',
    CUSTOMER_LOGIN_FAIL: 'CUSTOMER_LOGIN_FAIL',
    PROCESS_CUSTOMER_LOGOUT: 'PROCESS_CUSTOMER_LOGOUT',

    FETCH_USER_DELETED_START: 'FETCH_USER_DELETED_START',
    FETCH_USER_DELETED_SUCCESS: 'FETCH_USER_DELETED_SUCCESS',
    FETCH_USER_DELETED_FAILED: 'FETCH_USER_DELETED_FAILED',

    FETCH_ALL_USER_START: 'FETCH_ALL_USER_START',
    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    FETCH_SEARCH_USER_START: 'FETCH_SEARCH_USER_START',
    FETCH_SEARCH_USER_SUCCESS: 'FETCH_SEARCH_USER_SUCCESS',
    FETCH_SEARCH_USER_FAILED: 'FETCH_SEARCH_USER_FAILED',

    RECOVER_USER_SUCCESS: 'RECOVER_USER_SUCCESS',
    RECOVER_USER_FAILED: 'RECOVER_USER_FAILED',

    //type product
    FETCH_PRODUCTTYPE_START: 'FETCH_PRODUCTTYPE_START',
    FETCH_PRODUCTTYPE_SUCCESS: 'FETCH_PRODUCTTYPE_SUCCESS',
    FETCH_PRODUCTTYPE_FAILED: 'FETCH_PRODUCTTYPE_FAILED',

    FETCH_SEARCH_PRODUCTTYPE_START: 'FETCH_SEARCH_PRODUCTTYPE_START',
    FETCH_SEARCH_PRODUCTTYPE_SUCCESS: 'FETCH_SEARCH_PRODUCTTYPE_SUCCESS',
    FETCH_SEARCH_PRODUCTTYPE_FAILED: 'FETCH_SEARCH_PRODUCTTYPE_FAILED',

    FETCH_PRODUCTTYPE_DELETED_START: 'FETCH_PRODUCTTYPE_DELETED_START',
    FETCH_PRODUCTTYPE_DELETED_SUCCESS: 'FETCH_PRODUCTTYPE_DELETED_SUCCESS',
    FETCH_PRODUCTTYPE_DELETED_FAILED: 'FETCH_PRODUCTTYPE_DELETED_FAILED',

    CREATE_PRODUCTTYPE_SUCCESS: 'CREATE_PRODUCTTYPE_SUCCESS',
    CREATE_PRODUCTTYPE_FAILED: 'CREATE_PRODUCTTYPE_FAILED',

    EDIT_PRODUCTTYPE_SUCCESS: 'EDIT_PRODUCTTYPE_SUCCESS',
    EDIT_PRODUCTTYPE_FAILED: 'EDIT_PRODUCTTYPE_FAILED',

    DELETE_PRODUCTTYPE_SUCCESS: 'DELETE_PRODUCTTYPE_SUCCESS',
    DELETE_PRODUCTTYPE_FAILED: 'DELETE_PRODUCTTYPE_FAILED',

    RECOVER_PRODUCTTYPE_SUCCESS: 'RECOVER_PRODUCTTYPE_SUCCESS',
    RECOVER_PRODUCTTYPE_FAILED: 'RECOVER_PRODUCTTYPE_FAILED',

    //category
    FETCH_CATEGORY_START: 'FETCH_CATEGORY_START',
    FETCH_CATEGORY_SUCCESS: 'FETCH_CATEGORY_SUCCESS',
    FETCH_CATEGORY_FAILED: 'FETCH_CATEGORY_FAILED',

    FETCH_SEARCH_CATEGORY_START: 'FETCH_SEARCH_CATEGORY_START',
    FETCH_SEARCH_CATEGORY_SUCCESS: 'FETCH_SEARCH_CATEGORY_SUCCESS',
    FETCH_SEARCH_CATEGORY_FAILED: 'FETCH_SEARCH_CATEGORY_FAILED',

    FETCH_CATEGORY_DELETED_START: 'FETCH_CATEGORY_DELETED_START',
    FETCH_CATEGORY_DELETED_SUCCESS: 'FETCH_CATEGORY_DELETED_SUCCESS',
    FETCH_CATEGORY_DELETED_FAILED: 'FETCH_CATEGORY_DELETED_FAILED',

    CREATE_CATEGORY_SUCCESS: 'CREATE_CATEGORY_SUCCESS',
    CREATE_CATEGORY_FAILED: 'CREATE_CATEGORY_FAILED',

    EDIT_CATEGORY_SUCCESS: 'EDIT_CATEGORY_SUCCESS',
    EDIT_CATEGORY_FAILED: 'EDIT_CATEGORY_FAILED',

    DELETE_CATEGORY_SUCCESS: 'DELETE_CATEGORY_SUCCESS',
    DELETE_CATEGORY_FAILED: 'DELETE_CATEGORY_FAILED',

    RECOVER_CATEGORY_SUCCESS: 'RECOVER_CATEGORY_SUCCESS',
    RECOVER_CATEGORY_FAILED: 'RECOVER_CATEGORY_FAILED',

    //cart
    FETCH_CART_START: 'FETCH_CART_START',
    FETCH_CART_SUCCESS: 'FETCH_CART_SUCCESS',
    FETCH_CART_FAILED: 'FETCH_CART_FAILED',

    CREATE_CART_SUCCESS: 'CREATE_CART_SUCCESS',
    CREATE_CART_FAILED: 'CREATE_CART_FAILED',

    EDIT_CART_SUCCESS: 'EDIT_CART_SUCCESS',
    EDIT_CART_FAILED: 'EDIT_CART_FAILED',

    DELETE_CART_SUCCESS: 'DELETE_CART_SUCCESS',
    DELETE_CART_FAILED: 'DELETE_CART_FAILED',

    //cartdetail
    FETCH_CARTDETAIL_START: 'FETCH_CARTDETAIL_START',
    FETCH_CARTDETAIL_SUCCESS: 'FETCH_CARTDETAIL_SUCCESS',
    FETCH_CARTDETAIL_FAILED: 'FETCH_CARTDETAIL_FAILED',

    CREATE_CARTDETAIL_SUCCESS: 'CREATE_CARTDETAIL_SUCCESS',
    CREATE_CARTDETAIL_FAILED: 'CREATE_CARTDETAIL_FAILED',

    EDIT_CARTDETAIL_SUCCESS: 'EDIT_CARTDETAIL_SUCCESS',
    EDIT_CARTDETAIL_FAILED: 'EDIT_CARTDETAIL_FAILED',

    DELETE_CARTDETAIL_SUCCESS: 'DELETE_CARTDETAIL_SUCCESS',
    DELETE_CARTDETAIL_FAILED: 'DELETE_CARTDETAIL_FAILED',

    CLEAR_CARTDETAIL_SUCCESS: 'CLEAR_CARTDETAIL_SUCCESS',
    CLEAR_CARTDETAIL_FAILED: 'CLEAR_CARTDETAIL_FAILED',

    //bill
    FETCH_BILL_START: 'FETCH_BILL_START',
    FETCH_BILL_SUCCESS: 'FETCH_BILL_SUCCESS',
    FETCH_BILL_FAILED: 'FETCH_BILL_FAILED',

    FETCH_BILL_DELETED_START: 'FETCH_BILL_DELETED_START',
    FETCH_BILL_DELETED_SUCCESS: 'FETCH_BILL_DELETED_SUCCESS',
    FETCH_BILL_DELETED_FAILED: 'FETCH_BILL_DELETED_FAILED',

    CREATE_BILL_SUCCESS: 'CREATE_BILL_SUCCESS',
    CREATE_BILL_FAILED: 'CREATE_BILL_FAILED',

    EDIT_BILL_SUCCESS: 'EDIT_BILL_SUCCESS',
    EDIT_BILL_FAILED: 'EDIT_BILL_FAILED',

    DELETE_BILL_SUCCESS: 'DELETE_BILL_SUCCESS',
    DELETE_BILL_FAILED: 'DELETE_BILL_FAILED',

    RECOVER_BILL_SUCCESS: 'RECOVER_BILL_SUCCESS',
    RECOVER_BILL_FAILED: 'RECOVER_BILL_FAILED',

    //invoicedetail
    FETCH_INVOICEDETAIL_START: 'FETCH_INVOICEDETAIL_START',
    FETCH_INVOICEDETAIL_SUCCESS: 'FETCH_INVOICEDETAIL_SUCCESS',
    FETCH_INVOICEDETAIL_FAILED: 'FETCH_INVOICEDETAIL_FAILED',

    CREATE_INVOICEDETAIL_SUCCESS: 'CREATE_INVOICEDETAIL_SUCCESS',
    CREATE_INVOICEDETAIL_FAILED: 'CREATE_INVOICEDETAIL_FAILED',

    BULK_CREATE_INVOICEDETAIL_SUCCESS: 'BULK_CREATE_INVOICEDETAIL_SUCCESS',
    BULK_CREATE_INVOICEDETAIL_FAILED: 'BULK_CREATE_INVOICEDETAIL_FAILED',

    EDIT_INVOICEDETAIL_SUCCESS: 'EDIT_INVOICEDETAIL_SUCCESS',
    EDIT_INVOICEDETAIL_FAILED: 'EDIT_INVOICEDETAIL_FAILED',

    DELETE_INVOICEDETAIL_SUCCESS: 'DELETE_INVOICEDETAIL_SUCCESS',
    DELETE_INVOICEDETAIL_FAILED: 'DELETE_INVOICEDETAIL_FAILED',

    //state
    FETCH_STATE_START: 'FETCH_STATE_START',
    FETCH_STATE_SUCCESS: 'FETCH_STATE_SUCCESS',
    FETCH_STATE_FAILED: 'FETCH_STATE_FAILED',

    CREATE_STATE_SUCCESS: 'CREATE_STATE_SUCCESS',
    CREATE_STATE_FAILED: 'CREATE_STATE_FAILED',

    EDIT_STATE_SUCCESS: 'EDIT_STATE_SUCCESS',
    EDIT_STATE_FAILED: 'EDIT_STATE_FAILED',

    DELETE_STATE_SUCCESS: 'DELETE_STATE_SUCCESS',
    DELETE_STATE_FAILED: 'DELETE_STATE_FAILED',

    //brand
    FETCH_BRAND_START: 'FETCH_BRAND_START',
    FETCH_BRAND_SUCCESS: 'FETCH_BRAND_SUCCESS',
    FETCH_BRAND_FAILED: 'FETCH_BRAND_FAILED',

    FETCH_BRAND_DELETED_START: 'FETCH_BRAND_DELETED_START',
    FETCH_BRAND_DELETED_SUCCESS: 'FETCH_BRAND_DELETED_SUCCESS',
    FETCH_BRAND_DELETED_FAILED: 'FETCH_BRAND_DELETED_FAILED',

    CREATE_BRAND_SUCCESS: 'CREATE_BRAND_SUCCESS',
    CREATE_BRAND_FAILED: 'CREATE_BRAND_FAILED',

    EDIT_BRAND_SUCCESS: 'EDIT_BRAND_SUCCESS',
    EDIT_BRAND_FAILED: 'EDIT_BRAND_FAILED',

    DELETE_BRAND_SUCCESS: 'DELETE_BRAND_SUCCESS',
    DELETE_BRAND_FAILED: 'DELETE_BRAND_FAILED',

    RECOVER_BRAND_SUCCESS: 'RECOVER_BRAND_SUCCESS',
    RECOVER_BRAND_FAILED: 'RECOVER_BRAND_FAILED',

    //banner
    FETCH_BANNER_START: 'FETCH_BANNER_START',
    FETCH_BANNER_SUCCESS: 'FETCH_BANNER_SUCCESS',
    FETCH_BANNER_FAILED: 'FETCH_BANNER_FAILED',

    FETCH_BANNER_DELETED_START: 'FETCH_BANNER_DELETED_START',
    FETCH_BANNER_DELETED_SUCCESS: 'FETCH_BANNER_DELETED_SUCCESS',
    FETCH_BANNER_DELETED_FAILED: 'FETCH_BANNER_DELETED_FAILED',

    FETCH_MAIN_BANNER_START: 'FETCH_MAIN_BANNER_START',
    FETCH_MAIN_BANNER_SUCCESS: 'FETCH_MAIN_BANNER_SUCCESS',
    FETCH_MAIN_BANNER_FAILED: 'FETCH_MAIN_BANNER_FAILED',

    FETCH_SUB_BANNER_START: 'FETCH_SUB_BANNER_START',
    FETCH_SUB_BANNER_SUCCESS: 'FETCH_SUB_BANNER_SUCCESS',
    FETCH_SUB_BANNER_FAILED: 'FETCH_SUB_BANNER_FAILED',

    CREATE_BANNER_SUCCESS: 'CREATE_BANNER_SUCCESS',
    CREATE_BANNER_FAILED: 'CREATE_BANNER_FAILED',

    EDIT_BANNER_SUCCESS: 'EDIT_BANNER_SUCCESS',
    EDIT_BANNER_FAILED: 'EDIT_BANNER_FAILED',

    DELETE_BANNER_SUCCESS: 'DELETE_BANNER_SUCCESS',
    DELETE_BANNER_FAILED: 'DELETE_BANNER_FAILED',

    RECOVER_BANNER_SUCCESS: 'RECOVER_BANNER_SUCCESS',
    RECOVER_BANNER_FAILED: 'RECOVER_BANNER_FAILED',

    //product
    CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
    CREATE_PRODUCT_FAILED: 'CREATE_PRODUCT_FAILED',

    UPDATE_AMOUNT_PRODUCT_SUCCESS: 'UPDATE_AMOUNT_PRODUCT_SUCCESS',
    UPDATE_AMOUNT_PRODUCT_FAILED: 'UPDATE_AMOUNT_PRODUCT_FAILED',

    EDIT_PRODUCT_SUCCESS: 'EDIT_PRODUCT_SUCCESS',
    EDIT_PRODUCT_FAILED: 'EDIT_PRODUCT_FAILED',

    DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAILED: 'DELETE_PRODUCT_FAILED',

    RECOVER_PRODUCT_SUCCESS: 'RECOVER_PRODUCT_SUCCESS',
    RECOVER_PRODUCT_FAILED: 'RECOVER_PRODUCT_FAILED',

    FETCH_ALL_PRODUCTS_SUCCESS: 'FETCH_ALL_PRODUCTS_SUCCESS',
    FETCH_ALL_PRODUCTS_FAILED: 'FETCH_ALL_PRODUCTS_FAILED',

    FETCH_SEARCH_PRODUCTS_SUCCESS: 'FETCH_SEARCH_PRODUCTS_SUCCESS',
    FETCH_SEARCH_PRODUCTS_FAILED: 'FETCH_SEARCH_PRODUCTS_FAILED',

    FETCH_SEARCH_PRODUCTS_SHOW_SUCCESS: 'FETCH_SEARCH_PRODUCTS_SHOW_SUCCESS',
    FETCH_SEARCH_PRODUCTS_SHOW_FAILED: 'FETCH_SEARCH_PRODUCTS_SHOW_FAILED',

    FETCH_ALL_PRODUCTS_DELETED_SUCCESS: 'FETCH_ALL_PRODUCTS_DELETED_SUCCESS',
    FETCH_ALL_PRODUCTS_DELETED_FAILED: 'FETCH_ALL_PRODUCTS_DELETED_FAILED',

    FETCH_PRODUCTS_BY_ID_SUCCESS: 'FETCH_PRODUCTS_BY_ID_SUCCESS',
    FETCH_PRODUCTS_BY_ID_FAILED: 'FETCH_PRODUCTS_BY_ID_FAILED',

    FETCH_TOP_PRODUCTS_HOME_SUCCESS: 'FETCH_TOP_PRODUCTS_HOME_SUCCESS',
    FETCH_TOP_PRODUCTS_HOME_FAILED: 'FETCH_TOP_PRODUCTS_HOME_FAILED',

    //paypal
    PAY_WITH_PAYPAL_SUCCESS: 'PAY_WITH_PAYPAL_SUCCESS',
    PAY_WITH_PAYPAL_FAILED: 'PAY_WITH_PAYPAL_FAILED',

})

export default actionTypes;