import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 0,
    network: true,
    shopCheckedList: [],
    shopCheckedAll: false,
}

// 定义所需的 mutations
const mutations = {
    CHANGE_NETWORK(state, val) {
        state.network = val;
    },
    CHANGE_CHECKED(state, val) {
        state.shopCheckedList = val;
    },
    CHANGE_CHECKED_ALL(state, val) {
        state.shopCheckedAll = val;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})