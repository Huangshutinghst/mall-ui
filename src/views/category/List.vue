<!-- 分类商品列表 -->
<template>
    <div class="category-list panel__hidden">
        <!-- 头部 -->
        <VHeader title="" :leftText="this.$route.query.title">
            <van-icon slot="right" @click="search()" name="search" />
        </VHeader>
        
        <!-- 内容  -->
        <div class="panel__content--fistlevel">
            <FilterList :list="goodList"></FilterList>
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
            
        }
    },
}
</script>

<style lang="scss" scoped>
    .category-list{
        
    }
</style>