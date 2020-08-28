import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger' // vuex调试工具

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'prodycution' // 开发环境下开启严格模式

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	strict: debug,
	plugins: debug ? [createLogger()] : [] 
})