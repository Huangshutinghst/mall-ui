/**
 * login模块接口列表
 */

import axios from '@/libs/http';
import qs from 'qs';

const login = {    
    login (params) {        
        return axios.post(`/login`, qs.stringify(params));
    },
    register (params) {
        return axios.post(`/api/user/register`, params);
    }
}

export default login;