<!-- 我的优惠券 -->
<template>
    <div class="coupon-index panel__hidden">
        <div class="wrap bg_fff" v-show="!productListModal">
            <VHeader title="" leftText="我的优惠券"></VHeader>

            <van-tabs v-model="formInline.status" class="__tabs" :before-change="beforeChange">
                <van-tab v-for="item in tabList" :title="item.name" :key="item.type" :name="item.type"></van-tab>
            </van-tabs>

            <div class="panel__scroll">
                <ul v-if="couponList.length > 0">
                    <li v-for="(item, index) in couponList" :key="index">
                        <CouponCard :type="formInline.status" :obj="item" @open="openProductList" ></CouponCard>
                    </li>
                    <li class="text" v-show="formInline.status==1">特别提示：每位用户1天最多可使用2张优惠券</li>
                </ul>
                <VBlank v-else text="您没有该类型的优惠券"></VBlank>

                <div class="__bottom bg_fff" @click="receive()">领更多好券<span>></span></div>
            </div>
        </div>

        <!-- 优惠券适用商品列表 -->
        <ProductList class="product-list" 
                v-if="productListModal" 
                :couponObj="couponObj" 
                @close="(val)=>{this.productListModal = val}"
        ></ProductList>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import CouponCard from './Card'
import ProductList from '../couponlist/Index'
export default {
    data () {
        return {
            formInline: {
                status: 1,
                offset: 0,
                limit: 20
            },
            tabList: [
                {name: '未使用',type: 1},
                {name: '已使用',type: 2},
                {name: '已过期',type: 3}
            ],
            couponList: [],
            productListModal: false,
            couponObj: {},
        }
    },
    components: {
        VHeader,
        CouponCard,
        ProductList
    },
    mounted(){
        this.getUserCouponList();
    },
    methods:{
        // 分页获取优惠券
        getUserCouponList(type){
            if(type){
                this.formInline.status = type;
            }
            this.$api.coupon.getUserCouponList(this.formInline).then(res => {
                this.couponList = res.data.data.list;
            }).catch(e => {
                console.log(e)
            })
        },
        beforeChange(type){
            this.couponList = [];
            this.getUserCouponList(type);
        },
        // 领券
        receive(){
            this.$router.push({ name: 'receive' })
        },
        // 打开优惠券适用商品页
        openProductList(couponObj){
            this.couponObj = couponObj;
            this.productListModal = true;
        }
    },
}
</script>

<style lang="scss" scoped>
    .coupon-index{
        position: relative;
        .product-list{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        >.wrap{
            width: 100%;
            height: 100%;
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
    }
</style>

<style lang="scss">
    .coupon-index{
        >.wrap{
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
    }
</style>