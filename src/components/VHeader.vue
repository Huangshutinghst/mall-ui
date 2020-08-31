<template>
    <van-nav-bar class="panel__header" :title="title" :left-text="leftText" :left-arrow="leftArrow" @click-left="onClickLeft()">
        <template #right>
            <slot name="right"></slot>
        </template>
    </van-nav-bar>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        title:String,
        leftText:String,
        leftArrow:{
            type:Boolean,
            default:true
        }
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