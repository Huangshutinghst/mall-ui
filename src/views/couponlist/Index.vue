<!-- 优惠券适用商品 -->
<template>
    <div class="coupon-list-index panel__hidden">
        <VHeader title="" leftText="优惠券适用商品"></VHeader>
        <div class="panel__scroll panel__content">
            
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
export default {
    data () {
        return {
            goodsList: [
                {},{},{},{}
            ]
        }
    },
    components: {
        VHeader,
    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
    .coupon-list-index{
        
    }
</style>