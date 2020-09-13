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
            <OrderListPanel
                    v-if="orderList.length > 0"
                    :orderList="orderList"
                    :loading="loading"
                    :finished="finished"
                    @on-load="onLoadOrderList"
            ></OrderListPanel>
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
                limit: 10
            },
            tabActive: '',
            tabList: [
                {name: '全部订单',type: ''},
                {name: '待付款',type: 0},
                {name: '待收货',type: 2},
                {name: '待评价',type: 3}
            ],
            orderList: [],
            loading: false,
            finished: false
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
            this.clearPage()
            this.onLoadOrderList()
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
            this.clearPage()
            this.onLoadOrderList()
        },
        search(){
            this.$router.push({ name: 'orderSearch'})
        },
        // 分页获取订单
        onLoadOrderList () {
            const _this = this
            _this.loading = true;
            this.formInline.status = this.tabActive;
            _this.$api.order.getOrderList(_this.formInline).then(res => {
                _this.loading = false;
                if (res.data.data.list.length === 0) {
                    _this.finished = true;
                } else {
                    _this.formInline.offset = _this.formInline.offset + _this.formInline.limit
                    res.data.data.list.forEach(item => {
                        _this.orderList.push(item)
                    })
                }
            }).catch(e => {
                console.log(e)
            })
        },
        // 清空分页相关参数
        clearPage() {
            this.finished = false
            this.orderList = []
            this.formInline.offset = 0
            this.formInline.limit = 10
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