/**
 * search模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const search = {    
    search (params) {        
        return axios.get(`/api/home/search`, {
            params: params
        });    
    },
    getHotKeyword () {        
        return axios.get(`/api/home/getHotKeyword`);    
    },
    getHistoryKeyword () {        
        return axios.get(`/api/user/history/product`);
    },
    deleteByProduct () {        
        return axios.get(`/api/user/history/deleteByProduct`);
    },
}

export default search;