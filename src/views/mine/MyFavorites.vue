<!-- 我的收藏 -->
<template>
    <div class="mall-favorites panel__hidden">
        <VHeader title="" leftText="我的收藏"></VHeader>

        <div class="panel__scroll panel__content">
            <VShopCard v-if="goodlist.length > 0" :goodlist="goodlist"></VShopCard>
            <VBlank v-else text="没有相关商品"></VBlank>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import VShopCard from './component/VShopCard'
export default {
    data () {
        return {
            goodlist: [
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
            ]
        }
    },
    components: {
        VHeader,
        VShopCard,
    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>

 
</style>
