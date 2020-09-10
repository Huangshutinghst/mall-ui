<!-- 领券中心 -->
<template>
    <div class="coupon-receive panel__hidden">
        <div class="wrap bg_fff" v-show="!productListModal">
            <VHeader title="" leftText="领券中心"></VHeader>
            <div class="panel__scroll panel__content">
                <ul v-if="couponList.length > 0">
                    <li v-for="(item, index) in couponList" :key="index">
                        <CouponCard :page="'receive'" :obj="item" @open="openProductList"></CouponCard>
                    </li>
                </ul>
                <VBlank v-else text="没有可领取的优惠券"></VBlank>
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
                offset: 0,
                limit: 20
            },
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
        this.getCouponList();
    },
    methods:{
        // 分页获取优惠券
        getCouponList(type){
            this.$api.coupon.getCouponList(this.formInline).then(res => {
                this.couponList = res.data.data.list;
            }).catch(e => {
                console.log(e)
            })
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
    .coupon-receive{
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
            >.panel__scroll{
                >ul{
                    margin: 10px;
                    >li{
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>