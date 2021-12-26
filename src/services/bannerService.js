import axios from "../axios";

const getAllBannersService = (inputId) => {
    return axios.get(`/api/get-all-banners?id=${inputId}`)
}

const createNewBannerService = (data) => {
    return axios.post('/api/create-new-banner', data)
}

const deleteBannerService = (bannerId) => {
    return axios.delete('/api/delete-banner', {
        data: {
            id: bannerId
        }
    })
}

const editBannerService = (inputData) => {
    return axios.put('/api/edit-banner', inputData)
}

export { getAllBannersService, createNewBannerService, deleteBannerService, editBannerService }
