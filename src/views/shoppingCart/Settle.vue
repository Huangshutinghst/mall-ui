<!-- 结算页面 -->
<template>
    <div class="settle-index panel__hidden">
        <VHeader title="订单配送至"></VHeader>

        <div class="panel__content">
            <!-- 1.顶部模块 -->
            <div class="settle-index__top" @click="addressChoose()">
                <h5>
                    {{ myAddress.address }}
                </h5>
                <p>{{ myAddress.name }}
                    <span v-if="myAddress.sex === 1">(先生)</span>
                    <span v-if="myAddress.sex === 2">(女士)</span>
                    {{ myAddress.phone }}
                </p>
                <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
            </div>

            <!-- 2.中间滚动区域 -->
            <div class="settle-index__content">
                <div class="panel__scroll">
                    <!-- 送达时间模块 -->
                    <div class="settle-index__time __item bg_fff">
                        <h5 @click="timeChoose()">
                            送达时间
                            <i class="fr van-icon van-icon-arrow van-cell__right-icon"></i>
                            <span class="fr text">尽快送达</span>
                        </h5>
                    </div>

                    <!-- 优惠券模块 -->
                    <div v-if="canUseCoupon" class="settle-index__coupon __item bg_fff">
                        <h5 @click="couponChoose()">
                            优惠券
                            <i class="fr van-icon van-icon-arrow van-cell__right-icon"></i>
                            <span class="fr text" >
                                <span v-if="order.couponId === undefined">
                                    <span v-if="orderWithCoupon.can.length === 0">暂无优惠券可用</span>
                                    <span v-else="orderWithCoupon.can.length > 0">{{ orderWithCoupon.can.length }}张可用</span>
                                </span>
                                <span v-else style="color:red">-￥{{ order.couponPrice }}</span>
                        </span>
                        </h5>
                    </div>

                    <!-- 支付方式模块 -->
                    <div class="settle-index__pay __item bg_fff">
                        <h5>支付方式</h5>
                        <van-radio-group v-model="payRadio" class="__group">
                            <van-cell-group>
                                <van-cell label="支付宝沙箱账号：jopdhq0178@sandbox.com 账号/支付密码：111111 (沙箱环境会进行维护，期间可能出现不可用，敬请谅解。)">
                                    <template #title>
                                        支付宝支付
                                    </template>
                                    <template #right-icon>
                                        <van-radio @click="radio = '1'" name="1" />
                                    </template>
                                </van-cell>
                                <van-cell>
                                    <template #title>
                                        微信支付
                                    </template>
                                    <template #right-icon>
                                        <van-radio @click="radio = '2'" name="2" disabled />
                                    </template>
                                </van-cell>
                            </van-cell-group>
                        </van-radio-group>
                    </div>

                    <!-- 备注模块 -->
                    <div class="settle-index__remark __item bg_fff">
                        <h5>备注</h5>
                        <van-field
                                v-model="remark"
                                rows="2"
                                autosize
                                type="textarea"
                                maxlength="100"
                                placeholder="输入备注信息"
                        />
                        <ul>
                            <li v-for="(item, index) in remarkList" :key="index" @click="handleRemark(item)">{{item}}</li>
                        </ul>
                    </div>

                    <!-- 商品列表模块 -->
                    <div class="settle-index__shoplist __item bg_fff">
                        <VShoplist :list="productList" :total="productTotal" :title="'商品'" :bold="false"></VShoplist>
                    </div>

                    <!-- 总价模块 -->
                    <div class="settle-index__price __item bg_fff">
                        <VPrice :shopPrice="order.productPrice"
                                :deliveryPrice="order.deliveryPrice"
                                :allPrice="order.totalPrice"
                                :couponPrice="order.couponPrice"
                        ></VPrice>
                    </div>

                    <!-- 号码保护模块 -->
                    <!-- <div class="settle-index__telephone __item bg_fff"></div> -->
                </div>
            </div>

            <!-- 3.底部支付 -->
            <div class="settle-index__foot bg_fff">
                应付<span>￥{{ order.totalPrice }}</span>
                <div class="fr btn_bg" @click="pay()">去支付</div>
            </div>
        </div>

        <!-- 选择时间组件 -->
        <TimeChoosePop
                :modal="timeModal"
                @visible-change="(val) => timeModal = val"
        ></TimeChoosePop>

        <!-- 选择优惠券组件 -->
        <CouponPop
                :modal="couponPopShow"
                :couponList="orderWithCoupon"
                @choose="couponChooseReturn"
                @visible-change="(val) => {this.couponPopShow = val}"
        ></CouponPop>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import VPrice from '../../components/price/VPrice'
