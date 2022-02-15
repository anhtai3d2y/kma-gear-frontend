import axios from "../axios";

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const handleCustomerLogin = (email, password) => {
    return axios.post('/api/customer-login', { email, password })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const getSearchUsers = (key) => {
    return axios.get(`/api/search-users?key=${key}`)
}

const getAllUsersDeletedService = (inputId) => {
    return axios.get(`/api/get-all-users-deleted?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const recoverUserService = (userId) => {
    return axios.delete('/api/recover-user', {
        data: {
            id: userId
        }
    })
}


export {
    handleLogin,
    handleCustomerLogin,
    getAllUsers,
    getSearchUsers,
    getAllUsersDeletedService,
    createNewUserService,
    editUserService,
    deleteUserService,
    recoverUserService,
}
