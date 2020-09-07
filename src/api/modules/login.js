/**
 * login模块接口列表
 */

import base from '../base'
import axios from '@/utils/http';
import qs from 'qs';

const login = {    
    login (params) {        
        return axios.post(`${base}/login`, qs.stringify(params));
    }
}

export default login;