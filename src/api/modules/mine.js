/**
 * 用户模块接口列表
 */

import axios from '@/libs/http';
import qs from "qs"; // 导入http中创建的axios实例

const mine = {
    // ==============用户信息==============
    // 获取用户信息
    getUserInfo () {
        return axios.get(`/api/user/info`)
    },
    // 更新用户信息
    updateUserInfo (params) {
        return axios.post(`/api/user/update`, params)
    },
    // 更新密码
    changePassword (params) {
        return axios.post(`/api/user/changePassword`, qs.stringify(params))
    },


    // ==============地址管理==============
    // 获取用户地址列表
    getAddressList (params) {
        return axios.get(`/api/user/address/page`, {
            params: params
        })
    },
    // 获取地址详情
    getAddressObj (addressId) {
        return axios.get(`/api/user/address/${addressId}`)
    },
    // 新增地址
    addressAdd (params) {
        return axios.post(`/api/user/address/add`, params)
    },
    // 编辑地址
    addressEdit (params) {
        return axios.post(`/api/user/address/update`, params)
    },
    // 删除地址
    addressDelete (addressId) {
        return axios.get(`/api/user/address/delete/${addressId}`)
    },


    // ==============收藏管理==============
    // 获取用户收藏商品列表
    getFavoriteList (params) {
        return axios.get(`/api/user/favorite/page`, {
            params: params
        })
    },
    // 新增收藏
    favoriteAdd (productId) {
        return axios.get(`/api/user/favorite/favorite/${productId}`)
    },
    // 取消收藏
    favoriteCancel (favoriteId) {
        return axios.get(`/api/user/favorite/unfavorite/${favoriteId}`)
    },

    

}

export default mine;