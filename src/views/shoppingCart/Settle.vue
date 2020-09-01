<!-- 结算页面 -->
<template>
    <div class="settle-index panel__hidden">
        <VHeader title="订单配送至" leftText=""></VHeader>

        <div class="panel__content">
            <!-- 1.顶部模块 -->
            <div class="settle-index__top" @click="addressChoose()">
                <h5>
                    这是地址地址地址地址地址地址地址地址地址地址
                    <i class="fr van-icon van-icon-arrow van-cell__right-icon"></i>
                </h5>
                <p>胖大喵(女士)&nbsp;&nbsp;17888888888</p>
            </div>

            <!-- 2.中间滚动区域 -->
            <div class="settle-index__content">
                <div class="panel__scroll">
                    <!-- 送达时间模块 -->
                    <div class="settle-index__time __item bg_fff">
                        <h5 @click="timeChoose()">
                            送达时间
                            <i class="fr van-icon van-icon-arrow van-cell__right-icon"></i>
                            <span class="fr text">尽快送达 预计09:10送达</span>
                        </h5>
                    </div>

                    <!-- 支付方式模块 -->
                    <div class="settle-index__pay __item bg_fff">
                        <h5>支付方式</h5>
                        <van-radio-group v-model="payRadio" class="__group">
                            <van-cell-group>
                                <van-cell clickable @click="radio = '1'">
                                    <template #title>
                                        支付宝支付
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
                                        <van-radio name="2" />
                                    </template>
                                </van-cell>
                                <van-cell clickable @click="radio = '3'">
                                    <template #title>
                                        花呗支付
                                    </template>
                                    <template #right-icon>
                                        <van-radio name="3" />
                                    </template>
                                </van-cell>
                            </van-cell-group>
                        </van-radio-group>
                    </div>
                
                    <!-- 备注模块 -->
                    <div class="settle-index__remark __item bg_fff">
                        <h5>备注</h5>
                        <van-field
                            v-model="remark"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="100"
                            placeholder="输入备注信息"
                        />
                        <ul>
                            <li v-for="(item, index) in remarkList" :key="index" @click="handleRemark(item)">{{item}}</li>
                        </ul>
                    </div>

                    <!-- 商品列表模块 -->
                    <div class="settle-index__shoplist __item bg_fff">
                        <VShoplist :title="'商品'" :bold="false"></VShoplist>
                    </div>

                    <!-- 总价模块 -->
                    <div class="settle-index__price __item bg_fff">
                        <VPrice :shopPrice="0" :deliveryPrice="0" :allPrice="0"></VPrice>
                    </div>

                    <!-- 号码保护模块 -->
                    <!-- <div class="settle-index__telephone __item bg_fff"></div> -->
                </div>
            </div>

            <!-- 3.底部支付 -->
            <div class="settle-index__foot bg_fff">
                应付<span>￥36.78</span>
                <div class="fr" @click="pay()">去支付</div>
            </div>
        </div>

        <!-- 选择时间组件 -->
        <TimeChoosePop 
            :modal="timeModal" 
            @visible-change="(val) => timeModal = val"
        ></TimeChoosePop>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import VPrice from '../../components/price/VPrice'
import VShoplist from '../../components/shoplist/VShoplist'
import TimeChoosePop from './settle/TimeChoosePop'
export default {
    data () {
        return {
            remark: '',
            payRadio: '1',
            timeModal: false,
            remarkList: [
                '预约订单，请准时送达！不早不迟！',
                '电话联系不上时，请直接帮我把商品放自提点自取。',
                '快到的时候，请提前电话联系我；谢谢',
                '保护环境，生鲜商品无需使用塑料袋隔离',
            ]
        }
    },
    components: {
        VHeader,
        VPrice,
        VShoplist,
        TimeChoosePop,
    },
    methods:{
        // 地址选择
        addressChoose(){
            this.$router.push({ name:'myAddress',query:{choose:true} })
        },
        // 时间选择
        timeChoose(){
            this.timeModal = true;
        },
        // 快捷备注
        handleRemark(text){
            this.remark = this.remark + text + '；'
        },
        // 去支付
        pay(){

        },
    },
}
</script>

<style lang="scss" scoped>
    .settle-index{
        // 头部
        .settle-index__top{
            height: 65px;
            background: #02a96b;
            color: #fff;
            >h5{
                font-size: 16px;
                font-weight: 400;
                padding: 0 30px;
                text-align: right;
                height: 40px;
                line-height: 40px;
                overflow: hidden;
                white-space: nowrap;
                position: relative;
                text-overflow: ellipsis;
                >i{
                    position: absolute;
                    top: 8px;
                    right: 15px;
                    color: #fff;
                }
            }
            >p{
                text-align: center;
            }
        }

        // 底部支付
        .settle-index__foot{
            height: 40px;
            line-height: 40px;
            border-top: 1px solid #eee;
            padding-left: 15px;;
            >span{
                font-size: 16px;
                color: #ff6f00;
            }
            >.fr{
                width: 100px;
                height: 100%;
                text-align: center;
                background: #02a96b;
                color: #fff;
                font-size: 14px;
            }
        }

        // 中间滚动区域
        .settle-index__content{
            height: calc(100% - 105px);
            .__item{
                margin-bottom: 10px;
                font-size: 14px;
                padding: 0 15px;
                >h5{
                    height: 40px;
                    line-height: 40px;
                    font-size: 12px;
                    font-weight: bold;
                }
            }

            .settle-index__time{
                margin-top: 10px;
                >h5{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    font-weight: bold;
                    >span{
                        font-size: 12px;
                        font-weight: normal;
                        color: #999;
                    }
                    >i{
                        margin-top: 8px;
                        font-size: 12px;
                    }
                }
            }

            .settle-index__remark{
                .van-field{
                    padding: 0 0 16px;
                }
                >ul{
                    font-size: 0;
                    >li{
                        font-size: 12px;
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        color: #999;
                        background: #f5f5f5;
                        padding: 0 8px;
                        margin: 0 8px 12px 0;
                    }
                }
            }

            .settle-index__shoplist{}

            .settle-index__price{}

            .settle-index__telephone{}
        }
    }
</style>

<style lang="scss">
    .settle-index{
        .settle-index__content{
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
            .settle-index__remark{
                .van-cell::after{
                    display: none;
                }
            }
        }
    }   
</style>