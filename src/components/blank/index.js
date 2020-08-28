import VBlankPanel from './VBlankPage.vue'

const VBlank = {
    install:function(Vue){
        Vue.component('VBlank', VBlankPanel)
    }
}

export default VBlank;