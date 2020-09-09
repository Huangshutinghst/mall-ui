<template>
    <div class="price">
        <p>
            总价
            <span class="fr">￥{{ shopPrice }}</span>
        </p>
        <p>
            配送费
            <span class="fr">￥{{ deliveryPrice }}</span>
        </p>
        <p v-if="couponPrice !== null" class="coupon">
            优惠券减免 
            <span class="icon">券</span>
            <span class="fr">-￥{{ couponPrice }}</span>
        </p>
        <p>
            合计
            <span class="fr">￥{{ allPrice }}</span>
        </p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        shopPrice: Number,
        deliveryPrice: Number,
        allPrice: Number,
        couponPrice: Number
    },
    data () {
        return {

        }
    },
    components: {

    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
    .price{
        >p{
            padding: 12px 0;
            &:not(:last-child){
                border-bottom: 1px solid rgba(238,238,238,0.4);
            }
            &.coupon{
                color: #ee0a24;
                >.icon{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    color: #fff;
                    background: #ee0a24;
                    border-radius: 1px;
                    font-size: 10px;
                    vertical-align: middle;
                    margin: -2px 0 0 6px;
                }
            }
        }
    }
</style>
