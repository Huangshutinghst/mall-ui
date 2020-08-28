<template>
    <van-nav-bar class="panel__header" :title="title" :left-text="leftText" left-arrow @click-left="onClickLeft()">
        <template #right>
            <slot name="right"></slot>
        </template>
    </van-nav-bar>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        title:String,
        leftText:String
    },
    data () {
        return {

        }
    },
    components: {

    },
    methods:{
        onClickLeft(){
            this.$router.back(-1);
        }
    },
}
</script>

<style lang="scss" scoped>

 
</style>
