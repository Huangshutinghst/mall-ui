import crypto from 'crypto';

let Md5Util = {};

Md5Util.getEncryption = function (text) {
    const md5 = crypto.createHash('md5');
    md5.update(text);
    //md5算法
    let md5password = md5.digest('hex');
    return md5password;
};

export default Md5Util;