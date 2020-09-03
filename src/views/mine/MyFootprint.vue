<!-- 我的足迹 -->
<template>
    <div class="mall-footprint panel__hidden">
        <VHeader title="" leftText="我的足迹"></VHeader>

        <div class="panel__scroll panel__content">
            <ul class="mall-footprint__list bg_fff" v-if="goodlist.length > 0">
                <li class="__item" v-for="(item,index) in goodlist" :key="index">
                    <Card></Card>
                    <!-- <CardLimit></CardLimit> -->
                </li>
            </ul>
            <VBlank v-else text="没有相关商品"></VBlank>
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
        Card,
        CardLimit
    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
    .mall-footprint{
        .mall-footprint__list{
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
