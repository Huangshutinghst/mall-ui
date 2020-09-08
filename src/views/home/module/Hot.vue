<!-- 热门商品 -->
<template>
    <div class="module-hot">
        <ul class="bg_fff">
            <li v-for="(item, index) in goodList" :key="index">
                <Card :cardInfo="item"></Card>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import Card from '../../card/Card'
export default {
    data () {
        return {
            formInline: {
                offset: 0,
                limit: 10
            },
            goodList: []
        }
    },
    components: {
        Card,
    },
    mounted(){
        this.getHotList();
    },
    methods:{
        // 获取热门商品列表
        getHotList(){
            this.$api.home.getHotProduct(this.formInline).then(res => {
                this.goodList = res.data.data.list;
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .module-hot{
        >ul{
            border-top: 1px solid rgba(238,238,238,0.8);
            >li{
                position: relative;
                &::after{
                    content: '';
                    position: absolute;
                    left: 15px;
                    right: 15px;
                    bottom: 0;
                    height: 1px;
                    width: calc(100% - 30px);
                    background: rgba(238,238,238,0.8);
                }
            }
        }
    }
</style>
