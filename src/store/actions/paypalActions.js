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
            console.log('res', res)
            if (res && res.errCode === 0) {
                dispatch(payWithPaypalSuccess())
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

export const payWithPaypalSuccess = () => ({
    type: actionTypes.PAY_WITH_PAYPAL_SUCCESS
})
export const payWithPaypalFailed = () => ({
    type: actionTypes.PAY_WITH_PAYPAL_FAILED
})