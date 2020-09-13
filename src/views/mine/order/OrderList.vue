<!-- 订单列表组件 -->
<template>
    <ul v-if="orderList.length > 0" class="order-list">
        <!-- 订单列表 -->
        <li class="order-list__item bg_fff" v-for="(item,index) in orderList" :key="index" @click="toOrderDetail(item)">
            <h5>
                <template v-if="item.status == -1">已关闭</template>
                <template v-if="item.status == 0">待支付</template>
                <template v-if="item.status == 1">已支付</template>
                <template v-if="item.status == 2">待收货</template>
                <template v-if="item.status == 3">待评价</template>
                <template v-if="item.status == 4">已完成</template>
                <span>{{ item.orderTime }}</span>
                <i class="fr van-icon van-icon-arrow van-cell__right-icon"></i>
            </h5>
            <div class="__content">
                <!-- 商品列表 -->
                <div v-for="(val,i) in item.orderItemVoList" :key="i" class="__info flex flex-pack-justify">
                    <template v-if="i == 0 || i == 1">
                        <van-image
                            class="__img"
                            fit="contain"
                            :src="$api.img + val.pic"
                        />
                        <p>
                            <span>{{ val.productName }}</span>
                            <span class="fr">x{{ val.quantity }}</span>
                        </p>
                    </template>
                </div>
                <div v-if="item.orderItemVoList.length > 2" class="over-text">. . .</div>
                
                <div class="__price">
                    共{{ item.productAmount }}件,实付：<span>￥{{ item.totalPrice }}</span>
                </div>
                <div class="__btn-box">
                    <div class="btn fr" v-if="item.status == 0" @click.stop="toPay()">去支付</div>
                    <div class="btn fr" v-if="item.status == 3" @click.stop="toComment(item)">去评价</div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        orderList: Array
    },
    data () {
        return {

        }
    },
    methods:{
        toOrderDetail(item){
            this.$router.push({ name: 'orderDetail',query: {id: item.orderId} });
        },
        toPay(){

        },
        toComment(item){
            this.$router.push({ name: 'comment', query:{id: item.orderId} });
        },
    },
}
</script>

<style lang="scss" scoped>
    .order-list{
        >.order-list__item{
            padding: 0 15px;
            &:not(:last-child){
                margin-bottom: 4px;
            }
            >h5{
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid rgba(238,238,238,0.8);
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
            >.__content{
                >.over-text{
                    margin-left: 52px;
                }
                >.__info{
                    overflow: hidden;
                    margin: 6px 0;
                    >.__img{
                        width: 40px;
                        height: 40px;
                    }
                    >p{
                        width: calc(100% - 50px);
                        height: 40px;
                        line-height: 40px;
                    }
                }
                >.__price{
                    text-align: right;
                    height: 26px;
                    >span{
                        font-size: 16px;
                        color: #ff6f00;
                    }
                }
                >.__btn-box{
                    overflow: hidden;
                    >.btn{
                        height: 24px;
                        line-height: 22px;
                        width: 74px;
                        text-align: center;
                        color: #ff6f00;
                        border: 1px solid #ff6f00;
                        margin: 10px 0;
                    }
                }
            }
        }
    }
</style>
