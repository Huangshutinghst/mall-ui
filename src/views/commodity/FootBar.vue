<template>
    <div class="commodity-foot-bar flex bg_fff">
        <div class="flex flex-1 flex-pack-justify">
            <div class="check">
                <van-icon name="shopping-cart-o" />
                <span v-show="$store.state.shopCardCound > 0">{{ $store.state.shopCardCound }}</span>
                已选（{{ $store.state.shopCheckedList.length }}）
            </div>
            <div class="price">
                <!-- ￥0.00 -->
            </div>
        </div>
        <div class="btn btn_bg" @click="handleToCart()">
            去购物车
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {

        }
    },
    components: {

    },
    mounted(){
        this.$store.commit('GET_SHOP_CARD_COUND');
    },
    methods:{
        handleToCart(){
            this.$router.push({ name: 'shoppingCartList' })
        }
    },
}
</script>

<style lang="scss" scoped>
    .commodity-foot-bar{
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #eee;
        >.flex{
            padding: 0 12px;
            >.check{
                font-size: 12px;
                position: relative;
                >i{
                    font-size: 16px;
                    margin-right: 2px;
                    vertical-align: middle;
                    margin-top: -4px;
                }
                >span{
                    display: block;
                    position: absolute;
                    top: 8px;
                    left: 8px;
                    background: #ee0a24;
                    width: 12px;
                    height: 12px;
                    line-height: 12px;
                    border-radius: 20px;
                    color: #fff;
                    font-size: 10px;
                    text-align: center;
                }
            }
            >.price{
                font-size: 16px;
                color: #ff6f00;
                font-weight: bold;
            }
        }
        >.btn{
            width: 100px;
            text-align: center;
            color: #fff;
            font-size: 14px;
        }
    }
</style>
