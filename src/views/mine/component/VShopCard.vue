<template>
    <div>
        <van-card
            v-for="(item, index) in goodlist"
            :key="index"
            class="home-list__card"
            price="2.00"
            origin-price="10.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        >
            <template #tags>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
            </template>
            <template #footer>
                <van-stepper v-model="item.num" theme="round" disable-input />
            </template>
        </van-card>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        goodlist: Array
    },
    data () {
        return {
            
        }
    },
    components: {

    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>

 
</style>
