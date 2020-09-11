/**
 * 优惠券模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例

const coupon = {
    // 用户的优惠券
    getUserCouponList (params) {        
        return axios.get(`/api/user/coupon/page`, {
            params: params
        });
    },
    // 可领优惠券
    getCouponList (params) {
        return axios.get(`/api/coupon/page`, {
            params: params
        });
    },
    // 领取优惠券
    getCoupon (couponId) {
        return axios.get(`/api/user/coupon/${couponId}`);
    },
    // 根据优惠券id获取商品
    getByCouponId (couponId, params) {
        return axios.get(`/api/product/getByCouponId/${couponId}`, {
            params: params
        });
    }
}

export default coupon;