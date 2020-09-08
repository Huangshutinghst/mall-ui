<!-- 我的收藏 -->
<template>
    <div class="mall-favorites panel__hidden">
        <VHeader title="" leftText="我的收藏"></VHeader>

        <div class="panel__scroll panel__content">
            <ul class="mall-favorites__list bg_fff">
                <li class="__item" v-for="(item,index) in goodlist" :key="index">
                    <Card 
                        v-if="!item.flashing" 
                        :cardInfo="item"
                    ></Card>
                    <CardLimit
                        v-if="item.flashing" 
                        :cardInfo="item"
                    ></CardLimit>
                </li>
            </ul>
            <!-- <VBlank v-else text="没有相关商品"></VBlank> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import Card from '../card/Card'
import CardLimit from "../card/CardLimit";
export default {
    data () {
        return {
            formInline: {
                offset: 0,
                limit: 10
            },
            goodlist: []
        }
    },
    components: {
        VHeader,
        Card,
        CardLimit
    },
    mounted() {
        this.getFavoriteList();
    },
    methods:{
        getFavoriteList(){
            this.$api.mine.getFavoriteList(this.formInline).then(res => {
                this.goodlist = res.data.data.list;
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .mall-favorites{
        .mall-favorites__list{
            .__item{
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
