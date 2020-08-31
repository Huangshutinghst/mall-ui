<!-- 带类别栏的 分类商品列表 -->
<template>
    <div class="category-list-all panel__hidden">
        <!-- 头部 -->
        <VHeader class="category-list-all__head" title="" :leftText="this.$route.query.title">
            <van-icon slot="right" @click="search()" name="search" />
            <div slot="title">
                <van-tabs @click="handleFirstTab">
                    <van-tab v-for="(item,index) in firstTabs" :title="item.text" :key="index"></van-tab>
                </van-tabs>
            </div>
        </VHeader>
        
        <!-- 内容  -->
        <div class="category-list-all__content panel__content--fistlevel">
            <van-tree-select :items="secondTabs" :main-active-index.sync="secondActive" @click-nav="handleSecondTab">
                <template #content>
                    <FilterList :list="goodList" :type="'border'"></FilterList>
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
            firstTabs: [
                { text: '一级' }, 
                { text: '一级' },
                { text: '一级' }, 
                { text: '一级' },
                { text: '一级' }, 
                { text: '一级' },
                { text: '一级' }, 
                { text: '一级' },
            ],
            secondActive: 0,
            secondTabs: [
                { text: '二级' }, 
                { text: '二级' },
                { text: '二级' }, 
                { text: '二级' },
            ],
            goodList: [
                {},{},{},{},{},{},{},{},{},{},
            ]
        }
    },
    components: {
        VHeader,
        FilterList,
        FootBar
    },
    methods:{
        search(){
            this.$router.push({ name: 'search' })
        },
        // 点击一级类目
        handleFirstTab(name, title){
            console.log(name, title);
        },
        // 点击二级类目
        handleSecondTab(index){
            console.log(index);
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
                color: #02a96b;
                background: #fff;
                &::before{
                    display: none;
                    background: #02a96b;
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