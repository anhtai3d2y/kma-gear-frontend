import actionTypes from './actionTypes';
import {
    getCurrencyService,
} from "../../services/currencyService";
import { toast } from 'react-toastify';


export const fetchCurrencyStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_CURRENCY_START
            })
            console.log('get currency')
            let res = await getCurrencyService()
            console.log('res: ', res)
            if (res && res.errCode === 0) {
                dispatch(fetchCurrencySuccess(res))
            } else {
                dispatch(fetchCurrencyFailed())
            }
        } catch (error) {
            dispatch(fetchCurrencyFailed())
            console.log(error)
        }
    }
}

export const fetchCurrencySuccess = (bannersData) => ({
    type: actionTypes.FETCH_CURRENCY_SUCCESS,
    data: bannersData
})

export const fetchCurrencyFailed = () => ({
    type: actionTypes.FETCH_CURRENCY_FAILED
})