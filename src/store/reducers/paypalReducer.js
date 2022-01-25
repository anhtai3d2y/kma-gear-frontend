import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingPaypalLink: false,
    paypalInfo: ''
}

const paypalReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case actionTypes.PAY_WITH_PAYPAL_SUCCESS:
            copyState = { ...state }
            copyState.paypalInfo = action.paypalInfo
            return {
                ...copyState,
            }
        case actionTypes.PAY_WITH_PAYPAL_FAILED:
            // let state = { ...state }
            state.isLoadingPaypalLink = false
            console.log('fetch failed', action)
            state.products = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default paypalReducer;