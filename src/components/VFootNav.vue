<template>
    <van-tabbar class="panel__foot" v-model="tabActive" @change="onChange">
        <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="category" icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item name="shoppingCart" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item name="mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        active:String
    },
    data(){
        return {
            tabActive: this.active,
        }
    },
    methods:{
        onChange(name){
            this.$router.replace({ name: name });
        }
    }
}
</script>