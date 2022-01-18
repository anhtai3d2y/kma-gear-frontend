import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingCartdetail: false,
    cartdetails: []
}

const cartdetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CARTDETAIL_START:
            // let copyState = { ...state }
            state.isLoadingCartdetail = true
            return {
                ...state,
            }
        case actionTypes.FETCH_CARTDETAIL_SUCCESS:
            let copyState = { ...state }
            copyState.cartdetails = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_CARTDETAIL_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.cartdetails = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default cartdetailReducer;