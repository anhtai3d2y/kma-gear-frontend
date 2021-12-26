import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingCategory: false,
    categorys: []
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORY_START:
            // let copyState = { ...state }
            state.isLoadingCategory = true
            return {
                ...state,
            }
        case actionTypes.FETCH_CATEGORY_SUCCESS:
            let copyState = { ...state }
            copyState.categorys = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_CATEGORY_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.categorys = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default categoryReducer;