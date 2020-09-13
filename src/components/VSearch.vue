<template>
    <div class="mall-search panel__header bg_fff">
        <van-search v-model="value" placeholder="请输入商品名" @focus="handleFocus" />
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            value: ''
        }
    },
    components: {

    },
    methods:{
        handleFocus(){
            this.$router.push({ name: 'search' })
        }
    },
}
</script>

<style lang="scss" scoped>
    .mall-search{
        .van-search{
            padding: 6px 8px;
            .van-search__content{
                border-radius: 20px;
            }
            .van-cell{
                padding: 2px 0;
            }
        }
    }
</style>
