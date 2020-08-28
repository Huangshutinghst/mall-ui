<!-- 首页 -->
<template>
    <div class="home-index panel__hidden">
        <!-- 头部搜索 -->
        <van-sticky>
            <VSearch></VSearch>
        </van-sticky>
        
        <!-- 内容 -->
        <div class="panel__scroll panel__content--fistlevel">
            <!-- banner轮播 -->
            <HomeSwipe></HomeSwipe>
            <!-- 一级分类 -->
            <HomeGrid></HomeGrid>
            <!-- 吸顶类别 -->
            <HomeSticky></HomeSticky>
            <!-- 商品列表 -->
            <HomeList></HomeList>
        </div>

        <!-- 底部导航 -->
        <VFootNav active="home"></VFootNav>
    </div>
</template>

<script type="text/ecmascript-6">
import VFootNav from '../../components/VFootNav';
import VSearch from '../../components/VSearch';
import HomeSwipe from './component/HomeSwipe';
import HomeGrid from './component/HomeGrid';
import HomeSticky from './component/HomeSticky';
import HomeList from './component/HomeList';
export default {
    data () {
        return {

        }
    },
    components: {
        VFootNav,
        VSearch,
        HomeSwipe,
        HomeGrid,
        HomeSticky,
        HomeList
    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
    .home-index{
    }
</style>
