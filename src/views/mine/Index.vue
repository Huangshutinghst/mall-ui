<!-- 我的 -->
<template>
    <div class="mine-index panel__content--mine">
        <!-- 头像 -->
        <div class="__head">
            <van-image
                round
                width="1.8rem"
                height="1.8rem"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <h5 @click="text">胖大喵</h5>
        </div>

        <!-- 订单管理 -->
        <div class="__order">
            <van-grid class="__order__grid">
                <van-grid-item icon="photo-o" text="待支付" :to="{name:'myOrder', query: {type:'dzf'}}" />
                <van-grid-item icon="photo-o" text="待收货" :to="{name:'myOrder', query: {type:'dsh'}}" />
                <van-grid-item icon="photo-o" text="待评价" :to="{name:'myOrder', query: {type:'dpj'}}" />
                <van-grid-item icon="photo-o" text="全部订单" :to="{name:'myOrder', query: {type:'qb'}}" />
            </van-grid>
        </div>

        <!-- 我的 -->
        <div class="__mine">
            <div class="__cellbox">
                <van-cell title="我的收藏" is-link to="myFavorites" />
                <!-- <van-cell title="我的足迹" is-link to="myfootprint" /> -->
                <van-cell title="地址管理" is-link to="myAddress" />
            </div>
        </div>

        <!-- 底部导航 -->
        <VFootNav active="mine"></VFootNav>
    </div>
</template>

<script type="text/ecmascript-6">
import VFootNav from '../../components/VFootNav';
export default {
    data () {
        return {

        }
    },
    components: {
        VFootNav,
    },
    methods:{
        text(){
            this.$store.dispatch('addFun', 10)
            console.log(this.$store.state.count)
        }
    },
}
</script>

<style lang="scss" scoped>
    .mine-index{
        .__head{
            height: 90px;
            padding: 20px 20px 0;
            position: relative;
            .van-image{
                position: absolute;
                top: 20px;
                left: 20px;
            }
            h5{
                margin-left: 80px;
                font-size: 14px;
            }
        }

        .__order{
            padding: 20px;
            .__order__grid{
                border: 1px solid #eee;
            }
        }

        .__mine{
            padding: 20px;
            .__cellbox{
                border: 1px solid #ebedf0;
            }
        }
    }
</style>

<style lang="scss">
    .__order__grid{
        &::after{
            display: none;
        }
        .van-grid-item__content::after{
            display: none;
        }
    }
    .__cellbox{
        .van-cell::after{
            left: 0 !important;
            right: 0 !important;
        }
    }
</style>