/**
 * 订单模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例

const order = {
    // 获取订单列表
    getOrderList (params) {        
        return axios.get(`/api/order/page`, {
            params: params
        });
    },
    // 获取订单详情
    getOrderDetail (orderId) {        
        return axios.get(`/api/order/detail/${orderId}`);
    },
    // 订单搜索
    search (params) {        
        return axios.get(`/api/order/search`, {
            params: params
        });
    },
    // 获取历史搜索词
    getHistorySearchText () {        
        return axios.get(`/api/user/history/order`);
    },
    // 删除历史搜索词
    deleteHistorySearchText () {
        return axios.get(`/api/user/history/deleteByOrder`);
    },
    // 评价订单
    comment (params) {
        return axios.post(`/api/order/comment`, params);
    },
    // 支付订单
    payOrder (params) {
        return axios.get(`/api/order/pay/${params.orderId}`, { params: params });
    },
    // 取消订单
    closeOrder (orderId) {
        return axios.get(`/api/order/close/${orderId}`);
    },
}

export default order;