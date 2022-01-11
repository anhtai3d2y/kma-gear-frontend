import axios from "../axios";

const payWithPaypal = () => {
    return axios.post(`/api/paypal`)
}

export { payWithPaypal }
