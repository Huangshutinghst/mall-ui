// 同步修改state中的变量
import * as types from './mutations-type'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations