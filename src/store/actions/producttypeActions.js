import actionTypes from './actionTypes';
import { getAllProducttypesService } from "../../services/producttypeService";

// export const fetchProducttypeStart = () => ({
//     type: actionTypes.FETCH_PRODUCTTYPE_START
// })

export const fetchProducttypeStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_PRODUCTTYPE_START
            })

            let res = await getAllProducttypesService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchProducttypeSuccess(res.producttypes))
            } else {
                dispatch(fetchProducttypeFailed())
            }
        } catch (error) {
            dispatch(fetchProducttypeFailed())
            console.log(error)
        }
    }
}

export const fetchProducttypeSuccess = (typesData) => ({
    type: actionTypes.FETCH_PRODUCTTYPE_SUCCESS,
    data: typesData
})

export const fetchProducttypeFailed = () => ({
    type: actionTypes.FETCH_PRODUCTTYPE_FAILED
})
