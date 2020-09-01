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
            <h5 @click="handleUserInfo()">
                胖大喵
                <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
            </h5>
            <div class="pot pot--1"></div>
            <div class="pot pot--2"></div>
            <div class="pot pot--3"></div>
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
        // 修改信息
        handleUserInfo(){
            
        }
    },
}
</script>

<style lang="scss" scoped>
    .mine-index{
        .__head{
            height: 110px;
            padding: 30px 20px 20px;
            position: relative;
            background: #0db059;
            .van-image{
                width: 60px !important;
                height: 60px !important;
                position: absolute;
                top: 30px;
                left: 20px;
                z-index: 1;
            }
            h5{
                position: relative;
                height: 60px;
                line-height: 60px;
                margin-left: 70px;
                font-size: 15px;
                font-weight: bold;
                color: #fff;
                z-index: 1;
                >.van-icon{
                    font-size: 16px;
                    color: #fff;
                    vertical-align: middle;
                    margin-top: -2px;
                }
            }
            &::after{
                content: '';
                z-index: 0;
                width: 100%;
                height: 100%;
                background: #0db059;
                position: absolute;
                top: 50%;
                left: 0;
                margin-top: -10px;
                border-radius: 100%;
                transform: scale(1.2);
            }
            >.pot{
                position: absolute;
                z-index: 1;
                pointer-events: none;
                border-radius: 100%;
                border: 1px solid rgba(255, 255, 255, 0.15);
                &.pot--1{
                    width: 30px;
                    height: 30px;
                    top: 10px;
                    left: -6px;
                    background: rgba(255, 255, 255, 0.02);
                }
                &.pot--2{
                    width: 140px;
                    height: 140px;
                    top: -60px;
                    right: -20px;
                }
                &.pot--3{
                    width: 70px;
                    height: 70px;
                    top: 30px;
                    right: -25px;
                    background: rgba(255, 255, 255, 0.06);
                }
            }
        }

        .__order{
            position: relative;
            margin: 0 20px 10px;
            border-radius: 8px;
            background: #fff;
            overflow: hidden;
            z-index: 1;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.02);
            .__order__grid{
                border: none;
            }
        }

        .__mine{
            border-radius: 8px;
            margin: 0 20px;
            overflow: hidden;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.02);
            .__cellbox{
                border: none;
                .van-cell{
                    padding: 8px 16px;
                    .van-cell__title>span{
                        font-size: 12px ;
                    }
                    .van-icon{
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .__order__grid{
        &::after{
            display: none;
        }
        .van-grid-item__content{
            padding: 8px 10px;
            &::after{
                display: none;
            }
        }
    }
    // .__cellbox{
    //     .van-cell::after{
    //         left: 0 !important;
    //         right: 0 !important;
    //     }
    // }
</style>