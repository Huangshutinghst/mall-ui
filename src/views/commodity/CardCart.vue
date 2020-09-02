<!-- 购物车-商品卡片 -->
<template>
    <div class="commodity-card flex" @click="detail()">
        <div class="commodity-card__img">
            <van-image
                lazy-load
                src=""
            />
            <!-- <span class="tag blue">新品</span>
            <span class="tag red">折扣</span> -->

            <!-- <div class="mask_limit">
                <div>
                    <p>限量</p>
                    <p>已抢光</p>
                </div>
            </div> -->

            <!-- <div class="mask">
                <p>补货中</p>
            </div> -->
        </div>
        
        <div class="commodity-card__info flex-1 flex flex-v flex-pack-justify">
            <div class="__top flex-1">
                <h5 class="title double-row">商品名称</h5>
            </div>
            <p class="price"> <!-- 红色字: :class="'font'" -->
                ￥29.9
                <s>￥39</s>
            </p>
            <!-- 计步器 -->
            <div class="btn-wrap">
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
import Stepper from './StepperCart'
export default {
    data () {
        return {
            count: 1
        }
    },
    components: {
        Stepper,
    },
    methods:{
        // 查看商品详情
        detail(){
            this.$router.push({ name: 'commondityDetail' })
        },
        countChange(val){
            this.count = this.count + val;
        }
    },
}
</script>

<style lang="scss" scoped>
    .commodity-card{
        padding: 10px 15px;
        >.commodity-card__img{
            width: 80px;
            height: 80px;
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
            }
            >.mask{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: rgba(255, 255, 255, 0.4);
                >p{
                    position: absolute;
                    top: 50%;
                    left: 10%;
                    margin-top: -9px;
                    color: #fff;
                    font-size: 12px;
                    height: 18px;
                    line-height: 18px;
                    width: 80%;
                    text-align: center;
                    border-radius: 8px;
                    background: rgba(0, 0, 0, 0.3);
                }
            }
            >.mask_limit{
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
            .price{
                margin-top: 10px;
                font-size: 16px;
                color: #000;
                font-weight: bold;
                &.font{
                    color: #ee0a24;
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
                .btn{
                    text-align: center;
                    color: #fff;
                    font-size: 10px;
                    width: 56px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 10px;
                    background: #ee0a24;
                    &.disable{
                        background: #999;
                    }
                }
            }
        }
    }
 
</style>
