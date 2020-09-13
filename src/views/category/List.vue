<!-- 不带类别栏的 分类商品列表 -->
<template>
    <div class="category-list panel__hidden">
        <!-- 头部 -->
        <VHeader title="" :leftText="this.$route.query.title">
            <van-icon slot="right" @click="search()" name="search" />
        </VHeader>
        
        <!-- 内容  -->
        <div class="panel__content--fistlevel">
            <FilterList 
                :list="goodList" 
                :type="'space'"
                :loading="loading"
                :finished="finished"
                @filter-has="filterHas"
                @filter-price="filterPrice"
            ></FilterList>
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
                classifyId: this.$route.query.type,
                inStock: '',   //0不过滤  1过滤
                priceSort: '',   //1从低到高  2从高到低
                offset: 0,
                limit: 20
            },
            goodList: [],
            loading: false,
            finished: false
        }
    },
    components: {
        VHeader,
        FilterList,
        FootBar
    },
    mounted(){
        this.getListByClassifyId();
    },
    methods:{
        search(){
            this.$router.push({ name: 'search' })
        },
        // 获取商品列表
        getListByClassifyId(){
            this.loading = true
            this.$api.category.getByClassifyId(this.$route.query.type, this.formInline).then(res => {
                this.loading = false
                this.finished = true
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
    .category-list{
        
    }
</style>