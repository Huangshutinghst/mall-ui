<!-- 购物车 -->
<template>
    <div class="shopping-index panel__hidden">
        <!-- 内容 -->
        <div class="panel__content">
            <List ref="scroll-view" :leftArrow="false"></List>
        </div>

        <!-- 底部导航 -->
        <VFootNav :active="navName"></VFootNav>
    </div>
</template>

<script type="text/ecmascript-6">
import VFootNav from '../../components/VFootNav';
import List from './List';
export default {
    data () {
        return {
            navName: 'shoppingCart'
        }
    },
    components: {
        VFootNav,
        List,
    },
    beforeRouteLeave(to, from, next){
        const { name } = to;
        if (name == 'home' || name == 'category' || name == 'mine') {
            from.meta.keepAlive = false;
            from.meta.scrollPos = { x: 0, y: 0 };
        } else {
            from.meta.keepAlive = true;
            from.meta.scrollPos = { x: this.$refs['scroll-view'].getScrollTop(), y: 0 }
        }
        next();
    },
    beforeRouteEnter(to, from, next){
        next((vm) => {
            vm.$refs['scroll-view'].scroll(vm.$route.meta.scrollPos.x);
        })
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