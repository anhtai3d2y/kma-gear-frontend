import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingProducts: false,
    products: []
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
        default:
            return state;
    }
}

export default productReducer;