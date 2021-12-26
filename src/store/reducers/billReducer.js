import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingBill: false,
    bills: []
}

const billReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BILL_START:
            // let copyState = { ...state }
            state.isLoadingBill = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BILL_SUCCESS:
            let copyState = { ...state }
            copyState.bills = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_BILL_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.bills = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default billReducer;