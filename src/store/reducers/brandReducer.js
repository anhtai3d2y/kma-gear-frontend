import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingBrand: false,
    brands: [],
    brandById: [],
    brandsDeleted: [],
}

const brandReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case actionTypes.FETCH_BRAND_START:
            // let copyState = { ...state }
            state.isLoadingBrand = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BRAND_SUCCESS:
            copyState = { ...state }
            copyState.brands = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_BRAND_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.brands = []
            return {
                ...state,
            }
        case actionTypes.FETCH_BRAND_BY_ID_START:
            // let copyState = { ...state }
            state.isLoadingBrand = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BRAND_BY_ID_SUCCESS:
            copyState = { ...state }
            copyState.brandById = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_BRAND_BY_ID_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.brandById = []
            return {
                ...state,
            }
        case actionTypes.FETCH_SEARCH_BRAND_START:
            // let copyState = { ...state }
            state.isLoadingBrand = true
            return {
                ...state,
            }
        case actionTypes.FETCH_SEARCH_BRAND_SUCCESS:
            copyState = { ...state }
            copyState.brands = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_SEARCH_BRAND_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.brands = []
            return {
                ...state,
            }
        case actionTypes.FETCH_BRAND_DELETED_START:
            // let copyState = { ...state }
            state.isLoadingBrand = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BRAND_DELETED_SUCCESS:
            copyState = { ...state }
            copyState.brandsDeleted = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_BRAND_DELETED_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.brandsDeleted = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default brandReducer;