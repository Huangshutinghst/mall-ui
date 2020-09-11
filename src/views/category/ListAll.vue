<!-- 带类别栏的 分类商品列表 -->
<template>
    <div class="category-list-all panel__hidden">
        <!-- 头部 -->
        <VHeader class="category-list-all__head">
            <van-icon slot="right" @click="search()" name="search" />
            <div slot="title">
                <van-tabs animated @click="handleFirstTab" v-model="firstActive">
                    <van-tab v-for="(item,index) in firstTabs" :name="item.classifyId" :title="item.text" :key="index"></van-tab>
                </van-tabs>
            </div>
        </VHeader>
        
        <!-- 内容  -->
        <div class="category-list-all__content panel__content--fistlevel">
            <van-tree-select :items="secondTabs" :main-active-index.sync="secondActive" @click-nav="handleSecondTab">
                <template #content>
                    <FilterList 
                        :padding="false" 
                        :list="goodList" 
                        :type="'border'"
                        @filter-has="filterHas"
                        @filter-price="filterPrice"
                    ></FilterList>
                </template>
            </van-tree-select>
        </div>

        <!-- footbar -->
        <FootBar></FootBar>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import FilterList from '../commodity/FilterList'
import FootBar from '../commodity/FootBar'
export default {
    data () {
        return {
            formInline: {
                classifyId: '',
                inStock: '',   //0不过滤  1过滤
                priceSort: '',   //1从低到高  2从高到低
                offset: 0,
                limit: 20
            },
            firstActive: 0,
            firstTabs: [],
            secondActive: 0,
            secondTabs: [],
            goodList: []
        }
    },
    components: {
        VHeader,
        FilterList,
        FootBar
    },
    mounted(){
        this.getClassifyList();
    },
    methods:{
        search(){
            this.$router.push({ name: 'search' })
        },
        // 获取分类
        getClassifyList(){
            this.$api.category.getClassifyList().then(res => {
                this.firstTabs = res.data.data;
                this.firstActive = this.$route.query.id;
                this.secondTabs = this.firstTabs.filter(el =>{
                    return el.classifyId == this.firstActive;
                })[0].children;
                this.formInline.classifyId = this.secondTabs[0].classifyId;
                this.getListByClassifyId();
            }).catch(e => {
                console.log(e)
            })
        },
        // 点击一级类目
        handleFirstTab(name, title){
            this.firstActive = name;
            this.secondTabs = this.firstTabs.filter(el =>{
                return el.classifyId == this.firstActive;
            })[0].children;
        },
        // 点击二级类目
        handleSecondTab(index){
            this.formInline.classifyId = this.secondTabs[index].classifyId;
            this.getListByClassifyId()
        },
        // 获取商品列表
        getListByClassifyId(){
            this.$api.category.getByClassifyId(this.formInline.classifyId, this.formInline).then(res => {
                this.goodList = res.data.data.list;
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
            this.getListByClassifyId();
        },
        // 价格排序
        filterPrice(val){
            this.formInline.priceSort = val;
            this.getListByClassifyId();
        },
    },
}
</script>

<style lang="scss" scoped>
    .category-list-all{
        .category-list-all__content{
            .van-tree-select{
                height: 100% !important;
            }
        }
    }
</style>

<style lang="scss">
    .category-list-all{
        //头部
        .category-list-all__head{
            .van-tabs__wrap{
                height: 40px;
            }
            .van-tab{
                padding: 0 15px;
                .van-tab__text{
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 12px;
                }
            }
            .van-tab--active{
                .van-tab__text{
                    color: #000;
                    font-weight: bold;
                }
            }
            .van-tabs__line{
                display: none;
            }
        }

        // 内容
        .category-list-all__content{
            .van-sidebar-item{
                font-size: 12px;
                transition: all 0.2s;
                padding: 8px 10px;
                min-height: 35px;
                text-align: center;
            }
            .van-sidebar-item--select{
                color: #0db059;
                background: #fff;
                &::before{
                    display: none;
                    background: #0db059;
                }
            }
            // 右
            .van-tree-select__content{
                flex: 4;
                .van-tree-select__item{
                    font-size: 12px;
                }
                .van-tree-select__item--active{
                    color: #000;
                }
            }
        }   
    }
</style>