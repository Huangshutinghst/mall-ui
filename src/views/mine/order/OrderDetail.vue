<!-- 订单详情 -->
<template>
    <div class="order-detail panel__hidden">
        <VHeader title="" leftText="订单"></VHeader>
        
        <div class="panel__scroll panel__content">
            <!-- 顶部模块 -->
            <div class="order-detail__top __item bg_fff">
                <h5>订单已完成</h5>
            </div>

            <!-- 商品列表模块 -->
            <div class="order-detail__shoplist __item bg_fff">
                <VShoplist :title="'数量'" :bold="true"></VShoplist>
            </div>

            <!-- 金额模块 -->
            <div class="order-detail__price __item bg_fff">
                <VPrice :shopPrice="0" :deliveryPrice="0" :allPrice="0"></VPrice>
            </div>

            <!-- 收货信息模块 -->
            <div class="order-detail__receipt __item bg_fff">
                <p>
                    <label>期望时间</label>：
                    <span>03月12日 16:30 ~ 17:00 送达</span>
                </p>
                <p>
                    <label><span class="flex flex-pack-justify"><font>收</font><font>货</font><font>人</font></span></label>：
                    <span>胖大喵(女士) &nbsp; 17888888888</span>
                </p>
                <p>
                    <label>收货地址</label>：
                    <span>我是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长的地址</span>
                </p>
            </div>

            <!-- 配送员信息模块 -->
            <div class="order-detail__delivery __item bg_fff">
                <p>
                    <label><span class="flex flex-pack-justify"><font>配</font><font>送</font><font>员</font></span></label>：
                    <span>孙菜</span>
                    <van-icon class="fr telephone-btn" name="phone-o" />
                </p>
            </div>

            <!-- 订单信息模块 -->
            <div class="order-detail__order-info __item bg_fff">
                <p>
                    <label><span class="flex flex-pack-justify"><font>订</font><font>单</font><font>号</font></span></label>：
                    <span>008880000000111</span>
                </p>
                <p>
                    <label><span class="flex flex-pack-justify"><font>备</font><font>注</font></span></label>：
                    <span>这是一条很长很长很长很长很长很长很长很长很长很长的备注</span>
                </p>
                <p>
                    <label>支付方式</label>：
                    <span>支付宝支付</span>
                </p>
                <p>
                    <label>下单时间</label>：
                    <span>2020-12-12 14:00</span>
                </p>
                <p>
                    <label>支付时间</label>：
                    <span>2020-12-12 14:00</span>
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
            
        }
    },
    components: {
        VHeader,
        VPrice,
        VShoplist,
    },
    methods:{

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
                    vertical-align: top;
                }
            }
        }

        .order-detail__delivery{
            color: #02a96b;
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
