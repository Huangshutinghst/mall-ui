<template>
    <div class="home-grid">
        <van-grid :column-num="5">
            <van-grid-item v-for="(item,index) in categoryList" :key="index" icon="photo-o" :text="item.name" @click="handleGridItem(item,index)" />
        </van-grid>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            categoryList: [
                { name: '分类' },
                { name: '分类' },
                { name: '分类' },
                { name: '分类' },
                { name: '分类' },
                { name: '分类' },
                { name: '分类' },
                { name: '分类' },
                { name: '分类' },
                { name: '全部分类' },
            ]
        }
    },
    components: {

    },
    methods:{
        handleGridItem(item,index){
            var _this = this;
            if(index !== _this.categoryList.length - 1){
                //选择分类
                _this.$router.push({ name: 'categoryListAll' })
            }else{
                //全部分类
                _this.$router.replace({ name: 'category' })
            }
        }
    },
}
</script>

<style lang="scss">
    .home-grid{
        .van-grid-item__content{
            padding: 10px 8px;
        }
        .van-grid-item__text{
            font-size: 11px;
        }
    }
</style>
