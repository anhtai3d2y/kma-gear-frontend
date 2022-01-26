import axios from "../axios";

const getAllBannersService = (inputId) => {
    return axios.get(`/api/get-all-banners?id=${inputId}`)
}

const getAllBannersDeletedService = (inputId) => {
    return axios.get(`/api/get-all-banners-deleted?id=${inputId}`)
}

const getAllMainBannersService = () => {
    return axios.get('/api/get-all-main-banners')
}

const getAllSubBannersService = () => {
    return axios.get('/api/get-all-sub-banners')
}

const createNewBannerService = (data) => {
    return axios.post('/api/create-new-banner', data)
}

const editBannerService = (inputData) => {
    return axios.put('/api/edit-banner', inputData)
}

const deleteBannerService = (bannerId) => {
    return axios.delete('/api/delete-banner', {
        data: {
            id: bannerId
        }
    })
}

const recoverBannerService = (bannerId) => {
    return axios.delete('/api/recover-banner', {
        data: {
            id: bannerId
        }
    })
}


export {
    getAllBannersService,
    getAllBannersDeletedService,
    getAllMainBannersService,
    getAllSubBannersService,
    createNewBannerService,
    editBannerService,
    deleteBannerService,
    recoverBannerService,
}
