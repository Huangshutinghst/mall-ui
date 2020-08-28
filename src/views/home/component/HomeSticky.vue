<template>
    <van-sticky class="home-sticky">
        <van-tabs :before-change="beforeChange">
            <van-tab v-for="(item,index) in tabList" :title="item.name" :key="index"></van-tab>
        </van-tabs>
    </van-sticky>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            index: 0,
            tabList: [
                {name: '热门商品'},
                {name: '限时抢购'},
            ]
        }
    },
    components: {

    },
    methods:{
        beforeChange(index){
            var _this = this;
            // 返回 false 表示阻止此次切换
            if (_this.index === index) {
                return false;
            }

            // 返回 Promise 来执行异步逻辑
            return new Promise((resolve) => {
                // 在 resolve 函数中返回 true 或 false
                resolve(_this.index !== index);
                _this.index = index;
            });
        }
    },
}
</script>

<style lang="scss" scoped>
    .home-sticky{
        
    }
</style>

<style lang="scss">
    .home-sticky{
        .van-sticky--fixed{
            top: 39px !important;
        }
    }
</style>
