import actionTypes from './actionTypes';
import { getAllBrandsService } from "../../services/brandService";

// export const fetchBrandStart = () => ({
//     type: actionTypes.FETCH_BRAND_START
// })

export const fetchBrandStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_BRAND_START
            })

            let res = await getAllBrandsService('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchBrandSuccess(res.brands))
            } else {
                dispatch(fetchBrandFailed())
            }
        } catch (error) {
            dispatch(fetchBrandFailed())
            console.log(error)
        }
    }
}

export const fetchBrandSuccess = (brandsData) => ({
    type: actionTypes.FETCH_BRAND_SUCCESS,
    data: brandsData
})

export const fetchBrandFailed = () => ({
    type: actionTypes.FETCH_BRAND_FAILED
})
