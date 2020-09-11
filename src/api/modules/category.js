/**
 * 分类模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例

const category = { 
    // 获取商品一、二级类别
    getClassifyList () {        
        return axios.get(`/api/classify/list`);    
    },
    // 根据类别获取商品
    getByClassifyId (classifyId, params) {        
        return axios.get(`/api/product/getByClassifyId/${classifyId}`, {
            params: params
        });    
    },
}

export default category;