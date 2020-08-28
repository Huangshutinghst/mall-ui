<template>
    <div class="panel__layout">
        <router-view v-if="isRouterAlive" />
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