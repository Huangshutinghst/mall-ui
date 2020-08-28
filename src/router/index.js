import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['@/views/Login'], resolve)
    },
    {
      path: '/',
      name: 'Layout',
      component: (resolve) => require(['@/views/Layout'], resolve),
      children: [
        // 首页
        {
          path: '/',
          name: 'home',
          component: (resolve) => require(['@/views/home/Index'], resolve),
        },
        // 分类
        {
          path: 'category',
          name: 'category',
          component: (resolve) => require(['@/views/category/Index'], resolve),
        },
        // 购物车
        {
          path: 'shoppingCart',
          name: 'shoppingCart',
          component: (resolve) => require(['@/views/shoppingCart/Index'], resolve),
        },
        //结算页面
        {
          path: 'shoppingCart/settle',
          name: 'settle',
          component: (resolve) => require(['@/views/shoppingCart/Settle'], resolve),
        },
        // 我的
        {
          path: 'mine',
          name: 'mine',
          component: (resolve) => require(['@/views/mine/Index'], resolve),
        },
        // 我的订单
        {
          path: 'myOrder',
          name: 'myOrder',
          component: (resolve) => require(['@/views/mine/MyOrder'], resolve),
        },
        // 订单搜索
        {
          path: 'myOrder/search',
          name: 'orderSearch',
          component: (resolve) => require(['@/views/mine/order/Search'], resolve),
        },
        // 订单详情
        {
          path: 'myOrder/detail',
          name: 'orderDetail',
          component: (resolve) => require(['@/views/mine/order/OrderDetail'], resolve),
        },
        // 我的收藏
        {
          path: 'myFavorites',
          name: 'myFavorites',
          component: (resolve) => require(['@/views/mine/MyFavorites'], resolve),
        },
        // 我的足迹
        {
          path: 'myfootprint',
          name: 'myfootprint',
          component: (resolve) => require(['@/views/mine/Myfootprint'], resolve),
        },
        // 我的地址管理
        {
          path: 'myAddress',
          name: 'myAddress',
          component: (resolve) => require(['@/views/mine/MyAddress'], resolve),
        },
        // 新增地址
        {
          path: 'myAddress/add',
          name: 'addressAdd',
          component: (resolve) => require(['@/views/mine/address/AddressAdd'], resolve),
        },
        // 编辑地址
        {
          path: 'myAddress/edit',
          name: 'addressEdit',
          component: (resolve) => require(['@/views/mine/address/AddressEdit'], resolve),
        }
      ]
    }
    
  ]
})
