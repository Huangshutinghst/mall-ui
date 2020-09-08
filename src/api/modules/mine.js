/**
 * mine模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const mine = {
    // =======地址管理=======
    getAddressList (params) {
        return axios.get(`/api/user/address/page`, {
            params: params
        })
    },
    getAddressObj (addressId) {
        return axios.get(`/api/user/address/${addressId}`)
    },
    addressAdd (params) {
        return axios.post(`/api/user/address/add`, params)
    },
    addressEdit (params) {
        return axios.post(`/api/user/address/update`, params)
    },
    addressDelete (addressId) {
        return axios.get(`/api/user/address/delete/${addressId}`)
    },
    // =======收藏管理=======
    getFavoriteList (params) {
        return axios.get(`/api/user/favorite/page`, {
            params: params
        })
    },
    favoriteAdd (productId) {
        return axios.get(`/api/user/favorite/favorite/${productId}`)
    },
    favoriteCancel (favoriteId) {
        return axios.get(`/api/user/favorite/unfavorite/${favoriteId}`)
    },

}

export default mine;