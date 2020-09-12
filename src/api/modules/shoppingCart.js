/**
 * 购物车模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例

const shoppingCart = {
    // 获取购物车商品
    getCartList (params) {        
        return axios.get(`/api/cart/page`, {
            params: params
        });
    },
    // 添加商品到购物车
    cartAdd (params) {        
        return axios.post(`/api/cart/add`, params);
    },
    // 清空购物车
    cartClear () {        
        return axios.get(`/api/cart/clear`);
    },

}

export default shoppingCart;