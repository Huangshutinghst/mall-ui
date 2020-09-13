<template>
    <div class="home-grid">
        <van-grid :column-num="5">
            <van-grid-item v-for="(item,index) in categoryList" :key="index" :icon="$api.img + item.pic" :text="item.classifyName" @click="handleGridItem(item,index)" />
            <van-grid-item icon="more-o" :text="'全部分类'" @click="handleGridItem({}, 10)" />
        </van-grid>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            categoryList: []
        }
    },
    mounted() {
        this.getHomeClassify();
    },
    methods:{
        // 获取一级分类
        getHomeClassify(){
            this.$api.home.getHomeClassify().then(res => {
                this.categoryList = res.data.data;
            }).catch(e => {
                console.log(e)
            })
        },
        // 点击分类
        handleGridItem(item,index){
            var _this = this;
            if(index == 10){
                //全部分类
                _this.$router.replace({ name: 'category'})
            }else{
                //选择分类
                _this.$router.push({ name: 'categoryListAll', query:{id: item.classifyId} })
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
        .van-grid-item__icon{
            color: #8d8e8f;
        }
        .van-grid-item__text{
            font-size: 11px;
        }
    }
</style>
