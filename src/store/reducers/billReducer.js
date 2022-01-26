import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingBill: false,
    bills: [],
    billsDeleted: [],
    bill: ''
}

const billReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case actionTypes.FETCH_BILL_START:
            // let copyState = { ...state }
            state.isLoadingBill = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BILL_SUCCESS:
            copyState = { ...state }
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
        case actionTypes.FETCH_BILL_DELETED_START:
            // let copyState = { ...state }
            state.isLoadingBill = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BILL_DELETED_SUCCESS:
            copyState = { ...state }
            copyState.billsDeleted = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_BILL_DELETED_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.billsDeleted = []
            return {
                ...state,
            }
        case actionTypes.CREATE_BILL_SUCCESS:
            copyState = { ...state }
            copyState.bill = action.data
            return {
                ...copyState,
            }
        case actionTypes.CREATE_BILL_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.bill = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default billReducer;