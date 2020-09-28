<!-- 优惠券适用商品 -->
<template>
    <div class="coupon-list-index panel__hidden">
        <VHeader title="" leftText="优惠券适用商品"></VHeader>
        <div class="panel__content flex flex-v">
            <div class="__top bg_fff">
                <div>
                    <CouponCard :page="'shop'" :obj="couponObj"></CouponCard>
                    <p>
                        以下商品可使用满{{ couponObj.minPriceStr }}元减{{ couponObj.discountStr }}元的优惠券
                        <font class="fr" @click="showInfo()">规则说明></font>
                    </p>
                </div>
            </div>
            <div class="panel__scroll flex-1">
                <FilterList class="commodity-filter-list--coupon"
                        ref="scroll-view"
                        :type="'space'"
                        :fixedHead="true"
                        :list="resultList"
                        :loading="loading"
                        :finished="finished"
                        @filter-has="filterHas"
                        @filter-price="filterPrice"
                        @on-load="getByCouponId"
                ></FilterList>
            </div>
        </div>

        <RulePop :modal="popShow" :obj="couponObj" @visible-change="(val) => {this.popShow = val}"></RulePop>
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
            formInline: {
                inStock: '', //0不过滤  1过滤
                priceSort: '', //1从低到高  2从高到低
                offset: 0,
                limit: 10
            },
            popShow: false,
            resultList: [],
            couponObj: {},
            loading: false,
            finished: false
        }
    },
    components: {
        VHeader,
        CouponCard,
        FilterList,
        RulePop
    },
    beforeRouteLeave(to, from, next){
        const { name } = to;
        if (name == 'shoppingCartDetail') {
            from.meta.keepAlive  = true;
            from.meta.scrollPos = { x: this.$refs['scroll-view'].getScrollTop(), y: 0 }
        } else {
            from.meta.keepAlive = false;
            from.meta.scrollPos = { x: 0, y: 0 };
        }
        next();
    },
    beforeRouteEnter(to, from, next){
        next((vm) => {
            vm.$refs['scroll-view'].scroll(vm.$route.meta.scrollPos.x);
        })
    },
    mounted() {
        this.getCouponObj();
    },
    methods:{
        // 获取当前优惠券信息
        getCouponObj(){
            this.$api.coupon.getCouponObj(this.$route.query.id).then(res => {
                this.couponObj = res.data.data;
            }).catch(e => {
                console.log(e)
            })
        },
        // 获取优惠券可用商品
        getByCouponId(){
            const _this = this
            _this.loading = true;
            _this.$api.coupon.getByCouponId(this.$route.query.id, this.formInline).then(res => {
                _this.loading = false;
                if (res.data.data.list.length === 0) {
                    _this.finished = true;
                } else {
                    _this.formInline.offset = _this.formInline.offset + _this.formInline.limit
                    res.data.data.list.forEach(item => {
                        _this.resultList.push(item)
                    })
                }
            }).catch(e => {
                console.log(e)
            })
        },
        // 是否过滤有货
        filterHas(val){
            if(val){
                this.formInline.inStock = 1;
            }else{
                this.formInline.inStock = 0;
            }
            this.clearPage()
            this.getByCouponId();
        },
        // 价格排序
        filterPrice(val){
            this.formInline.priceSort = val;
            this.clearPage()
            this.getByCouponId();
        },
        // 规则说明
        showInfo(){
            this.popShow = true;
        },
        // 清空分页相关参数
        clearPage() {
            this.finished = false
            this.resultList = []
            this.formInline.offset = 0
            this.formInline.limit = 10
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
                            top: 174px !important;
                        }
                    }
                }
            }
        }
    }
</style>
