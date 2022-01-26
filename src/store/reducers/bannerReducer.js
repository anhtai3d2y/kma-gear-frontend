import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingBanner: false,
    banners: [],
    bannersDeleted: [],
    mainBanners: [],
    subBanners: [],
}

const bannerReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {

        case actionTypes.FETCH_BANNER_START:
            // let copyState = { ...state }
            state.isLoadingBanner = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BANNER_SUCCESS:
            copyState = { ...state }
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

        case actionTypes.FETCH_BANNER_DELETED_START:
            // let copyState = { ...state }
            state.isLoadingBanner = true
            return {
                ...state,
            }
        case actionTypes.FETCH_BANNER_DELETED_SUCCESS:
            copyState = { ...state }
            copyState.bannersDeleted = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_BANNER_DELETED_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.bannersDeleted = []
            return {
                ...state,
            }

        case actionTypes.FETCH_MAIN_BANNER_START:
            // let copyState = { ...state }
            state.isLoadingBanner = true
            return {
                ...state,
            }
        case actionTypes.FETCH_MAIN_BANNER_SUCCESS:
            copyState = { ...state }
            copyState.mainBanners = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_MAIN_BANNER_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.mainBanners = []
            return {
                ...state,
            }

        case actionTypes.FETCH_SUB_BANNER_START:
            // let copyState = { ...state }
            state.isLoadingBanner = true
            return {
                ...state,
            }
        case actionTypes.FETCH_SUB_BANNER_SUCCESS:
            copyState = { ...state }
            copyState.subBanners = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_SUB_BANNER_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.subBanners = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default bannerReducer;