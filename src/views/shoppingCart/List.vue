<template>
    <div class="shopping-index-componnet panel__hidden">
            <!-- 头部 -->
            <VHeader title="购物车" leftText="" :leftArrow="leftArrow">
                <div slot="right" @click="handleClearAll()">
                    清空
                </div>
            </VHeader>

            <!-- 列表 -->
            <ul class="shopping-index__list panel__content--fistlevel panel__scroll">
                <!-- 商品卡片 -->
                <li class="__item bg_fff" v-for="(item, index) in goodlist" :key="index">
                    <van-checkbox class="__checkbox fl" v-model="item.checked"></van-checkbox>
                    <div class="__card">
                        <Card :cardInfo="item" :index="index"></Card>
                    </div>
                    <!-- 删除按钮 -->
                    <van-icon class="btn-delete" name="cross" @click="deleteItem(item.cartId, item.productId, index)" />
                </li>
            </ul>

            <!-- 提交订单栏 -->
            <div class="shopping-index__submit-bar flex bg_fff">
                <div class="flex flex-1 flex-pack-justify">
                    <div class="check">
                        <van-checkbox class="__checkbox fl" v-model="checkedAll"></van-checkbox>
                        {{checkedAll?'已选（1）':'全选'}}
                    </div>
                    <div class="price">
                        ￥18.80
                    </div>
                </div>
                <div class="btn btn_bg" @click="handleSubmit()">
                    去结算
                </div>
            </div>
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
            formInline: {
                offset: 0,
                limit: 20
            },
            goodlist: [],
            checkedAll: false
        }
    },
    components: {
        VHeader,
        Card,
    },
    mounted() {
        this.getCartList();
    },
    methods:{
        // 获取购物车商品
        getCartList() {
            this.$api.shoppingCart.getCartList(this.formInline).then(res => {
                this.goodlist = res.data.data.list;
            }).catch(e => {
                console.log(e)
            })
        },
        // 清空
        handleClearAll(){
            this.$api.shoppingCart.cartClear().then(res => {
                this.goodlist = [];
            }).catch(e => {
                console.log(e)
            })
        },
        // 删除商品
        deleteItem(cartId, productId, index){
            this.$api.shoppingCart.cartAdd({
                cartId: cartId,
                productId: productId,
                quantity: 0
            }).then(res => {
                this.goodlist.splice(index, 1);
            }).catch(e => {
                console.log(e)
            })
        },
        // 去结算
        handleSubmit(){
            var thiz = this;
            thiz.$router.push({ name: 'settle' });
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
    }
</style>