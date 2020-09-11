/**
 * home模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const home = {
    getTodayActivity () {
        return axios.get(`/api/home/getTodayActivity`)
    },
    getHomeClassify () {        
        return axios.get(`/api/home/getHomeClassify`);    
    },
    getHotProduct (params) {        
        return axios.get(`/api/home/getHotProduct`, {
            params: params
        });    
    },
    getTodayFlash () {
        return axios.get(`/api/home/getTodayFlash`);
    },
    getProductByFlashId (flashId, params) {
        return axios.get(`/api/home/getProductByFlashId/${flashId}`, {
            params: params
        });
    },
}

export default home;