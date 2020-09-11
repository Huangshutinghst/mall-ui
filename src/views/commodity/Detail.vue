<!-- 商品详情页 -->
<template>
    <div class="commodity-detail panel__hidden">
        <!-- 1.header -->
        <VHeader title="详情页" leftText="">
            <div slot="left" @click.stop="goBack()">
                <van-icon class="left-icon" name="arrow-left" />
            </div>
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
                    ￥{{ obj.currentPrice }}
                    <s>{{ obj.originalPrice }}</s>
                </h5>
                <!-- 新品/冷藏/3.1折 -->
                <p class="tag">
                    <font v-show="obj.discountStr" class="red">{{ obj.discountStr }}折</font>
                    <font v-show="obj.newStatus == 1" class="blue">新品</font>
                    <!-- <font class="purple">网红推荐</font> -->
                </p>
                <h5 class="title">{{ obj.productName }}</h5>
                <p class="text">{{ obj.desc }}</p>
                <!-- <p class="text blue">今天上市</p> -->
                <p class="address">
                    <van-icon name="bag-o" />{{ obj.format }}，
                    <van-icon name="bag-o" />{{ obj.storage }}，
                    <van-icon name="location-o" />{{ obj.origin }}
                </p>
            </div>
            <!-- 可用优惠券 -->
            <div v-if="obj.couponVoList && obj.couponVoList.length > 0" class="__counpon bg_fff" @click="showCouponPopup">
                <span class="text1">领券</span>
                <span class="text2" style="border: 1px solid #0db059;">满{{ Number(obj.couponVoList[0].minPrice).toFixed(0) }}减{{ Number(obj.couponVoList[0].discount).toFixed(0) }}</span>
                <van-icon class="fr" name="arrow" />
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
        <CouponPop 
                :modal="couponPopShow" 
                :couponList="obj.couponVoList"
                @openProductList="openProductList"
                @visible-change="(val) => {this.couponPopShow = val}"
        ></CouponPop>
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
import VShare from '../../components/share/VShare'
import CouponPop from './CouponPop'
import ProductList from '../couponlist/Index'
export default {
    props: {
        productId: Number
    },
    data () {
        return {
            obj: {},
            shareModal: false,
            currentImage: 0,
            images: [],
            imageList: [],
            couponPopShow: false,
            productListModal: false,
            couponObj: {},
        }
    },
    components: {
        VHeader,
        VShare,
        CouponPop,
        ProductList
    },
    mounted() {
        this.getCommodityDetail();
    },
    methods:{
        // 获取商品详情
        getCommodityDetail() {
            this.$api.commodity.getCommodityDetail(this.productId).then(res => {
                this.obj = res.data.data;
                this.images.push(this.$api.img + this.obj.pic);
                this.imageList.push(this.$api.img + this.obj.pic);
            }).catch(e => {
                console.log(e)
            })
        },
        // 分享商品
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

        goBack() {
            this.$emit('close', false);
        },
        // 打开优惠券领取弹窗
        showCouponPopup() {
            this.couponPopShow = true;
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
    .commodity-detail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: rgba(245, 247, 249, 1);
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

            >.__counpon{
                height: 40px;
                line-height: 40px;
                margin-bottom: 10px;
                padding: 0 15px;
                >.text1{
                    display: inline-block;
                    margin-right: 6px;
                    height: 18px;
                    line-height: 18px;
                    background: #0db059;
                    color: #fff;
                    font-size: 9px;
                    vertical-align: middle;
                    padding: 0 4px;
                    position: relative;
                    &::after, &::before{
                        content: '';
                        position: absolute;
                        top: 50%;
                        width: 4px;
                        height: 4px;
                        margin-top: -2px;
                        border-radius: 100%;
                        background: #fff;
                    }
                    &::after{
                        left: -2px;
                    }
                    &::before{
                        right: -2px;
                    }
                }
                >.text2{
                    display: inline-block;
                    height: 18px;
                    line-height: 18px;
                    color: #0db059;
                    font-size: 12px;
                    vertical-align: middle;
                    padding: 0 6px;
                    border-radius: 1px;
                }
                >i{
                    font-size: 14px;
                    padding: 12px 0;
                    font-weight: normal;
                    color: #969799;
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
                        margin: 0;
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

        .product-list{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background: rgba(245, 247, 249, 1);
        }
    }
</style>
