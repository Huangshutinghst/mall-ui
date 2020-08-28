<template>
    <div class="price">
        <p>
            总价
            <span class="fr">￥{{shopPrice.toFixed(2)}}</span>
        </p>
        <p>
            配送费
            <span class="fr">￥{{deliveryPrice.toFixed(2)}}</span>
        </p>
        <p>
            合计
            <span class="fr">￥{{allPrice.toFixed(2)}}</span>
        </p>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        shopPrice: Number,
        deliveryPrice: Number,
        allPrice: Number,
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
        }
    }
</style>
