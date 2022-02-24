import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingInvoicedetail: false,
    invoicedetails: [],
    invoicedetailsByBill: [],
}

const invoicedetailReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case actionTypes.FETCH_INVOICEDETAIL_START:
            // let copyState = { ...state }
            state.isLoadingInvoicedetail = true
            return {
                ...state,
            }
        case actionTypes.FETCH_INVOICEDETAIL_SUCCESS:
            copyState = { ...state }
            copyState.invoicedetails = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_INVOICEDETAIL_FAILED:
            //  state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.invoicedetails = []
            return {
                ...state,
            }
        case actionTypes.FETCH_INVOICEDETAIL_BY_BILL_START:
            //  copyState = { ...state }
            state.isLoadingInvoicedetail = true
            return {
                ...state,
            }
        case actionTypes.FETCH_INVOICEDETAIL_BY_BILL_SUCCESS:
            copyState = { ...state }
            copyState.invoicedetailsByBill = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_INVOICEDETAIL_BY_BILL_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.invoicedetailsByBill = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default invoicedetailReducer;