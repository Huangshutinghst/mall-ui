let Util = {};

import { Toast } from 'vant';

Util.tip = (msg) => {
    Toast({        
        message: msg,        
        duration: 1000,        
        forbidClick: true    
    });
};

Util.maskPhone = (phone = '') => {
    return phone.substr(0, 3) + phone.slice(3, -4).replace(/\d/g, '*') + phone.substr(-4)
};

export default Util;