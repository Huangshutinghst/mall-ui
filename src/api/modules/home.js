/**
 * home模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const home = {    
    search (params) {        
        return axios.post(`/api/home/search`, params);    
    }
    // 其他接口… get请求 ………
    // articleDetail (id, params) {        
    //     return axios.get(`${base.sq}/topic/${id}`, {            
    //         params: params        
    //     });    
    // },
}

export default home;