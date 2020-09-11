/** 
 * api接口的统一出口
 */
import login from '@/api/modules/login';
import search from '@/api/modules/search';
import home from '@/api/modules/home';
import category from '@/api/modules/category';
import img from '@/api/modules/img';
import mine from '@/api/modules/mine';
import order from '@/api/modules/order';
import coupon from '@/api/modules/coupon';
import shoppingCart from '@/api/modules/shoppingCart';

// 导出接口
export default {    
    login,
    search,
    home,
    category,
    img,
    mine,
    order,
    coupon,
    shoppingCart,
    // ……
}