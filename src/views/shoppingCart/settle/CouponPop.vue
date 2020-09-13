<template>
    <van-popup class="poupon-rule-pop flex flex-v panel__hidden" v-model="visible" @close="close" round position="bottom" :style="{ height: '55%' }">
        <div class="__top">
            请选择优惠券
            <van-icon class="fr" name="cross" @click="close()" />
        </div>
        <div class="__content flex-1 panel__scroll">
            <ul>
                <li v-for="item in couponList.can" :key="item.couponId" >
                    <Card :page="'choose'" :obj="item" @choose="couponChoose"></Card>
                </li>
            </ul>
            <template v-if="couponList.cannot && couponList.cannot.length > 0">
                <p>以下此订单暂不适用</p>
                <ul>
                    <li v-for="item in couponList.cannot" :key="item.couponId" >
                        <Card :page="'choose'" :obj="item" :type="5"></Card>
                    </li>
                </ul>
            </template>
            <p>特别提示：每位用户1天最多可使用2张优惠券</p>
        </div>
    </van-popup>
</template>

<script type="text/ecmascript-6">
import Card from '../../coupon/Card'
export default {
    props: {
        modal: Boolean,
        couponList: Object
    },
    components: {
        Card
    },
    watch: {
        modal(val) {
            console.log(val)
        }
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
        couponChoose(couponObj){
            this.close();
            console.log(couponObj)
        }
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
            >p{
                color: #999;
                text-align: center;
                margin: 0 0 10px;
            }
            li{
                padding-bottom: 15px;
            }
        }

    }
</style>
