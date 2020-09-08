// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//vant
import Vant, {Lazyload} from 'vant'
import 'vant/lib/index.css'
//flexible
import 'lib-flexible/flexible'
//util
import Md5Util from "./libs/md5Util"
import DateUtil from './libs/dateUtil'
import RegExpUtil from './libs/RegExpUtil'
import Util from './libs/util'
//common-css
import './css/reset.css'
import './css/resetfont.css'
import './css/flex.css'
//componnet-css
import './css/component/_layout.scss'
//全局组件
import VBlank from './components/blank'
//导入api入口
import api from './api'

 
Vue.use(Lazyload);
Vue.use(Vant)
Vue.config.productionTip = false

//挂载到vue的原型上
Vue.prototype.Md5Util = Md5Util;
Vue.prototype.DateUtil = DateUtil;
Vue.prototype.RegExpUtil = RegExpUtil;
Vue.prototype.Util = Util;
Vue.prototype.$api = api;

Vue.use(VBlank)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
