<template>
    <div class="shopping-index-componnet panel__hidden">
            <!-- 头部 -->
            <VHeader title="购物车" leftText="" :leftArrow="leftArrow">
                <div slot="right">
                    <img @click="getCoupon()" src="../../images/coupon_btn.png">
                    <p v-if="goodlist.length > 0" @click="handleClearAll()">清空</p>
                </div>
            </VHeader>

            <!-- 列表 -->
            <ul ref="scroll" v-show="goodlist.length > 0" class="shopping-index__list panel__content--fistlevel panel__scroll">
                <!-- 商品卡片 -->
                <li class="__item bg_fff" v-for="(item, index) in goodlist" :key="`${item.cartVo.cartId}||${index}`">
                    <van-checkbox class="__checkbox fl" v-model="item.checked" @change="val => checkChange(val, item)"></van-checkbox>
                    <div class="__card">
                        <Card 
                            :cardInfo="item" 
                            :index="`${item.cartVo.cartId}||${index}`"
                            @count-change="countChange"    
                        ></Card>
                    </div>
                    <!-- 删除按钮 -->
                    <van-icon class="btn-delete" name="cross" @click="deleteItem(item.cartVo.cartId, item.productId, index)" />
                </li>
            </ul>

            <!-- 提交订单栏 -->
            <div v-if="goodlist.length > 0" class="shopping-index__submit-bar flex bg_fff">
                <div class="flex flex-1 flex-pack-justify">
                    <div class="check">
                        <van-checkbox class="__checkbox fl" v-model="checkedAll" @change="checkAllChange"></van-checkbox>
                        {{!checkedAll&&this.checkedList.length==0?'全选':'已选（'+ this.checkedList.length +'）'}}
                    </div>
                    <div class="price">
                        ￥{{productPrice}}
                    </div>
                </div>
                <div class="btn btn_bg" @click="handleSubmit()">
                    去结算
                </div>
            </div>

            <VBlank v-if="goodlist.length == 0" text="您还没有添加商品哦~"></VBlank>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import Card from '../card/CardCart';
