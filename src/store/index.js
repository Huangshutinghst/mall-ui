import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import axios from '@/libs/http';

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 0,
    //网络状态
    network: true,
    //购物车勾选商品
    shopCheckedList: [],
    //购物车全选状态
    shopCheckedAll: false,
    //购物车商品数量
    shopCardCound: 0,
    //当前默认地址
    currentAddress: undefined,
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
    },
    CHANGE_CURRENT_ADDRESS(state, val) {
        state.currentAddress = val;
    },
    checkedChange(state, obj){
        let exist = false;
        state.shopCheckedList.forEach(el => {
            if(el.productId == obj.productId){
                exist = true;
                el.cartVo.quantity = obj.count;
            }
        })
        state.shopCheckedList = state.shopCheckedList.filter((el) => {
            return el.cartVo.quantity !== 0;
        })

        if(state.shopCheckedAll){ //全选
            //加入新的商品
            if(obj.type == 1 && !exist){
                state.shopCheckedAll = false;
            }
        }
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})