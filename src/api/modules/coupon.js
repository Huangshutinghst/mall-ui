/**
 * order模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const coupon = {
    // 可领优惠券
    getCouponList (params) {
        return axios.get(`/api/coupon/page`, {
            params: params
        });
    },
    // 用户的优惠券
    getUserCouponList (params) {        
        return axios.get(`/api/user/coupon/page`, {
            params: params
        });
    },
}

export default coupon;