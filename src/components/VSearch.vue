<template>
    <div class="mall-search panel__header">
        <van-search v-model="value" placeholder="请输入搜索关键词" />
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

    },
}
</script>

<style lang="scss" scoped>
    .mall-search{
        .van-search{
            padding: 3px 8px;
            .van-search__content{
                border-radius: 20px;
            }
        }
    }
</style>
