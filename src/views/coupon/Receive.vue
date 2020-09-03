<!-- 领券中心 -->
<template>
    <div class="coupon-receive panel__hidden">
        <VHeader title="" leftText="领券中心"></VHeader>
        <div class="panel__scroll panel__content">
            <ul v-if="couponList.length > 0">

            </ul>
            <VBlank v-else text="没有可领取的优惠券"></VBlank>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
export default {
    data () {
        return {
            couponList: [
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
    .coupon-receive{
        
    }
</style>