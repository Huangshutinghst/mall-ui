<!-- 订单搜索 -->
<template>
    <div class="order-search panel__hidden">
        <!-- 顶部搜索栏 -->
        <div class="order-search__top bg_fff flex">
            <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" @click="goBack()"></i>
            <van-search class="flex-1" v-model="formInline.productName" clearable placeholder="请输入商品名称" />
            <div class="btn" @click="filterName()">搜索</div>
        </div>

        <!-- 内容 -->
        <div class="order-search__content panel__scroll">
            <!-- 1.历史记录 -->
            <div v-if="!searchFlag" class="__history bg_fff">
                <template v-if="historyList.length > 0">
                    <h5 class="flex flex-pack-justify">
                        <span>历史记录</span>
                        <van-icon name="delete" @click="historyDelete()" />
                    </h5>                
                    <ul>
                        <li v-for="(item,index) in historyList" :key="index" @click="filterName(item)">{{ item }}</li>
                    </ul>
                </template>
            </div>
            <!-- 2.搜索内容 -->
            <OrderListPanel
                    v-if="searchFlag && orderList.length>0"
                    :orderList="orderList"
                    :loading="loading"
                    :finished="finished"
                    @on-load="onLoadSearch"
            ></OrderListPanel>
            <!-- 3.暂无内容 -->
            <VBlank v-if="searchFlag && orderList.length == 0" text="没有相关的订单哦"></VBlank>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VBlank from '../../../components/blank/VBlankPage'
import OrderListPanel from './OrderList'
export default {
    data () {
        return {
            formInline: {
                productName: '',
                offset: 0,
                limit: 20
            },
            historyList: [],
            orderList: [],
            searchFlag: false,
            loading: false,
            finished: false
        }
    },
    components: {
        VBlank,
        OrderListPanel,
    },
    watch: {
        'formInline.productName'(val){
            if(val == ''){
                this.searchFlag = false;
                this.getHistoryList();
            }
        }
    },
    mounted() {
        this.getHistoryList();
    },
    methods:{
        // 搜索订单
        onLoadSearch () {
            const _this = this
            _this.loading = true;
            _this.$api.order.search(_this.formInline).then(res => {
                _this.loading = false;
                if (res.data.data.list.length === 0) {
                    _this.finished = true;
                } else {
                    _this.formInline.offset = _this.formInline.offset + _this.formInline.limit
                    res.data.data.list.forEach(item => {
                        _this.orderList.push(item)
                    })
                }
                this.searchFlag = true;
            }).catch(e => {
                console.log(e)
            })
        },
        filterName(text) {
            if(text){
                this.formInline.productName = text;
            }
            if(this.formInline.productName.trim() == ''){
                this.Util.tip('搜索内容不能为空')
                this.formInline.productName = '';
                return
            };
            this.clearPage()
            this.onLoadSearch();
        },
        // 获取历史搜索词
        getHistoryList(){
            this.$api.order.getHistorySearchText().then(res => {
                this.historyList = res.data.data;
            }).catch(e => {
                console.log(e)
            })
        },
        // 删除历史记录
        historyDelete(){
            this.$api.order.deleteHistorySearchText().then(res => {
                this.getHistoryList();
            }).catch(e => {
                console.log(e)
            })
        },
        goBack(){
            this.$router.back(-1);
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
    .order-search{
        >.order-search__top{
            height: 40px;
            line-height: 40px;
            padding-right: 15px;
            >i{
                padding: 12px 16px;
                margin-right: 0;
            }
            .van-search{
                padding: 0;
                .van-cell {
                    padding: 2px 8px 2px 0;
                }
            }
            >.btn{
                padding-left: 15px;
                font-size: 14px;
            }
        }

        >.order-search__content{
            height: calc(100% - 40px);
            >.__history{
                >h5{
                    height: 40px;
                    line-height: 40px;
                    padding: 0 15px;
                    font-size: 12px;
                    color: #888;
                    >i{
                        margin: 12px 0;
                        font-size: 14px;
                    }
                }
                >ul{
                    font-size: 0;
                    padding: 0 15px 6px;
                    >li{
                        display: inline-block;
                        font-size: 12px;
                        padding: 0 8px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #eee;
                        border-radius: 10px;
                        vertical-align: middle;
                        margin: 0 10px 10px 0;
                    }
                }
            }
        }
    }
</style>
