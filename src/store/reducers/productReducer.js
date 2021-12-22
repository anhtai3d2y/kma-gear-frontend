import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingProducts: false,
    products: [],
    topProducts: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_PRODUCTS_SUCCESS:
            let copyState = { ...state }
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