<template>
    <van-sticky class="home-sticky">
        <van-tabs :before-change="beforeChange">
            <van-tab v-for="(item) in tabList" :title="item.name" :name="item.label" :key="item.label"></van-tab>
        </van-tabs>
    </van-sticky>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            index: 0,
            tabList: [
                {name: '热门商品' , label: 'hot'},
                {name: '限时抢购' , label: 'limitTime'},
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
                _this.$emit('change-tab', index);
            });
        }
    },
}
</script>

<style lang="scss">
    .home-sticky{
        height: 40px;
        .van-sticky,.van-tabs,.van-tabs__wrap{
            height: 40px;
        }
        .van-sticky--fixed{
            top: 39px !important;
        }
        .van-tabs__line{
            background: #02a96b;
            width: 40px !important;
        }
        .van-tab__text{
            font-weight: bold;
        }
        .van-tab--active{
            .van-tab__text{
                color: #02a96b;
            }
        }
    }
</style>
