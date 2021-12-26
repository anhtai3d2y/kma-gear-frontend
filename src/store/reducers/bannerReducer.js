import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingBanner: false,
    banners: []
}

const bannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_BANNER_START:
            // let copyState = { ...state }
            state.isLoadingBanner = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BANNER_SUCCESS:
            let copyState = { ...state }
            copyState.banners = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_BANNER_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.banners = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default bannerReducer;