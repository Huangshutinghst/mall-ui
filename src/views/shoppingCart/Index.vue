<!-- 购物车 -->
<template>
    <div class="shopping-index panel__hidden">
        <!-- 内容 -->
        <div class="panel__content">
            <List :leftArrow="false"></List>
        </div>

        <!-- 底部导航 -->
        <VFootNav active="shoppingCart"></VFootNav>
    </div>
</template>

<script type="text/ecmascript-6">
import VFootNav from '../../components/VFootNav';
import List from './List';
export default {
    data () {
        return {
            
        }
    },
    components: {
        VFootNav,
        List,
    },
    methods: {

    },
}
</script>

<style lang="scss">
    .shopping-index{
        //头部
        .van-nav-bar__text{
            color: #000;
        }
    }
</style>