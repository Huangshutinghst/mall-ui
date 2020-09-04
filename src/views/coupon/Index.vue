<!-- 我的优惠券 -->
<template>
    <div class="coupon-index panel__hidden bg_fff">
        <VHeader title="" leftText="我的优惠券"></VHeader>

        <van-tabs v-model="tabActive" class="__tabs" :before-change="beforeChange">
            <van-tab v-for="item in tabList" :title="item.name" :key="item.type" :name="item.type"></van-tab>
        </van-tabs>

        <div class="panel__scroll">
            <ul v-if="couponList.length > 0">
                <li v-for="(item, index) in couponList" :key="index">
                    <CouponCard :type="tabActive"></CouponCard>
                </li>
                <li class="text" v-show="tabActive=='wsy'">特别提示：每位用户1天最多可使用2张优惠券</li>
            </ul>
            <VBlank v-else text="您没有该类型的优惠券"></VBlank>

            <div class="__bottom bg_fff" @click="receive()">领更多好券<span>></span></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import CouponCard from './Card'
export default {
    data () {
        return {
            tabActive: 'wsy',
            tabList: [
                {name: '未使用',type: 'wsy'},
                {name: '已使用',type: 'ysy'},
                {name: '已过期',type: 'ygq'}
            ],
            couponList: [
                {},{},{}
            ]
        }
    },
    components: {
        VHeader,
        CouponCard,
    },
    methods:{
        beforeChange(type){
            this.tabActive = type;
        },
        // 领券
        receive(){
            this.$router.push({ name: 'receive' })
        },
    },
}
</script>

<style lang="scss" scoped>
    .coupon-index{
        >.__tabs{
            height: 30px;
            border-bottom: 1px solid #eee;
        }
        >.panel__scroll{
            height: calc(100% - 110px) !important;
            >ul{
                margin: 10px;
                >li{
                    margin-bottom: 10px;
                    &.text{
                        text-align: center;
                        color: #999;
                        font-size: 12px;
                        margin-top: 20px;
                    }
                }
            }
            >.__bottom{
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 14px;
                box-shadow: 0px -1px 8px rgba(0, 0, 0, 0.1);
                color: #ff6f00;
                >span{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    line-height: 12px;
                    vertical-align: middle;
                    color: #fff;
                    background: #ff6f00;
                    border-radius: 100%;
                    margin: -2px 0 0 2px;
                }
            }
        }
    }
</style>

<style lang="scss">
    .coupon-index{
        >.__tabs{
            >.van-tabs__wrap{
                height: 100%;
            }
            .van-tab--active{
                span{
                    font-weight: bold;
                }
            }
            .van-tabs__line{
                width: 30px !important;
                background: #0db059;
            }
        }
    }
</style>