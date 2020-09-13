/**
 * 购物车模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs';

const shoppingCart = {
    // 获取购物车商品
    getCartList () {        
        return axios.get(`/api/cart/list`);
    },
    // 添加商品到购物车
    cartAdd (params) {        
        return axios.post(`/api/cart/add`, params);
    },
    // 清空购物车
    cartClear () {        
        return axios.get(`/api/cart/clear`);
    },


    // ===========================下单流程===========================
    // 计算价格
    calculate (params) {        
        return axios.post(`/api/order/calculate`, qs.stringify(params));
    },
    // 根据用户优惠券计算价格
    calculateWithCoupon (params) {
        return axios.post(`/api/order/calculateWithCoupon`, params);
    },
    // 取消订单
    closeOrder (orderId) {
        return axios.post(`/api/order/close/${orderId}`);
    },
    // 生成订单
    generateOrder (params) {
        return axios.post(`/api/order/generate`, params);
    },




    

}

export default shoppingCart;