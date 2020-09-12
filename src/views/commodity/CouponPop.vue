<template>
    <van-popup class="poupon-rule-pop flex flex-v panel__hidden" v-model="visible" @close="close" round position="bottom" :style="{ height: '50%' }">
        <div class="__top">
            领取优惠券
            <van-icon class="fr" name="cross" @click="close()" />
        </div>
        <ul class="__content flex-1 panel__scroll">
            <li v-for="item in couponList" :key="item.couponId" >
                <Card :page="'receive'" :obj="item"></Card>
            </li>
        </ul>
    </van-popup>
</template>

<script type="text/ecmascript-6">
import Card from '../coupon/Card'
export default {
    props: {
        modal: Boolean,
        couponList: Array
    },
    components: {
        Card
    },
    data () {
        return {
            visible: false,
        }
    },
    watch: {
        modal(val){
            this.visible = val;
        }
    },
    methods:{
        close(){
            this.visible = false;
            this.$emit('visible-change', false);
        },
    },
}
</script>

<style lang="scss" scoped>
    .poupon-rule-pop{
        >.__top{
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #eee;
            font-size: 15px;
            font-weight: bold;
            padding-left: 40px;
            >i{
                vertical-align: middle;
                line-height: 40px;
                padding: 0 15px 0 10px;
            }
        }

        >.__content{
            padding: 15px 15px 0;
            >li{
                padding-bottom: 15px;
            }
        }

    }
</style>
