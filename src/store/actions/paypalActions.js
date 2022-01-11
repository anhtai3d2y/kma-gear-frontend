import actionTypes from './actionTypes';
import { payWithPaypal } from "../../services/paypalService";
import { toast } from 'react-toastify';


// export const fetchInvoicedetailStart = () => ({
//     type: actionTypes.FETCH_INVOICEDETAIL_START
// })

export const payWithPaypalStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await payWithPaypal()
            if (res && res.errCode === 0) {
                dispatch(payWithPaypalSuccess(res.paypalLink))
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

export const payWithPaypalSuccess = (paypalLink) => ({
    type: actionTypes.PAY_WITH_PAYPAL_SUCCESS,
    paypalLink: paypalLink
})
export const payWithPaypalFailed = () => ({
    type: actionTypes.PAY_WITH_PAYPAL_FAILED
})