import VShoplist from '../../components/shoplist/VShoplist'
import TimeChoosePop from './settle/TimeChoosePop'
import CouponPop from './settle/CouponPop'
export default {
    data () {
        return {
            myAddress: {},
            remark: '',
            payRadio: '1',
            timeModal: false,
            remarkList: [
                '预约订单，请准时送达！不早不迟！',
                '电话联系不上时，请直接帮我把商品放自提点自取。',
                '快到的时候，请提前电话联系我；谢谢',
                '保护环境，生鲜商品无需使用塑料袋隔离',
            ],
            productList: [],
            productTotal: 0,
            canUseCoupon: false,
            order: {
                productPrice: '0.00',
                deliveryPrice: '0.00',
                couponPrice: null,
                totalPrice: '0.00'
            },
            orderWithCoupon: {
                can: [],
                cannot: []
            },
            cartIdList: [],
            couponPopShow: false,
        }
    },
    components: {
        VHeader,
        VPrice,
        VShoplist,
        TimeChoosePop,
        CouponPop
    },
    methods:{
        // 地址选择
        addressChoose(){
            this.$router.replace({ name:'myAddress',query:{choose:true, formShop: true} })
        },
        // 时间选择
        timeChoose(){
            this.Util.tip('目前暂未支持自选时间');
            //this.timeModal = true;
        },
        // 优惠券选择
        couponChoose() {
            this.couponPopShow = true;
        },
        // 快捷备注
        handleRemark(text){
            this.remark = this.remark + text + '；'
        },
        // 优惠券选择返回
        couponChooseReturn (couponObj) {
            this.order = {
                couponId: couponObj.couponId,
                productPrice: couponObj.orderVo.productPrice,
                deliveryPrice: couponObj.orderVo.deliveryPrice,
                couponPrice: couponObj.orderVo.couponPrice,
                totalPrice: couponObj.orderVo.totalPrice
            }
        },
        // 去支付
        pay(){
            const _this = this
            _this.order.addressId = _this.myAddress.addressId
            const order = {
                addressId: _this.myAddress.addressId,
                expectTime: '尽快送达',
                couponId: _this.order.couponId,
                payType: _this.payRadio,
                remark: _this.remark,
                cartIdList: [..._this.cartIdList]
            }
            _this.$api.shoppingCart.generateOrder(order).then((res) => {
                // 清空购物车vuex数据
                this.$store.commit('CHANGE_CHECKED', [])
                this.$store.commit('CHANGE_CHECKED_ALL', false);
                this.$store.commit('GET_SHOP_CARD_COUND');

                const div = document.createElement('div')
                div.innerHTML = res.data
                document.body.appendChild(div)
                document.forms[0].submit()
            }).catch(e => {
                console.log(e)
            })
        }
    },
    mounted() {
        const _this = this
        if(_this.$store.state.currentAddress != undefined){
            _this.myAddress = _this.$store.state.currentAddress;
        }else{
            _this.$router.push({ name: 'shoppingCart' });
        }
        let productTotal = 0;
        _this.cartIdList = []
        const shopCheckedList = [..._this.$store.state.shopCheckedList]
        if (shopCheckedList.length === 0) {
            this.$router.push({ name: 'shoppingCart' })
        } else {
            shopCheckedList.forEach(item => {
                productTotal += item.cartVo.quantity
                item.quantity = item.cartVo.quantity
                item.price = item.currentPrice
                _this.productList.push(item)
                _this.cartIdList.push(item.cartVo.cartId)
            })
            _this.productTotal = productTotal

            // 获取价格
            _this.$api.shoppingCart.calculate({
                cartIdList: _this.cartIdList.join(',')
            }).then(res => {
                const order = res.data.data
                _this.order = {
                    productPrice: order.productPrice,
                    deliveryPrice: order.deliveryPrice,
                    couponPrice: order.couponPrice,
                    totalPrice: order.totalPrice
                }
            }).catch(e => {
                console.log(e)
            })

            // 是否能使用优惠券
            _this.$api.shoppingCart.canUseCoupon().then(res => {
                _this.canUseCoupon = res.data.data
                // 能使用优惠券
                if (_this.canUseCoupon) {
                    this.$api.shoppingCart.calculateWithCoupon({
                        cartIdList: _this.cartIdList.join(',')
                    }).then(res => {
                        _this.orderWithCoupon = res.data.data
                    }).catch(e => {
                        console.log(e)
                    })
                }
            }).catch(e => {
                console.log(e)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .settle-index{
        // 头部
        .settle-index__top{
            height: 65px;
            background: #0db059;
            color: #fff;
            position: relative;
            >h5{
                font-size: 16px;
                font-weight: 400;
                padding: 0 30px;
                text-align: center;
                height: 35px;
                line-height: 35px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            >p{
                font-size: 14px;
                text-align: center;
            }
            >i{
                position: absolute;
                top: 50%;
                right: 15px;
                color: #fff;
                transform: translateY(-50%);
            }
        }

        // 底部支付
        .settle-index__foot{
            height: 40px;
            line-height: 40px;
            border-top: 1px solid #eee;
            padding-left: 15px;;
            >span{
                font-size: 16px;
                color: #ff6f00;
            }
            >.fr{
                width: 100px;
                height: 100%;
                text-align: center;
                color: #fff;
                font-size: 14px;
            }
        }

        // 中间滚动区域
        .settle-index__content{
            height: calc(100% - 105px);
            .__item{
                margin-bottom: 10px;
                font-size: 14px;
                padding: 0 15px;
                >h5{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    font-weight: bold;
                }
            }

            .settle-index__time{
                margin-top: 10px;
                >h5{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    font-weight: bold;
                    >span{
                        font-size: 12px;
                        font-weight: normal;
                        color: #999;
                    }
                    >i{
                        margin-top: 8px;
                        font-size: 12px;
                    }
                }
            }

            .settle-index__coupon{
                margin-top: 10px;
                >h5{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    font-weight: bold;
                    >span{
                        font-size: 12px;
                        font-weight: normal;
                        color: #999;
                    }
                    >i{
                        margin-top: 8px;
                        font-size: 12px;
                    }
                }
            }

            .settle-index__remark{
                .van-field{
                    padding: 0 0 16px;
                }
                >ul{
                    font-size: 0;
                    >li{
                        font-size: 12px;
                        display: inline-block;
                        height: 20px;
                        line-height: 20px;
                        color: #999;
                        background: #f5f5f5;
                        padding: 0 8px;
                        margin: 0 8px 12px 0;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .settle-index{
        .settle-index__content{
            .settle-index__pay{
                >.__group{
                    .van-cell{
                        padding-right: 0;
                        padding-left: 0;
                        &::after{
                            right: 0;
                            left: 0;
                        }
                    }
                }
            }
            .settle-index__remark{
                .van-cell::after{
                    display: none;
                }
            }
        }
        .van-radio__icon--checked .van-icon{
            background-color: #0db059;
            border-color: #0db059;
        }
    }
</style>
