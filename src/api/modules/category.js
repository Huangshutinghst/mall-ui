/**
 * category模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const category = {    
    getClassifyList () {        
        return axios.get(`/api/classify/list`);    
    },
    getByClassifyId (classifyId, params) {        
        return axios.get(`/api/product/getByClassifyId/${classifyId}`, {
            params: params
        });    
    },
}

export default category;