export default {
    props:{
        leftArrow:{
            type:Boolean,
            default:true
        }
    },
    data () {
        return {
            goodlist: [],
            checkedList: [],
            checkedAll: false,
            handleFlag: false,
            handleAllFlag: false,
            productPrice: '0.00',
        }
    },
    components: {
        VHeader,
        Card,
    },
    beforeRouteLeave(to, from, next){
        const { name } = to;
        // name == 'shoppingCartDetail' 这块跳转后续要再加判断处理一下
        if (name == 'myAddress' || name == 'settle' || name == 'receive') {
            from.meta.keepAlive = true;
            from.meta.scrollPos = { x: this.$refs['scroll'].scrollTop, y: 0 }
        } else {
            from.meta.keepAlive = false;
            from.meta.scrollPos = { x: 0, y: 0 };
        }
        next();
    },
    beforeRouteEnter(to, from, next){
        next((vm) => {
            vm.$refs['scroll'].scrollTop = vm.$route.meta.scrollPos.x;
        })
    },
    mounted() {
        this.getCartList();
    },
    methods:{
        scroll(x){
            this.$refs['scroll'].scrollTop = x;
        },
        getScrollTop(){
            return this.$refs['scroll'].scrollTop;
        },
        // 获取购物车商品
        getCartList() {
            var _this = this;
            this.$api.shoppingCart.getCartList().then(res => {
                this.goodlist = res.data.data;
                this.checkedList = this.$store.state.shopCheckedList;
                this.checkedAll = this.$store.state.shopCheckedAll;
                if(this.checkedAll){
                    this.goodlist.forEach(el => {
                        _this.$set(el, 'checked', true);
                    })
                    this.checkedList = _this.goodlist;
                    this.$store.commit('CHANGE_CHECKED', this.checkedList);
                }else{
                    this.goodlist.forEach(el => {
                        _this.$set(el, 'checked', false);
                        _this.$store.state.shopCheckedList.forEach(val => {
                            if(val.cartVo.cartId == el.cartVo.cartId){
                                _this.$set(el, 'checked', true);
                            }
                        })
                    })
                }
                
                this.calculate();
            }).catch(e => {
                console.log(e)
            })
        },
        // 勾选商品
        checkChange(val, item){
            // console.log('触发1')
            // if(this.handleAllFlag) return;
            this.handleFlag = false;
            if(val){
                this.checkedList.push(item);
            }else{
                this.checkedList = this.checkedList.filter(el => {
                    return el.cartVo.cartId !== item.cartVo.cartId;
                })
            }
            // console.log('触发2')
            // 去重
            var obj = {}, obj2 = {};
            this.checkedList = this.checkedList.reduce(function(item, next) {
                obj[next.productId] ? '' : obj[next.productId] = true && item.push(next);
                return item;
            }, []);
            this.goodlist = this.goodlist.reduce(function(item, next) {
                obj2[next.productId] ? '' : obj2[next.productId] = true && item.push(next);
                return item;
            }, []);
            this.calculate();
            this.$store.commit('CHANGE_CHECKED', this.checkedList)
            if(this.checkedList.length == this.goodlist.length){
                if(this.checkedAll) return;
                this.checkedAll = true;
                this.handleFlag = true;
                this.$store.commit('CHANGE_CHECKED_ALL', this.checkedAll);
            }else{
                if(!this.checkedAll) return;
                this.checkedAll = false;
                this.handleFlag = true;
                this.$store.commit('CHANGE_CHECKED_ALL', this.checkedAll);
            }
        },
        // 全选
        checkAllChange(val){
            // console.log('触发全选1')
            var _this = this;
            if(this.handleFlag){
                this.handleFlag = false;
                return
            }
            // this.handleAllFlag = true;
            // console.log('触发全选2')
            if(val){
                this.goodlist.forEach(el => {
                    _this.$set(el, 'checked', true);
                })
                _this.checkedList = this.goodlist;
                _this.$store.commit('CHANGE_CHECKED', this.checkedList);
                this.calculate();
            }else{
                this.goodlist.forEach(el => {
                    _this.$set(el, 'checked', false);
                })
                _this.checkedList = [];
                _this.$store.commit('CHANGE_CHECKED', []);
            }
            this.$store.commit('CHANGE_CHECKED_ALL', val);
        },
        // 计算商品价格
        calculate() {
            if(this.checkedList.length == 0) {
                this.productPrice = '0.00'
                return
            };
            // 前端计算
            let price = 0;
            this.checkedList.forEach(el => {
                price = price + el.cartVo.quantity * Number(el.currentPrice)
            })
            this.productPrice = price.toFixed(2) + '';
            // 后端计算
            // let cartIdList = [];
            // this.checkedList.forEach(el => {
            //     cartIdList.push(el.cartVo.cartId)
            // })
            // this.$api.shoppingCart.calculate({
            //     cartIdList: cartIdList.join(',')
            // }).then(res => {
            //     this.productPrice = res.data.data.productPrice;
            // }).catch(e => {
            //     console.log(e)
            // })
        },
        //商品数量发生变化
        countChange(productId, count){
            let _this = this;
            _this.goodlist.forEach(el => {
                if(el.productId == productId){
                    el.cartVo.quantity = count;
                }
            })
            _this.checkedList.forEach(el => {
                if(el.productId == productId){
                    el.cartVo.quantity = count;
                }
            })
            _this.$store.commit('CHANGE_CHECKED', _this.checkedList)
            _this.calculate();
        },
        // 清空
        handleClearAll(){
            this.$dialog.confirm({
                title: '',
                message: '您确定要清空购物车吗？',
                confirmButtonText: '确定'
            })
            .then(() => {
                // on confirm
                this.$api.shoppingCart.cartClear().then(res => {
                    this.goodlist = [];
                    this.$store.commit('GET_SHOP_CARD_COUND');
                    this.$store.commit('CHANGE_CHECKED', []);
                    this.$store.commit('CHANGE_CHECKED_ALL', false);
                    this.productPrice = '0.00';
                }).catch(e => {
                    console.log(e)
                })
            })
            .catch(() => {
                // on cancel
            });
        },
        // 删除商品
        deleteItem(cartId, productId, index){
            this.$api.shoppingCart.cartAdd({
                cartId: cartId,
                productId: productId,
                quantity: 0
            }).then(res => {
                this.goodlist.splice(index, 1);
                this.$store.commit('GET_SHOP_CARD_COUND');
                this.checkedList = this.checkedList.filter(el => {
                    return el.cartVo.cartId !== cartId;
                })
                this.$store.commit('CHANGE_CHECKED', this.checkedList);
                this.calculate();
                if(this.goodlist.length == 0 || this.checkedList.length == 0){
                    this.checkedAll = false
                    this.$store.commit('CHANGE_CHECKED_ALL', false);
                }else if(this.goodlist.length == this.checkedList.length){
                    this.checkedAll = true
                    this.$store.commit('CHANGE_CHECKED_ALL', true);
                }
            }).catch(e => {
                console.log(e)
            })
        },
        // 去结算
        handleSubmit(){
            var thiz = this;
            if (thiz.$store.state.shopCheckedList.length > 0) {
                // 判断缓存有没有默认地址
                if (thiz.$store.state.currentAddress != undefined) {
                    thiz.$router.push({ name: 'settle' });
                }else{
                    thiz.$router.push({ name: 'myAddress', query: {choose: true} });
                }
            } else {
                thiz.Util.tip('请先勾选商品');
            }
        },
        // 跳到领券中心
        getCoupon(){
            this.$router.push({ name: 'receive' })
        },
    },
}
</script>

<style lang="scss" scoped>
    .shopping-index-componnet{
        // 购物车列表
        .shopping-index__list{
            margin: 0 10px;
            .__item{
                width: calc(100% - 20px);
                position: relative;
                margin: 10px 0;
                border-radius: 8px;
                .__checkbox{
                    position: absolute;
                    top: 50%;
                    left: 12px;
                    margin-top: -10px;
                }
                .__card{
                   padding-left: 30px;
                }
                .btn-delete{
                    color: rgba(153, 153, 153, 0.6);
                    font-size: 15px;
                    position: absolute;
                    top: 12px;
                    right: 10px;
                }
            }
        }
        
        .shopping-index__submit-bar{
            height: 40px;
            line-height: 40px;
            border-top: 1px solid #eee;
            >.flex{
                padding: 0 12px;
                >.check{
                    font-size: 12px;
                    >.__checkbox{
                        margin-right: 4px;
                        padding: 11px 0;
                    }
                }
                >.price{
                    font-size: 16px;
                    color: #ff6f00;
                    font-weight: bold;
                }
            }
            >.btn{
                width: 100px;
                text-align: center;
                color: #fff;
                font-size: 14px;
            }
        }
    }
</style>

<style lang="scss">
    .shopping-index-componnet{
        .__checkbox {
            // 单选框
            .van-checkbox__icon {
                height: 16px;
                .van-icon{
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    &::before{
                        line-height: 16px;
                    }
                }
            }
            .van-checkbox__icon--checked .van-icon{
                background-color: #0db059;
                border-color: #0db059;
            }
        }
        .van-nav-bar__right{
            >div{
                >img{
                    display: inline-block;
                    width: 24px;
                    vertical-align: middle;
                }
                >p{
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 15px;
                }
            }
        }
    }
</style>