/** 
 * api接口的统一出口
 */
import login from '@/api/modules/login';
import search from '@/api/modules/search';
import home from '@/api/modules/home';
import category from '@/api/modules/category';
import img from '@/api/modules/img';

// 导出接口
export default {    
    login,
    search,
    home,
    category,
    img,
    // ……
}