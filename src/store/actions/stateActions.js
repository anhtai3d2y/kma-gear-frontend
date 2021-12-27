import actionTypes from './actionTypes';
import { getAllStatesService, createNewStateService, deleteStateService, editStateService } from "../../services/stateService";
import { toast } from 'react-toastify';


// export const fetchStateStart = () => ({
//     type: actionTypes.FETCH_STATE_START
// })

export const fetchStateStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_STATE_START
            })

            let res = await getAllStatesService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchStateSuccess(res.states))
            } else {
                dispatch(fetchStateFailed())
            }
        } catch (error) {
            dispatch(fetchStateFailed())
            console.log(error)
        }
    }
}

export const fetchStateSuccess = (statesData) => ({
    type: actionTypes.FETCH_STATE_SUCCESS,
    data: statesData
})

export const fetchStateFailed = () => ({
    type: actionTypes.FETCH_STATE_FAILED
})

export const createNewState = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewStateService(data)
            if (res && res.errCode === 0) {
                dispatch(saveStateSuccess())
            } else {
                toast.error('Thêm nhãn hàng thất bại!')
                dispatch(saveStateFailed())
            }
        } catch (error) {
            toast.error('Thêm nhãn hàng thất bại!')
            dispatch(saveStateFailed())
            console.log(error)
        }
    }
}

export const saveStateSuccess = () => ({
    type: actionTypes.CREATE_STATE_SUCCESS
})
export const saveStateFailed = () => ({
    type: actionTypes.CREATE_STATE_FAILED
})

export const editState = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editStateService(data)
            if (res && res.errCode === 0) {
                toast('Cập nhật nhãn hàng thành công!')
                dispatch(editStateSuccess())
            } else {
                toast.error('Cập nhật nhãn hàng thất bại!')
                dispatch(editStateFailed())
            }
        } catch (error) {
            toast.error('Cập nhật nhãn hàng thất bại!')
            dispatch(editStateFailed())
            console.log(error)
        }
    }
}

export const editStateSuccess = () => ({
    type: actionTypes.EDIT_STATE_SUCCESS
})
export const editStateFailed = () => ({
    type: actionTypes.EDIT_STATE_FAILED
})

export const deleteState = (stateId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteStateService(stateId)
            if (res && res.errCode === 0) {
                dispatch(deleteStateSuccess())
                toast('Xóa nhãn hàng thành công')
            } else {
                toast.error('Xóa nhãn hàng thất bại!')
                dispatch(deleteStateFailed())
            }
        } catch (error) {
            toast.error('Xóa nhãn hàng thất bại!')
            dispatch(deleteStateFailed())
            console.log(error)
        }
    }
}

export const deleteStateSuccess = () => ({
    type: actionTypes.DELETE_STATE_SUCCESS
})
export const deleteStateFailed = () => ({
    type: actionTypes.DELETE_STATE_FAILED
})
