import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingCart: false,
    carts: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CART_START:
            // let copyState = { ...state }
            state.isLoadingCart = true
            return {
                ...state,
            }
        case actionTypes.FETCH_CART_SUCCESS:
            let copyState = { ...state }
            copyState.carts = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_CART_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.carts = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default cartReducer;