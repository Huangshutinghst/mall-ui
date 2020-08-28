// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
//vant
import Vant, {Lazyload} from 'vant'
import 'vant/lib/index.css'
//flexible
import 'lib-flexible/flexible'
//util
import Md5Util from "./libs/md5Util"
import DateUtil from './libs/dateUtil'
import RegExpUtil from './libs/RegExpUtil'
//common-css
import './css/reset.css'
import './css/resetfont.css'
import './css/flex.css'
//componnet-css
import './css/component/_layout.scss'
//全局组件
import VBlank from './components/blank'
 
 
Vue.use(Lazyload);
Vue.use(Vant)
Vue.config.productionTip = false

Vue.prototype.Md5Util = Md5Util;
Vue.prototype.DateUtil = DateUtil;
Vue.prototype.RegExpUtil = RegExpUtil;

Vue.use(VBlank)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
