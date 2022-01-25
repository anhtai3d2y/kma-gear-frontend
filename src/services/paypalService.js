import axios from "../axios";

const payWithPaypal = (data) => {
    return axios.post(`/api/paypal`, data)
}

export { payWithPaypal }
