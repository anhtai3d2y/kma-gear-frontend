import axios from "../axios";

const getCurrencyService = () => {
    return axios.get(`http://data.fixer.io/api/latest?access_key=f72e203d0060492aef14ae6921ab81f7&format=1`)
}

export {
    getCurrencyService,
}
