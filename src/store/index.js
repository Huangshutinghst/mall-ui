import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import axios from '@/libs/http';

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 0,
    network: true,
    shopCheckedList: [],
    shopCheckedAll: false,
    shopCardCound: 0,
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
    },
    GET_SHOP_CARD_COUND(state) {
        axios.get('/api/home/getCartAmount').then(function(res){
            state.shopCardCound = res.data.data;
        }).catch(function(err){
            console.log(err);
        });
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})