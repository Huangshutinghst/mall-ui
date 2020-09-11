/**
 * 商品搜索模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例

const search = {    
    // 商品搜索
    search (params) {        
        return axios.get(`/api/home/search`, {
            params: params
        });    
    },
    // 获取热门搜索词
    getHotKeyword () {        
        return axios.get(`/api/home/getHotKeyword`);    
    },
    // 获取历史搜索词
    getHistoryKeyword () {        
        return axios.get(`/api/user/history/product`);
    },
    // 删除历史搜索词
    deleteByProduct () {        
        return axios.get(`/api/user/history/deleteByProduct`);
    },
}

export default search;