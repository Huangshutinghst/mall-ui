import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['@/views/login/Login'], resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: (resolve) => require(['@/views/login/Register'], resolve)
    },
    {
      path: '/',
      name: 'Layout',
      component: (resolve) => require(['@/views/layout/Layout'], resolve),
      children: [
        // 首页
        {
          path: '/',
          name: 'home',
          component: (resolve) => require(['@/views/home/Index'], resolve),
          meta: {
            keepAlive: true,
            scrollPos: { x: 0, y: 0 }
          }
        },
        // 活动页
        {
          path: 'active',
          name: 'active',
          component: (resolve) => require(['@/views/home/module/Active'], resolve),
          meta: {
            keepAlive: false,
            scrollPos: { x: 0, y: 0 }
          }
        },
        // 商品搜索
        {
          path: 'search',
          name: 'search',
          component: (resolve) => require(['@/views/commodity/Search'], resolve),
          meta: {
            keepAlive: false,
            scrollPos: { x: 0, y: 0 }
          }
        },
        // 分类
        {
          path: 'category',
          name: 'category',
          component: (resolve) => require(['@/views/category/Index'], resolve),
          meta: {
            keepAlive: true,
          }
        },
        // 不带类别栏的商品列表
        {
          path: 'category/list',
          name: 'categoryList',
          component: (resolve) => require(['@/views/category/List'], resolve),
          meta: {
            keepAlive: true,
            scrollPos: { x: 0, y: 0 }
          }
        },
        // 带类别栏的商品列表
        {
          path: 'category/listAll',
          name: 'categoryListAll',
          component: (resolve) => require(['@/views/category/ListAll'], resolve),
          meta: {
            keepAlive: true,
            scrollPos: { x: 0, y: 0 }
          }
        },
        // 商品详情
        {
          path: 'shoppingCartDetail',
          name: 'shoppingCartDetail',
          component: (resolve) => require(['@/views/commodity/Detail'], resolve),
        },
        // 带footbar的购物车
        {
          path: 'shoppingCart',
          name: 'shoppingCart',
          component: (resolve) => require(['@/views/shoppingCart/Index'], resolve),
          meta: {
            keepAlive: true,
            scrollPos: { x: 0, y: 0 }
          }
        },
        // 不带footbar的购物车
        {
          path: 'shoppingCart/list',
          name: 'shoppingCartList',
          component: (resolve) => require(['@/views/shoppingCart/List'], resolve),
          meta: {
            keepAlive: false,
            scrollPos: { x: 0, y: 0 }
          }
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
          meta: {
            keepAlive: false,
            scrollPos: { x: 0, y: 0 }
          }
        },
        // 订单搜索
        {
          path: 'myOrder/search',
          name: 'orderSearch',
          component: (resolve) => require(['@/views/mine/order/Search'], resolve),
          meta: {
            keepAlive: false,
            scrollPos: { x: 0, y: 0 }
          }
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
          meta: {
            keepAlive: true,
            scrollPos: { x: 0, y: 0 }
          }
        },
        // 评价
        {
          path: 'comment',
          name: 'comment',
          component: (resolve) => require(['@/views/comment/Index'], resolve),
        },
        // 去支付
        {
          path: 'pay',
          name: 'pay',
          component: (resolve) => require(['@/views/pay/Index'], resolve),
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
        },
        // 账号管理
        {
          path: 'setting',
          name: 'setting',
          component: (resolve) => require(['@/views/setting/Index'], resolve),
        },
        // 修改昵称
        {
          path: 'setting/nickName',
          name: 'editNickName',
          component: (resolve) => require(['@/views/setting/EditNickName'], resolve),
        },
        // 修改手机号
        {
          path: 'setting/telephone',
          name: 'editTelephone',
          component: (resolve) => require(['@/views/setting/EditTelephone'], resolve),
        },
        // 修改密码
        {
          path: 'setting/password',
          name: 'editPassword',
          component: (resolve) => require(['@/views/setting/editPassword'], resolve),
        },
        //我的优惠券
        {
          path: 'coupon',
          name: 'coupon',
          component: (resolve) => require(['@/views/coupon/Index'], resolve),
          meta: {
            keepAlive: false,
            scrollPos: { x: 0, y: 0 }
          }
        },
        //领券中心
        {
          path: 'coupon/receive',
          name: 'receive',
          component: (resolve) => require(['@/views/coupon/Receive'], resolve),
        },
        //优惠券可用商品
        {
          path: 'coupon/List',
          name: 'couponList',
          component: (resolve) => require(['@/views/couponlist/Index'], resolve),
          meta: {
            keepAlive: false,
            scrollPos: { x: 0, y: 0 }
          }
        },
      ]
    }
  ]
})
