/**
 * home模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const home = {
    getFirstClassify (params) {        
        return axios.get(`/api/home/getFirstClassify`);    
    },
    getHotProduct (params) {        
        return axios.get(`/api/home/getHotProduct`, {
            params: params
        });    
    },
}

export default home;