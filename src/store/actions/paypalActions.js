import actionTypes from './actionTypes';
import { payWithPaypal } from "../../services/paypalService";
import { toast } from 'react-toastify';


// export const fetchInvoicedetailStart = () => ({
//     type: actionTypes.FETCH_INVOICEDETAIL_START
// })

export const payWithPaypalStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await payWithPaypal(data)
            if (res && res.errCode === 0) {
                dispatch(payWithPaypalSuccess(res))
            } else {
                toast.error('Thanh toán thất bại!')
                dispatch(payWithPaypalFailed())
            }
        } catch (error) {
            toast.error('Thanh toán thất bại!')
            dispatch(payWithPaypalFailed())
            console.log(error)
        }
    }
}

export const payWithPaypalSuccess = (paypalInfo) => ({
    type: actionTypes.PAY_WITH_PAYPAL_SUCCESS,
    paypalInfo: paypalInfo
})
export const payWithPaypalFailed = () => ({
    type: actionTypes.PAY_WITH_PAYPAL_FAILED
})