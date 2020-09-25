<!-- 购物车-商品卡片 -->
<template>
    <!-- <div class="commodity-card flex" @touchstart="gtouchstart($event)" @touchmove="gtouchmove()" @touchend="gtouchend()"> -->
    <div class="commodity-card flex" @click="detail()">
        <div class="commodity-card__img">
            <van-image
                lazy-load
                :src="$api.img + cardInfo.pic"
            />
            <span v-if="cardInfo.flashing" class="tag purple">限时购</span>
            <span v-else-if="cardInfo.newStatus == 1" class="tag blue">新品</span>
            <span v-else-if="cardInfo.discountStr" class="tag red">折扣</span>

            <div v-if="cardInfo.flashing && !cardInfo.hasStock" class="mask_limit">
                <div>
                    <p>限量</p>
                    <p>已抢光</p>
                </div>
            </div>
            <div v-else-if="!cardInfo.hasStock" class="mask">
                <p>补货中</p>
            </div>
        </div>
        
        <div class="commodity-card__info flex-1 flex flex-v flex-pack-justify">
            <div class="__top flex-1">
                <h5 class="title double-row">{{ cardInfo.productName }}</h5>
            </div>
            <p class="price" :class="cardInfo.flashing?'font':''">
                ￥{{ cardInfo.currentPrice }}
                <s v-show="cardInfo.discountStr !== undefined && cardInfo.discountStr !== null">￥{{ cardInfo.originalPrice }}</s>
            </p>
            <!-- 计步器 -->
            <div class="btn-wrap">
                <Stepper 
                    ref="stepper"
                    :limit="cardInfo.limit"
                    :count="count"
                    :productId="cardInfo.productId"
                    :cartId="cardInfo.cartVo.cartId"
                    :index="index"
                    :hasStock="cardInfo.hasStock"
                    @count-change="countChange"
                ></Stepper>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Stepper from '../stepper/StepperCart'
import Detail from '../commodity/Detail'
export default {
    props: {
        cardInfo: Object,
        index: String
    },
    data () {
        return {
            count: this.cardInfo.cartVo?this.cardInfo.cartVo.quantity:0,
            // 定时器
            timeOutEvent: 0,
        }
    },
    components: {
        Stepper,
        Detail
    },
    methods:{
        // 查看商品详情
        detail(){
            this.$router.push({ name: 'shoppingCartDetail', query: {id: this.cardInfo.productId}})
        },
        countChange(val){
            this.count = this.count + val;
            this.$emit('count-change', this.cardInfo.productId, this.count);
        },

        //开始按   
        gtouchstart(e){   
            this.timeOutEvent = setTimeout(this.longPress(), 3000);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适   
            e.preventDefault();
        },
        //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件   
        gtouchend(){   
            clearTimeout(this.timeOutEvent);//清除定时器   
            if(this.timeOutEvent != 0){   
                this.detail();
            }   
            return false;   
        },
        //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按   
        gtouchmove(){   
            clearTimeout(this.timeOutEvent);//清除定时器   
            this.timeOutEvent = 0;   
        },
        //真正长按后应该执行的内容   
        longPress(){   
            this.timeOutEvent = 0;   
            //执行长按要执行的内容，如弹出菜单   
            alert("长按事件触发发");   
        },
    },
}
</script>

<style lang="scss" scoped>
    .commodity-card{
        padding: 10px;
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
