<!-- 订单详情 -->
<template>
    <div class="order-detail panel__hidden">
        <VHeader title="" leftText="订单"></VHeader>
        
        <div class="panel__scroll panel__content">
            <!-- 顶部模块 -->
            <div class="order-detail__top __item bg_fff">
                <h5>
                    <template v-if="obj.status == -1">已关闭</template>
                    <template v-if="obj.status == 0">待支付</template>
                    <template v-if="obj.status == 1">已支付</template>
                    <template v-if="obj.status == 2">待收货</template>
                    <template v-if="obj.status == 3">待评价</template>
                    <template v-if="obj.status == 4">已完成</template>
                </h5>
            </div>

            <!-- 商品列表模块 -->
            <div class="order-detail__shoplist __item bg_fff">
                <VShoplist :title="'数量'" :bold="true" :list="obj.orderItemVoList" :total="obj.productAmount"></VShoplist>
            </div>

            <!-- 金额模块 -->
            <div class="order-detail__price __item bg_fff">
                <VPrice :shopPrice="obj.productPrice" 
                        :deliveryPrice="obj.deliveryPrice" 
                        :allPrice="obj.totalPrice"
                        :couponPrice="obj.couponPrice"
                ></VPrice>
            </div>

            <!-- 收货信息模块 -->
            <div class="order-detail__receipt __item bg_fff">
                <p>
                    <label>期望时间</label>：
                    <span>{{ obj.expectTime }}</span>
                </p>
                <p>
                    <label><span class="flex flex-pack-justify"><font>收</font><font>货</font><font>人</font></span></label>：
                    <span>{{ obj.receiveName }} &nbsp; {{ obj.receivePhone }}</span>
                </p>
                <p>
                    <label>收货地址</label>：
                    <span>{{ obj.receiveAddress }}</span>
                </p>
            </div>

            <!-- 配送员信息模块 -->
            <div v-if="obj.status == 2 || obj.status == 3 || obj.status == 4" class="order-detail__delivery __item bg_fff">
                <p>
                    <label><span class="flex flex-pack-justify"><font>配</font><font>送</font><font>员</font></span></label>：
                    <span>{{ obj.deliveryMan }}</span>
                    <van-icon class="fr telephone-btn" name="phone-o" />
                </p>
            </div>

            <!-- 订单信息模块 -->
            <div class="order-detail__order-info __item bg_fff">
                <p>
                    <label><span class="flex flex-pack-justify"><font>订</font><font>单</font><font>号</font></span></label>：
                    <span>{{ obj.orderNumber }}</span>
                </p>
                <p v-if="obj.remark !== null">
                    <label><span class="flex flex-pack-justify"><font>备</font><font>注</font></span></label>：
                    <span>{{ obj.remark }}</span>
                </p>
                <p v-if="obj.status == 1 || obj.status == 2 || obj.status == 3 || obj.status == 4">
                    <label>支付方式</label>：
                    <span>支付宝支付</span>
                </p>
                <p>
                    <label>下单时间</label>：
                    <span>{{ obj.orderTime }}</span>
                </p>
                <p v-if="obj.status == 1 || obj.status == 2 || obj.status == 3 || obj.status == 4">
                    <label>支付时间</label>：
                    <span>{{ obj.payTime }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../../components/VHeader'
import VPrice from '../../../components/price/VPrice'
import VShoplist from '../../../components/shoplist/VShoplist'
export default {
    data () {
        return {
            obj: {}
        }
    },
    components: {
        VHeader,
        VPrice,
        VShoplist,
    },
    mounted(){
        this.getOrderDetail();
    },
    methods:{
        getOrderDetail(){
            this.$api.order.getOrderDetail(this.$route.query.id).then(res => {
                this.obj = res.data.data;
            }).catch(e => {
                console.log(e)
            })
        },
    },
}
</script>

<style lang="scss" scoped>
    .order-detail{
        .__item{
            margin-bottom: 10px;
            font-size: 14px;
            padding: 0 15px;
        }

        .order-detail__top{
            padding: 16px 0;
            text-align: center;
            >h5{
                font-size: 16px;
                font-weight: bold;
            }
        }

        .order-detail__shoplist{}

        .order-detail__price{}

        .order-detail__receipt, .order-detail__delivery, .order-detail__order-info{
            >p{
                padding: 12px 0;
                &:not(:last-child){
                    border-bottom: 1px solid rgba(238,238,238,0.4);
                }
                >label{
                    display: inline-block;
                    width: 60px;
                    >span{
                        width: 100%;
                        >font{
                        
                        }
                    }
                    
                }
                >span{
                    display: inline-block;
                    width: calc(100% - 80px);
                    vertical-align: middle;
                    margin-top: -3px;
                }
            }
        }

        .order-detail__delivery{
            color: #0db059;
            position: relative;
            .telephone-btn{
                position: absolute;
                top: 14px;
                right: 15px;
            }
        }

        .order-detail__order-info{}
    }
</style>
