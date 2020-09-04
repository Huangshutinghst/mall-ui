<!-- 优惠券适用商品 -->
<template>
    <div class="coupon-list-index panel__hidden">
        <VHeader title="" leftText="优惠券适用商品"></VHeader>
        <div class="panel__content flex flex-v">
            <div class="__top bg_fff">
                <div>
                    <CouponCard :page="'shop'" :isReceive="true"></CouponCard>
                    <p>
                        以下商品可使用满10元减10元的优惠券
                        <font class="fr" @click="showInfo()">规则说明></font>
                    </p>
                </div>
            </div>
            <div class="panel__scroll flex-1">
                <FilterList class="commodity-filter-list--coupon" :type="'space'" :fixedHead="true" :list="resultList"></FilterList>
            </div>
        </div>

        <RulePop :modal="popShow" @visible-change="(val) => {this.popShow = val}"></RulePop>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import CouponCard from '../coupon/Card'
import FilterList from '../commodity/FilterList'
import RulePop from './RulePop'
export default {
    data () {
        return {
            popShow: false,
            resultList: [
                {},{},{},{},{},{},{},{},{},{},{},{}
            ],
        }
    },
    components: {
        VHeader,
        CouponCard,
        FilterList,
        RulePop
    },
    methods:{
        // 规则说明
        showInfo(){
            this.popShow = true;
        }
    },
}
</script>

<style lang="scss" scoped>
    .coupon-list-index{
        >.panel__content{
            >.__top{
                height: 136px;
                >div{
                    padding: 10px;
                    background: linear-gradient(to right, rgba(255, 179, 61, 0.1), rgba(255, 255, 255, 1));
                    >p{
                        margin-top: 8px;
                        font-size: 12px;
                        line-height: 18px;
                    }
                }
            }

            >.panel__scroll{
                .commodity-filter-list--coupon /deep/ {
                    .__top{
                        &.fixed{
                            top: 176px !important;
                        }
                    }
                }
            }
        }
    }
</style>