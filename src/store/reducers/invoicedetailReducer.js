import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingInvoicedetail: false,
    invoicedetails: []
}

const invoicedetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INVOICEDETAIL_START:
            // let copyState = { ...state }
            state.isLoadingInvoicedetail = true
            return {
                ...state,
            }
        case actionTypes.FETCH_INVOICEDETAIL_SUCCESS:
            let copyState = { ...state }
            copyState.invoicedetails = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_INVOICEDETAIL_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.invoicedetails = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default invoicedetailReducer;