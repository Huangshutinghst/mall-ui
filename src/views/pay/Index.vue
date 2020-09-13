<!-- 评价组件 -->
<template>
    <div class="pay-index panel__hidden">
        <!-- 1.header -->
        <VHeader title="" leftText="在线支付"></VHeader>

        <!-- 2.content -->
        <div class="panel__content">
            <!-- 支付倒计时 -->
            <p class="title">
                支付剩余时间：<van-count-down :time="time" format="mm 分钟 ss 秒"/>
            </p>
            <!-- 订单信息模块 -->
            <div class="price box bg_fff">
                <p>
                    订单编号：
                    <span class="fr">123123131232</span>
                </p>
                <p>
                    订单金额：
                    <span class="fr">￥44.00</span>
                </p>
                <p>
                    余额抵扣：
                    <span class="fr">￥0</span>
                </p>
                <p>
                    支付金额：
                    <span class="fr">￥0</span>
                </p>
            </div>
            <!-- 支付方式模块 -->
            <div class="box settle-index__pay box bg_fff">
                <h5>支付方式</h5>
                <van-radio-group v-model="payRadio" class="__group">
                    <van-cell-group>
                        <van-cell clickable @click="radio = '1'">
                            <template #title>
                                支付宝支付<span>(沙箱账号：jopdhq0178@sandbox.com 账号/支付密码：111111)</span>
                            </template>
                            <template #right-icon>
                                <van-radio name="1" />
                            </template>
                        </van-cell>
                        <van-cell clickable @click="radio = '2'">
                            <template #title>
                                微信支付
                            </template>
                            <template #right-icon>
                                <van-radio disabled name="2" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
            <div class="btn" @click="handleSubmit()">
                确认支付
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
export default {
    components: {
        VHeader
    },
    data () {
        return {
            time: 1000000,
            payRadio: '1',
        }
    },
    methods:{
        handleSubmit(){
            
        }
    },
}
</script>

<style lang="scss" scoped>
    .pay-index{
        >.panel__content{
            >.title{
                text-align: center;
                font-size: 12px;
                color: #ff6f00;
                background: #fff8c5;
                height: 24px;
                line-height: 24px;
                /deep/ .van-count-down{
                    color: #ff6f00;
                    font-size: 12px;
                    display: inline;
                }
            }
            .box{
                margin-bottom: 10px;
                font-size: 14px;
                padding: 0 15px;
                >h5{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            .btn{
                height: 42px;
                line-height: 42px;
                text-align: center;
                background: linear-gradient(to right, #0db059, #089460);
                color: #fff;
                font-size: 14px;
                border-radius: 20px;
                margin: 15px 10px;
            }
            .settle-index__pay{
                >.__group{
                    .van-cell{
                        padding-right: 0;
                        padding-left: 0;
                        &::after{
                            right: 0;
                            left: 0;
                        }
                    }
                }
            }
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
        }
        /deep/ .van-radio__icon--checked .van-icon{
            background-color: #0db059;
            border-color: #0db059;
        }
    }
</style>
