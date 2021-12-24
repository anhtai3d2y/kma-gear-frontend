import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingType: false,
    types: []
}

const producttypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTTYPE_START:
            // let copyState = { ...state }
            state.isLoadingType = true
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCTTYPE_SUCCESS:
            let copyState = { ...state }
            copyState.types = action.data

            return {
                ...copyState,
            }
        case actionTypes.FETCH_PRODUCTTYPE_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            state.types = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default producttypeReducer;