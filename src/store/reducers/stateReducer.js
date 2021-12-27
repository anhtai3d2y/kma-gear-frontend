import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingState: false,
    states: []
}

const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_STATE_START:
            // let copyState = { ...state }
            state.isLoadingState = true
            return {
                ...state,
            }
        case actionTypes.FETCH_STATE_SUCCESS:
            let copyState = { ...state }
            copyState.states = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_STATE_FAILED:
            // let state = { ...state }
            state.isLoadingType = false
            console.log('fetch failed', action)
            state.states = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default stateReducer;