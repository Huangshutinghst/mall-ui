/**
 * order模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const order = {    
    getOrderList (params) {        
        return axios.get(`/api/order/page`, {
            params: params
        });
    },
    getOrderDetail (orderId) {        
        return axios.get(`/api/order/detail/${orderId}`);
    },
    search (params) {        
        return axios.get(`/api/order/search`, {
            params: params
        });
    },
    getHistorySearchText () {        
        return axios.get(`/api/user/history/order`);
    },
    deleteHistorySearchText () {
        return axios.get(`/api/user/history/deleteByOrder`);
    },
}

export default order;