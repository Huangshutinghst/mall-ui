<template>
    <van-tabbar class="panel__foot" v-model="tabActive" @change="onChange">
        <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="category" icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item name="shoppingCart" icon="cart-o">
            <span class="num" v-show="$store.state.shopCardCound > 0">{{ $store.state.shopCardCound }}</span>
            购物车
        </van-tabbar-item>
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
    mounted(){
        this.$store.commit('GET_SHOP_CARD_COUND');
    },
    methods:{
        onChange(name){
            this.$router.replace({ name: name });
        }
    }
}
</script>

<style lang="scss" scoped>
    .panel__foot{
        .van-tabbar-item{
            .van-tabbar-item__text{
                position: relative;
                >span.num{
                    position: absolute;
                    top: -24px;
                    right: -2px;
                    display: block;
                    background: #ee0a24;
                    width: 15px;
                    height: 15px;
                    line-height: 15px;
                    border-radius: 20px;
                    text-align: center;
                    color: #fff;
                    font-size: 10px;
                }
            }
        }
    }
</style>