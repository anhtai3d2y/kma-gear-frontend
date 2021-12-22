import actionTypes from './actionTypes';
import { getAllTypeproductsService } from "../../services/typeproductService";

// export const fetchTypeproductStart = () => ({
//     type: actionTypes.FETCH_TYPEPRODUCT_START
// })

export const fetchTypeproductStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_TYPEPRODUCT_START
            })

            let res = await getAllTypeproductsService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchTypeproductSuccess(res.typeproducts))
            } else {
                dispatch(fetchTypeproductFailed())
            }
        } catch (error) {
            dispatch(fetchTypeproductFailed())
            console.log(error)
        }
    }
}

export const fetchTypeproductSuccess = (typesData) => ({
    type: actionTypes.FETCH_TYPEPRODUCT_SUCCESS,
    data: typesData
})

export const fetchTypeproductFailed = () => ({
    type: actionTypes.FETCH_TYPEPRODUCT_FAILED
})
