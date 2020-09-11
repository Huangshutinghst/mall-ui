/**
 * 主页模块接口列表
 */

import axios from '@/libs/http'; // 导入http中创建的axios实例

const home = {
    // 获取今日活动
    getTodayActivity () {
        return axios.get(`/api/home/getTodayActivity`)
    },
    // 获取首页商品分类
    getHomeClassify () {        
        return axios.get(`/api/home/getHomeClassify`);    
    },
    // 获取热门商品
    getHotProduct (params) {        
        return axios.get(`/api/home/getHotProduct`, {
            params: params
        });    
    },
    // 获取限时抢购时间
    getTodayFlash () {
        return axios.get(`/api/home/getTodayFlash`);
    },
    // 获取限时抢购商品
    getProductByFlashId (flashId, params) {
        return axios.get(`/api/home/getProductByFlashId/${flashId}`, {
            params: params
        });
    },
}

export default home;