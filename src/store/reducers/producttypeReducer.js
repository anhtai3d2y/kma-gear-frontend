import { toInteger } from 'lodash';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingType: false,
    types: [],
    typesDeleted: []
}

const producttypeReducer = (state = initialState, action) => {
    let copyState
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTTYPE_START:
            // let copyState = { ...state }
            state.isLoadingType = true
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCTTYPE_SUCCESS:
            copyState = { ...state }
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
        case actionTypes.FETCH_SEARCH_PRODUCTTYPE_START:
            // let copyState = { ...state }
            state.isLoadingType = true
            return {
                ...state,
            }
        case actionTypes.FETCH_SEARCH_PRODUCTTYPE_SUCCESS:
            copyState = { ...state }
            copyState.types = action.data

            return {
                ...copyState,
            }
        case actionTypes.FETCH_SEARCH_PRODUCTTYPE_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            state.types = []
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCTTYPE_DELETED_START:
            // let copyState = { ...state }
            state.isLoadingType = true
            return {
                ...state,
            }
        case actionTypes.FETCH_PRODUCTTYPE_DELETED_SUCCESS:
            copyState = { ...state }
            copyState.typesDeleted = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_PRODUCTTYPE_DELETED_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            state.typesDeleted = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default producttypeReducer;