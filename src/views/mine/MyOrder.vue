<!-- 我的订单 -->
<template>
    <div class="mall-order panel__hidden">
        <VHeader title="" leftText="我的订单">
            <van-icon slot="right" @click="search()" name="search" />
        </VHeader>

        <van-tabs v-model="tabActive" class="__tabs" :before-change="beforeChange">
            <van-tab v-for="item in tabList" :title="item.name" :key="item.type" :name="item.type"></van-tab>
        </van-tabs>
        
        <div class="panel__scroll panel__content">
            <!-- 订单列表 -->
            <OrderListPanel v-if="orderList.length > 0" :orderList="orderList"></OrderListPanel>
            <VBlank v-else text="您没有该类型的订单"></VBlank>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import OrderListPanel from './order/OrderList'
export default {
    inject: ['reload'],
    data () {
        return {
            tabActive: 'qb',
            tabList: [
                {name: '全部订单',type: 'qb'},
                {name: '待付款',type: 'dzf'},
                {name: '待收货',type: 'dsh'},
                {name: '待评价',type: 'dpj'}
            ],
            orderList: [
                {},{},{},{}
            ]
        }
    },
    components: {
        VHeader,
        OrderListPanel,
    },
    mounted(){
        this.loadTabActive();
    },
    methods:{
        loadTabActive(){
            let type = this.$route.query.type;
            this.tabActive = type;
        },
        beforeChange(type){
            this.tabActive = type;
            //刷新地址栏路由  不刷新页面
            this.$router.replace({
                name: "myOrder",
                query: {
                    type: type
                }
            })
        },
        search(){
            this.$router.push({ name: 'orderSearch'})
        }
    },
}
</script>

<style lang="scss" scoped>
    .mall-order{
        >.__tabs{
            height: 30px;
            border-bottom: 1px solid #eee;
        }
        >.panel__content{
            height: calc(100% - 70px) !important;
            padding-bottom: 4px;
        }
    }
</style>

<style lang="scss">
    .mall-order{
        >.__tabs{
            >.van-tabs__wrap{
                height: 100%;
            }
            .van-tab--active{
                span{
                    font-weight: bold;
                }
            }
            .van-tabs__line{
                width: 30px !important;
                background: #0db059;
            }
        }
    }
</style>