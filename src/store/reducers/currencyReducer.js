import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingCurrency: false,
    currencyVNDToUSD: 0,
}

const bannerReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {

        case actionTypes.FETCH_CURRENCY_START:
            // let copyState = { ...state }
            state.isLoadingCurrency = true
            return {
                ...state,
            }
        case actionTypes.FETCH_CURRENCY_SUCCESS:
            copyState = { ...state }
            copyState.currencyVNDToUSD = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_CURRENCY_FAILED:
            state.isLoadingCurrency = false
            console.log('fetch failed', action)
            state.currencyVNDToUSD = ''
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default bannerReducer;