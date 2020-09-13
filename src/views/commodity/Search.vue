<!-- 商品搜索页 -->
<template>
    <div class="cmomodity-search-index panel__hidden">
        <!-- 顶部搜索栏 -->
        <VHeader class="cmomodity-search__top">
            <div slot="right" @click="filterName()">搜索</div>
            <div slot="title">
                <van-search v-model="formInline.productName" clearable placeholder="请输入商品名称" />
            </div>
        </VHeader>

        <!-- 内容 -->
        <div class="cmomodity-search__content">
            <!-- 1.历史记录 -->
            <div v-if="!searchFlag" class="__history bg_fff panel__hidden">
                <div v-if="historyList.length>0" class="__box bg_fff">
                    <h5 class="flex flex-pack-justify">
                        <span>历史记录</span>
                        <van-icon name="delete" @click="historyDelete()" />
                    </h5>
                    <ul>
                        <li v-for="(item,index) in historyList" :key="index" @click="filterName(item)">{{item}}</li>
                    </ul>
                </div>
                <div v-if="hotList.length>0" class="__box bg_fff">
                    <h5 class="flex flex-pack-justify">
                        <span>热门搜索</span>
                    </h5>
                    <ul>
                        <li v-for="(item,index) in hotList" :key="index" @click="filterName(item)">{{item}}</li>
                    </ul>
                </div>
            </div>
            <!-- 2.搜索内容 -->
            <div class="panel__hidden" v-show="searchFlag" >
                <div class="panel__content panel__scroll">
                    <FilterList
                        :type="'space'"
                        :fixedHead="true" 
                        :list="resultList"
                        :loading="loading"
                        :finished="finished"
                        @filter-has="filterHas"
                        @filter-price="filterPrice"
                        @on-load="onLoadSearch"
                    ></FilterList>
                </div>
                <FootBar></FootBar>
            </div>
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
            formInline:{
                inStock: '',   //0不过滤  1过滤
                priceSort: '',   //1从低到高  2从高到低
                productName: '',  //商品名称
                offset: 0,
                limit: 10
            },
            historyList: [],
            hotList: [],
            resultList: [],
            searchFlag: false,
            loading: false,
            finished: false
        }
    },
    components: {
        VHeader,
        VBlank,
        FilterList,
        FootBar
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
        this.getHotList();
        this.getHistoryList();
    },
    methods:{
        // 滚动搜索
        onLoadSearch(){
            const _this = this
            _this.loading = true;
            _this.$api.search.search(_this.formInline).then(res => {
                _this.loading = false;
                if (res.data.data.list.length === 0) {
                    _this.finished = true;
                } else {
                    _this.formInline.offset = _this.formInline.offset + _this.formInline.limit
                    res.data.data.list.forEach(item => {
                        _this.resultList.push(item)
                    })
                }
                this.searchFlag = true;
            }).catch(e => {
                console.log(e)
            })
        },
        // 是否过滤有货
        filterHas(val){
            if(val){
                this.formInline.inStock = 1;
            }else{
                this.formInline.inStock = 0;
            }
            this.clearPage()
            this.onLoadSearch();
        },
        // 价格排序
        filterPrice(val){
            this.formInline.priceSort = val;
            this.clearPage()
            this.onLoadSearch();
        },
        // 名称过滤
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
        // 获取热门搜索词
        getHotList(){
            this.$api.search.getHotKeyword().then(res => {
                this.hotList = res.data.data.filter(val => {
                    return val.trim() !== ''
                });
            }).catch(e => {
                console.log(e)
            })
        },
        // 获取历史搜索词
        getHistoryList(){
            this.$api.search.getHistoryKeyword().then(res => {
                this.historyList = res.data.data;
            }).catch(e => {
                console.log(e)
            })
        },
        // 删除历史记录
        historyDelete(){
            this.$api.search.deleteByProduct().then(res => {
                this.getHistoryList();
            }).catch(e => {
                console.log(e)
            })
        },
        // 清空分页相关参数
        clearPage() {
            this.loading = true
            this.finished = false
            this.resultList = []
            this.formInline.offset = 0
            this.formInline.limit = 10
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
                >.__box{
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