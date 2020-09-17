<!-- 首页 -->
<template>
    <div class="home-index panel__hidden">
        <!-- 头部搜索 -->
        <van-sticky>
            <VSearch></VSearch>
        </van-sticky>

        <!-- 内容 -->
        <div class="panel__scroll panel__content--fistlevel">
            <!-- banner轮播 -->
            <HomeSwipe></HomeSwipe>
            <!-- 一级分类 -->
            <HomeGrid></HomeGrid>
            <!-- 吸顶类别 -->
            <HomeSticky @change-tab="tabChange" @btn-show="btnShow"></HomeSticky>

            <!-- 热门商品 -->
            <Hot :ref="'hotRef'" v-show="currentModule == 'hot'"></Hot>

            <!-- 限时抢购 -->
            <LimitTime :ref="'limitTimeRel'" v-show="currentModule == 'limitTime'"></LimitTime>
        </div>

        <!-- 底部导航 -->
        <VFootNav active="home"></VFootNav>

        <!-- 领券 -->
        <div v-show="couponBtnShow" class="get-coupon" @click="getCoupon">
            <img src="../../images/coupon_icon.png">
            <div>领券</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VFootNav from '../../components/VFootNav';
import VSearch from '../../components/VSearch';
import HomeSwipe from './component/HomeSwipe';
import HomeGrid from './component/HomeGrid';
import HomeSticky from './component/HomeSticky';
import Hot from './module/Hot';
import LimitTime from './module/LimitTime';
export default {
    data () {
        return {
            currentModule: 'hot',
            couponBtnShow: true,
        }
    },
    components: {
        VFootNav,
        VSearch,
        HomeSwipe,
        HomeGrid,
        HomeSticky,
        Hot,
        LimitTime,
    },
    mounted(){
        this.$store.commit('GET_SHOP_CARD_COUND');
    },
    methods:{
        tabChange(name){
            let thiz = this;
            this.currentModule = name;
            this.$nextTick(() => {
                if(name == 'limitTime'){
                    thiz.$refs['limitTimeRel'].getTodayFlash();
                }
            })
        },
        // 跳到领券中心
        getCoupon(){
            this.$router.push({ name: 'receive' })
        },
        btnShow(val){
            this.couponBtnShow = !val;
        }
    },
}
</script>

<style lang="scss" scoped>
    .home-index{
        .get-coupon{
            position: fixed;
            bottom: 100px;
            right: 10px;
            z-index: 9;
            >img{
                width: 34px;
                position: relative;
                z-index: 3;
            }
            >div{
                height: 14px;
                line-height: 16px;
                background: linear-gradient(#c898fc , #7f1eff);
                border-radius: 0 0 4px 4px;
                text-align: center;
                color: #fff;
                font-size: 8px;
                margin-top: -6px;
                position: relative;
                z-index: 1;
            }
            &::after{
                content: '';
                position: absolute;
                left: 5px;
                top: 10px;
                background: #fff;
                width: 24px;
                height: 20px;
                z-index: 2;
            }
        }
    }
</style>
