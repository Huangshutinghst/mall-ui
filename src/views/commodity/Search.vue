<!-- 商品搜索页 -->
<template>
    <div class="cmomodity-search-index panel__hidden bg_fff">
        <!-- 顶部搜索栏 -->
        <VHeader class="cmomodity-search__top" title="" :leftText="this.$route.query.title">
            <div slot="right">搜索</div>
            <div slot="title">
                <van-search v-model="searchText" clearable placeholder="请输入商品名称" />
            </div>
        </VHeader>

        <!-- 内容 -->
        <div class="cmomodity-search__content">
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
            <div v-if="searchText=='' && hotList.length>0" class="__history bg_fff">
                <h5 class="flex flex-pack-justify">
                    <span>热门搜索</span>
                </h5>
                <ul>
                    <li v-for="(item,index) in hotList" :key="index" @click="historySearch(item)">{{item}}</li>
                </ul>
            </div>
            <!-- 2.搜索内容 -->
            <div class="panel__hidden" v-if="searchText!=='' && resultList.length>0" >
                <div class="panel__content">
                    <FilterList :type="'space'" :fixedHead="true" :list="resultList"></FilterList>
                </div>
                <FootBar></FootBar>
            </div>
            <!-- 3.暂无内容 -->
            <VBlank v-if="searchText!=='' && resultList.length == 0" text="没有相关商品"></VBlank>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import VBlank from '../../components/blank/VBlankPage'
import FilterList from '../commodity/FilterList'
import FootBar from '../commodity/FootBar'
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
            hotList: [
                '热词1',
                '热词2',
                '热词3',
                '热词4',
                '热词5',
                '热词6',
                '热词7',
                '热词8'
            ],
            resultList: [
                {},{},{},{},{},{},{},{},{},{},{},{}
            ],
        }
    },
    components: {
        VHeader,
        VBlank,
        FilterList,
        FootBar
    },
    methods:{
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
    .cmomodity-search-index{
        >.cmomodity-search__top{
            height: 40px;
            line-height: 40px;
            padding-right: 15px;
            >i{
                padding: 12px 16px;
                margin-right: 0;
            }
            .van-search{
                padding: 0;
                .van-search__content{
                    border-radius: 20px;
                }
                .van-cell {
                    padding: 2px 8px 2px 0;
                }
            }
        }

        >.cmomodity-search__content{
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
                        margin: 0 12px 12px 0;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    .cmomodity-search-index{
        >.cmomodity-search__top{
            .van-nav-bar__title{
                width: calc(100% - 85px);
                max-width: 100%;
            }
            .van-nav-bar__right{
                padding: 0 15px 0 0;
                font-size: 14px;
            }
            .van-icon-clear{
                color: #999;
            }
        }
    }
</style>