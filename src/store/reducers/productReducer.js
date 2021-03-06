import actionTypes from '../actions/actionTypes';
import {
    sortByDiscountDESC,
} from '../../utils/SortUtils.js';
const initialState = {
    isLoadingProducts: false,
    products: [],
    productsSearch: [],
    productsDeleted: [],
    productsById: [],
    topProducts: []
}

const productReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
            copyState = { ...state }
            copyState.products = action.products
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ALL_PRODUCTS_FAILED:
            // let state = { ...state }
            state.isLoadingProducts = false
            console.log('fetch failed', action)
            state.products = []
            return {
                ...state,
            }
        case actionTypes.FETCH_SEARCH_PRODUCTS_SUCCESS:
            copyState = { ...state }
            copyState.productsSearch = action.products
            return {
                ...copyState,
            }
        case actionTypes.FETCH_SEARCH_PRODUCTS_FAILED:
            state.isLoadingProducts = false
            state.productsSearch = []
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCTS_BY_TYPE_SUCCESS:
            copyState = { ...state }
            copyState.products = action.products
            return {
                ...copyState,
            }
        case actionTypes.FETCH_PRODUCTS_BY_TYPE_FAILED:
            state.isLoadingProducts = false
            state.products = []
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCTS_BY_BRAND_SUCCESS:
            copyState = { ...state }
            copyState.products = action.products
            return {
                ...copyState,
            }
        case actionTypes.FETCH_PRODUCTS_BY_BRAND_FAILED:
            state.isLoadingProducts = false
            state.products = []
            return {
                ...state,
            }
        case actionTypes.FETCH_SEARCH_PRODUCTS_SHOW_SUCCESS:
            copyState = { ...state }
            copyState.products = copyState.productsSearch
            return {
                ...copyState,
            }
        case actionTypes.FETCH_SEARCH_PRODUCTS_SHOW_FAILED:
            // let state = { ...state }
            state.isLoadingProducts = false
            state.products = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_NEW_PRODUCTS_SHOW_SUCCESS:
            copyState = { ...state }
            copyState.products = copyState.topProducts
            return {
                ...copyState,
            }
        case actionTypes.FETCH_TOP_NEW_PRODUCTS_SHOW_FAILED:
            // let state = { ...state }
            state.isLoadingProducts = false
            state.products = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DISCOUNT_PRODUCTS_SHOW_SUCCESS:
            copyState = { ...state }
            let topDiscountProduct = copyState.topProducts
            topDiscountProduct.sort(sortByDiscountDESC)
            console.log(topDiscountProduct)
            copyState.products = topDiscountProduct
            return {
                ...copyState,
            }
        case actionTypes.FETCH_TOP_DISCOUNT_PRODUCTS_SHOW_FAILED:
            // let state = { ...state }
            state.isLoadingProducts = false
            state.products = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_PRODUCTS_DELETED_SUCCESS:
            copyState = { ...state }
            copyState.productsDeleted = action.products
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ALL_PRODUCTS_DELETED_FAILED:
            // let state = { ...state }
            state.isLoadingProducts = false
            console.log('fetch failed', action)
            state.productsDeleted = []
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCTS_BY_ID_SUCCESS:

            state.productsById = action.products
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCTS_BY_ID_FAILED:
            // let state = { ...state }
            state.isLoadingProducts = false
            console.log('fetch failed', action)
            state.productsById = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_PRODUCTS_HOME_SUCCESS:
            state.topProducts = action.products
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_PRODUCTS_HOME_FAILED:
            // let state = { ...state }
            state.isLoadingProducts = false
            console.log('fetch failed', action)
            state.topProducts = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default productReducer;