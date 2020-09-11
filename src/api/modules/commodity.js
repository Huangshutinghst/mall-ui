/**
 * 商品模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例

const commodity = {
    // 获取商品详情
    getCommodityDetail (productId) {        
        return axios.get(`/api/product/detail/${productId}`);
    },
    


}

export default commodity;