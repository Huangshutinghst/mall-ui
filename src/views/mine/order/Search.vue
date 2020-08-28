<!-- 订单搜索 -->
<template>
    <div class="order-search panel__hidden">
        <!-- 顶部搜索栏 -->
        <div class="order-search__top bg_fff flex">
            <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" @click="goBack()"></i>
            <van-search class="flex-1" v-model="searchText" clearable placeholder="请输入商品名称" />
        </div>

        <!-- 内容 -->
        <div class="order-search__content">
            <!-- 1.历史记录 -->
            <div v-if="searchText=='' && historyList.length>0" class="__history bg_fff">
                <h5 class="flex flex-pack-justify">
                    <span>历史记录</span>
                    <van-icon name="delete" @click="historyDelete()" />
                </h5>
                <ul>
                    <li v-for="(item,index) in historyList" :key="index" @click="historySearch(item)">{{item}}</li>
                </ul>
            </div>
            <!-- 2.搜索内容 -->
            <OrderListPanel v-if="searchText!=='' && orderList.length>0" :orderList="orderList"></OrderListPanel>
            <!-- 3.暂无内容 -->
            <VBlank v-if="searchText!=='' && orderList.length == 0" text="没有相关的订单哦"></VBlank>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VBlank from '../../../components/blank/VBlankPage'
import OrderListPanel from './OrderList'
export default {
    data () {
        return {
            searchText: '',
            historyList: [
                '记录1',
                '记录2',
                '记录3',
                '记录4'
            ],
            orderList: [
                {},{},{},{}
            ],
        }
    },
    components: {
        VBlank,
        OrderListPanel,
    },
    methods:{
        goBack(){
            this.$router.back(-1);
        },
        historySearch(text){
            this.searchText = text;
        },
        historyDelete(){
            this.historyList = [];
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
                        border: 1px solid #999;
                        border-radius: 10px;
                        vertical-align: middle;
                        margin: 0 10px 10px 0;
                    }
                }
            }
        }
    }
</style>
