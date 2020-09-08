let util = {};

import { Toast } from 'vant';

util.tip = (msg) => {
    Toast({        
        message: msg,        
        duration: 1000,        
        forbidClick: true    
    });
};

export default util;