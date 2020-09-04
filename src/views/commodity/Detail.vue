<!-- 商品详情页 -->
<template>
    <div class="commodity-detail panel__hidden">
        <!-- 1.header -->
        <VHeader title="详情页" leftText="">
            <van-icon slot="right" name="share" @click="handleShare()" />
        </VHeader>

        <!-- 2.content -->
        <div class="commodity-detail__content panel__scroll">
            <!-- 轮播 -->
            <van-swipe :autoplay="3000" @change="onChangeImage">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" />
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator">
                    {{ currentImage + 1 }}/{{images.length}}
                    </div>
                </template>
            </van-swipe>
            <!-- 信息 -->
            <div class="__info bg_fff">
                <h5 class="price">
                    ￥16.9
                    <s>12.5</s>
                </h5>
                <!-- 新品/冷藏/3.1折 -->
                <p class="tag">
                    <font class="red">3.1折</font>
                    <font class="blue">新品</font>
                    <font class="purple">网红推荐</font>
                </p>
                <h5 class="title">商品名称</h5>
                <p class="text">商品介绍介绍</p>
                <p class="text blue">今天上市</p>
                <p class="address">
                    <van-icon name="bag-o" />200ml*6，
                    <van-icon name="bag-o" />常温，
                    <van-icon name="location-o" />上海
                </p>
            </div>
            <!-- 详情 -->
            <div class="__detail bg_fff">
                <h5>
                    <van-divider>详情</van-divider>
                </h5>
                <img v-for="img in imageList" v-lazy="img" />
            </div>
        </div>

        <!-- 3.foot -->
        <div class="commodity-detail__foot bg_fff">
            <div class="btn" @click="handleLike()">
                <van-icon name="like-o" />
                <p>收藏</p>
            </div>
            <div class="btn cart" @click="handleCart()">
                <van-icon name="shopping-cart-o" />
                <p>购物车</p>
                <span>2</span>
            </div>
            <!-- 加入购物车/立即抢 -->
            <div class="fr btn_bg" @click="handleAdd()">加入购物车</div>
        </div>


        <VShare :modal="shareModal" :title="'分享商品'" @visible-change="(val) => shareModal = val"></VShare>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import VShare from '../../components/share/VShare'
export default {
    data () {
        return {
            shareModal: false,
            currentImage: 0,
            images: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
            ],
            imageList: [
                'https://img.yzcdn.cn/vant/apple-1.jpg',
                'https://img.yzcdn.cn/vant/apple-2.jpg',
            ]
        }
    },
    components: {
        VHeader,
        VShare,
    },
    methods:{
        handleShare(){
            this.shareModal = true;
        },
        // 轮播切换
        onChangeImage(index){
            this.currentImage = index;
        },
        // 收藏
        handleLike(){

        },
        // 购物车
        handleCart(){
            this.$router.push({ name: 'shoppingCartList' })
        },
        // 加入购物车/立即抢
        handleAdd(){

        },
    },
}
</script>

<style lang="scss" scoped>
    .commodity-detail{
        .commodity-detail__content{
            height: calc(100% - 80px);
            >.van-swipe{
                height: 250px;
                .custom-indicator {
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                    padding: 2px 8px 0 10px;
                    font-size: 12px;
                    border-radius: 10px 0 0 10px;
                    color: #666;
                    background: rgba(0, 0, 0, 0.1);
                }
            }

            >.__info{
                padding: 6px 15px;
                margin-bottom: 10px;
                >.price{
                    height: 46px;
                    line-height: 46px;
                    color: #ff6f00;
                    font-size: 26px;
                    font-weight: bold;
                    >s{
                        color: rgba(153, 153, 153, 0.6);
                        font-size: 13px;
                    }
                }
                >.tag{
                    >font{
                        font-size: 10px;
                        padding-right: 4px;
                        vertical-align: middle;
                        &.blue{
                            color: #3698fb;
                        }
                        &.red{
                            color: #ee0a24;
                        }
                        &.purple{
                            color: #5030c0;
                        }
                    }
                }
                >.title{
                    line-height: 26px;
                    font-size: 16px;
                    font-weight: bold;
                }
                >.text{
                    line-height: 22px;
                    font-size: 14px;
                    &.blue{
                        color: #3698fb;
                    }
                }
                >.address{
                    font-size: 12px;
                    color: rgba(153, 153, 153, 0.6);
                    vertical-align: middle;
                    padding: 8px 0;
                    >i{
                        font-size: 16px;
                        vertical-align: middle;
                        margin-top: -4px;
                    }
                }
            }

            >.__detail{
                padding-bottom: 40px;
                >h5{
                    height: 40px;
                    line-height: 40px;
                    padding: 0 20%;
                    font-size: 14px;
                    >.van-divider{
                        color: #333 !important;
                        line-height: 40px;
                    }
                }
            }
        }

        .commodity-detail__foot{
            height: 40px;
            padding-left: 5px;
            >.btn{
                display: inline-block;
                vertical-align: top;
                text-align: center;
                padding: 4px 15px;
                >i{
                    font-size: 16px;
                }
                >p{
                    font-size: 12px;
                    margin-top: -2px;
                    transform: scale(0.8);
                }
                &.cart{
                    position: relative;
                    >span{
                        display: block;
                        position: absolute;
                        top: 4px;
                        right: 18px;
                        background: #ee0a24;
                        width: 12px;
                        height: 12px;
                        border-radius: 20px;
                        color: #fff;
                        font-size: 10px;
                    }
                }
            }
            >.fr{
                width: 240px;
                height: 100%;
                text-align: center;
                color: #fff;
                font-size: 14px;
                line-height: 40px;
            }
        }
    }
</style>
