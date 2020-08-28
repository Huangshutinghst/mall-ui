<!-- 订单列表组件 -->
<template>
    <ul v-if="orderList.length > 0" class="order-list">
        <!-- 订单列表 -->
        <li class="order-list__item bg_fff" v-for="(item,index) in orderList" :key="index" @click="toOrderDetail()">
            <h5>
                订单已完成
                <span>2020-08-25 14:00</span>
                <i class="fr van-icon van-icon-arrow van-cell__right-icon"></i>
            </h5>
            <div class="__content">
                <!-- 商品列表 -->
                <div class="__info flex flex-pack-justify">
                    <van-image
                        class="__img"
                        fit="contain"
                        src=""
                    />
                    <p>
                        <span>大白菜</span>
                        <span class="fr">x1</span>
                    </p>
                </div>
                <div class="__info flex flex-pack-justify">
                    <van-image
                        class="__img"
                        fit="contain"
                        src=""
                    />
                    <p>
                        <span>大白菜</span>
                        <span class="fr">x1</span>
                    </p>
                </div>
                
                <div class="__price">
                    共1件,实付：<span>￥15</span>
                </div>
                <div class="__btn-box"></div>
            </div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        orderList: Array
    },
    data () {
        return {

        }
    },
    components: {

    },
    methods:{
        toOrderDetail(){
            this.$router.push({ name: 'orderDetail' });
        },
    },
}
</script>

<style lang="scss" scoped>
    .order-list{
        >.order-list__item{
            padding: 0 15px;
            &:not(:last-child){
                margin-bottom: 4px;
            }
            >h5{
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid rgba(238,238,238,0.8);
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
            >.__content{
                >.__info{
                    overflow: hidden;
                    padding: 6px 0;
                    >.__img{
                        width: 40px;
                        height: 40px;
                    }
                    >p{
                        width: calc(100% - 50px);
                        height: 40px;
                        line-height: 40px;
                    }
                }
                >.__price{
                    text-align: right;
                    height: 26px;
                    >span{
                        font-size: 16px;
                        color: #ff6f00;
                    }
                }
                >.__btn-box{}
            }
        }
    }
</style>
