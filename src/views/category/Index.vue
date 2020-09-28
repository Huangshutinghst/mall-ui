<!-- 分类 -->
<template>
    <div class="category-index panel__hidden">
        <!-- 头部 -->
        <van-nav-bar class="panel__header" left-text="分类">
            <template #right>
                <van-icon name="search" @click="search()"/>
            </template>
        </van-nav-bar>
        
        <!-- 内容  -->
        <van-tree-select
            class="panel__scroll panel__content--fistlevel"
            selected-icon=""
            :items="categoryList"
            :main-active-index.sync="activeIndex"
            :active-id.sync="activeId"
            @click-nav="handleNav"
            @click-item="handleItem"
        />  

        <!-- 底部导航 -->
        <VFootNav :active="navName"></VFootNav>
    </div>
</template>

<script type="text/ecmascript-6">
import VFootNav from '../../components/VFootNav';
export default {
    data () {
        return {
            categoryList: [],
            activeIndex: 0,
            activeId: 1,
            navName: 'category'
        }
    },
    components: {
        VFootNav,
    },
    beforeRouteLeave(to, from, next){
        const { name } = to;
        if (name == 'home' || name == 'shoppingCart' || name == 'mine') {
            from.meta.keepAlive = false;
        } else {
            from.meta.keepAlive  = true;
        }
        this.navName = 'category';
        next();
    },
    mounted(){
        this.getClassifyList();
    },
    methods:{
        getClassifyList(){
            this.$api.category.getClassifyList().then(res => {
                this.categoryList = res.data.data;
            }).catch(e => {
                console.log(e)
            })
        },
        handleNav(index){
            this.activeIndex = index;
            this.activeId = 1;
        },
        handleItem(data){
            this.activeId = data.id;
            this.$router.push( {name: 'categoryList',query:{title: data.text, type: data.id}} )
        },
        search(){
            this.$router.push({ name: 'search' })
        },
    },
}
</script>

<style lang="scss">
    .category-index{
        .van-sidebar-item{
            font-size: 12px;
            transition: all 0.2s;
            padding: 10px 2px;
            min-height: 40px;
            text-align: center;
        }
        .van-sidebar-item--select{
            color: #0db059;
            background: #fff;
            font-size: 13px;
            .van-sidebar-item__text{
                font-weight: bold;
            }
            &::before{
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
</style>