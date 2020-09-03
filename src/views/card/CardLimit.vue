<!-- 限时抢购-商品卡片 -->
<template>
    <div class="commodity-card flex" :class="{no_padding: !padding}" @click="detail()">
        <div class="commodity-card__img">
            <van-image
                lazy-load
                src=""
            />
            <!-- <span class="tag blue">新品</span> -->
            <!-- <span class="tag red">折扣</span> -->
            <span class="tag purple">限时购</span>

            <!-- <div class="mask">
                <div>
                    <p>限量</p>
                    <p>已抢光</p>
                </div>
            </div> -->
        </div>
        
        <div class="commodity-card__info flex-1 flex flex-v flex-pack-justify">
            <div class="__top flex-1">
                <h5 class="title double-row">商品名称</h5>
                <p class="text single-row">商品介绍介绍</p>
                <p class="tag">
                    <span class="stock">剩余40%</span>
                    <!-- <span class="red">已减10元</span>
                    <span class="green">领40元券</span> -->
                    <!-- <span class="yellow">网红推荐</span> -->
                    <span class="bule">-18°冷藏</span>
                </p>
            </div>
            <p class="price font">
                <!-- ￥29.9 -->
                敬请期待
                <s>￥39</s>
            </p>
            <!-- 计步器 -->
            <div class="btn-wrap">
                <!-- 售罄禁用样式：disable -->
                <Stepper 
                    ref="stepper"
                    :limit="5"
                    :count="count"
                    @count-change="countChange"
                ></Stepper>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Stepper from '../stepper/StepperLimit'
export default {
    props: {
        padding: {
            type: Boolean,
            default: true
        },
    },
    data () {
        return {
            count: 0
        }
    },
    components: {
        Stepper,
    },
    methods:{
        detail(){
            this.$router.push({ name: 'commondityDetail' })
        },
        countChange(val){
            this.count = this.count + val;
        },
    },
}
</script>

<style lang="scss" scoped>
    .commodity-card{
        padding: 10px 15px;
        &.no_padding{
            padding: 10px 0px;
            >.commodity-card__info{
                .btn-wrap{
                    right: 2px;
                }
            }
        }
        >.commodity-card__img{
            width: 88px;
            height: 88px;
            margin-right: 10px;
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            .van-image{
                width: 100%;
                height: 100%;
            }
            .tag{
                position: absolute;
                top: 0;
                left: 0;
                color: #fff;
                font-size: 10px;
                height: 20px;
                line-height: 20px;
                background: linear-gradient(to right, #3698fb , #60afff);
                padding: 0 6px;
                border-radius: 8px 0 8px 0;
                &.blue{
                    background: linear-gradient(to right, #3698fb , #60afff);
                }
                &.red{
                    background: linear-gradient(to right, #ee0a24 , #ff919d);
                }
                &.purple{
                    background: linear-gradient(to right, #6e4aef, #a68cff)
                }
            }
            >.mask{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: rgba(255, 255, 255, 0.4);
                >div{
                    width: 50px;
                    height: 50px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -25px;
                    margin-left: -25px;
                    text-align: center;
                    border-radius: 50px;
                    background: rgba(0, 0, 0, 0.3);
                    padding: 8px 0;
                    >p{
                        color: #fff;
                        font-size: 12px;
                        line-height: 16px;
                    }
                }
                
            }
        }

        >.commodity-card__info{
            width: calc(100% - 90px);
            overflow: hidden;
            position: relative;
            .title{
                width: 95%;
                font-size: 14px;
                font-weight: bold;
            }
            .text{
                font-size: 12px;
                color: rgba(153, 153, 153, 0.6);
            }
            .tag{
                margin-top: 4px;
                >span{
                    font-size: 10px;
                    padding: 2px 4px;
                    border-radius: 6px;
                    margin-right: 2px;
                    &.stock{
                        display: inline-block;
                        width: 80px;
                        color: #ee0a24;
                        border: 1px solid #ee0a24;
                        border-radius: 8px;
                        padding: 0 4px;
                        text-align: center;
                    }
                    &.red{
                        color: #ee0a24;
                        background: rgba(238, 10, 36, 0.1);
                    }
                    &.green{
                        color: #0db059;
                        background: rgba(2, 169, 107, 0.1);
                    }
                    &.yellow{
                        color: rgba(192, 139, 6, 0.75);
                        background: rgba(230, 167, 10, 0.1);
                    }
                    &.bule{
                        color: #3698fb;
                        background: rgba(54, 152, 251, 0.1);
                    }
                }
            }
            .price{
                margin-top: 10px;
                font-size: 16px;
                color: #ee0a24;
                font-weight: bold;
                &.font{
                    font-size: 13px;
                }
                >s{
                    font-size: 12px;
                    color: rgba(153, 153, 153, 0.6);
                }
            }
            .btn-wrap{
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
    }
 
</style>
