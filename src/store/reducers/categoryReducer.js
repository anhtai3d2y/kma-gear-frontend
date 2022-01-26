import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingCategory: false,
    categorys: [],
    categorysDeleted: []
}

const categoryReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case actionTypes.FETCH_CATEGORY_START:
            // let copyState = { ...state }
            state.isLoadingCategory = true
            return {
                ...state,
            }
        case actionTypes.FETCH_CATEGORY_SUCCESS:
            copyState = { ...state }
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
        case actionTypes.FETCH_CATEGORY_DELETED_START:
            // let copyState = { ...state }
            state.isLoadingCategory = true
            return {
                ...state,
            }
        case actionTypes.FETCH_CATEGORY_DELETED_SUCCESS:
            copyState = { ...state }
            copyState.categorysDeleted = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_CATEGORY_DELETED_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.categorysDeleted = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default categoryReducer;