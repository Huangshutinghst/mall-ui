<template>
    <div class="panel__layout">
        <keep-alive>
            <router-view v-if="isRouterAlive && $route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="isRouterAlive && !$route.meta.keepAlive" />
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    provide () {
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            isRouterAlive: true
        }
    },
    components: {
    },
    methods:{ 
        reload(){
            this.isRouterAlive = false;
            this.$nextTick(() => (this.isRouterAlive = true));
        }
    },
}
</script>