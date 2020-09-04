<!-- 领券中心 -->
<template>
    <div class="coupon-receive panel__hidden bg_fff">
        <VHeader title="" leftText="领券中心"></VHeader>
        <div class="panel__scroll panel__content">
            <ul v-if="couponList.length > 0">
                <li v-for="(item, index) in couponList" :key="index">
                    <CouponCard :page="'receive'" :isReceive="false"></CouponCard>
                </li>
            </ul>
            <VBlank v-else text="没有可领取的优惠券"></VBlank>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import CouponCard from './Card'
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
        CouponCard,
    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
    .coupon-receive{
        >.panel__scroll{
            >ul{
                margin: 10px;
                >li{
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>