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
            formInline: {
                status: '',
                offset: 0,
                limit: 20
            },
            tabActive: '',
            tabList: [
                {name: '全部订单',type: ''},
                {name: '待付款',type: 0},
                {name: '待收货',type: 2},
                {name: '待评价',type: 3}
            ],
            orderList: []
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
            this.getOrderList(type);
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
            this.getOrderList(type);
        },
        // 分页获取订单
        getOrderList(type){
            this.formInline.status = type;
            this.$api.order.getOrderList(this.formInline).then(res => {
                this.orderList = res.data.data.list;
            }).catch(e => {
                console.log(e)
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