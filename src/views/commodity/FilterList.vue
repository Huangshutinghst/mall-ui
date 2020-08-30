<!-- 商品列表通用组件 -->
<template>
    <div class="commodity-filter-list panel__scroll">
        <div class="__top bg_fff">
            <ul class="flex">
                <li :class="hasFlag?'has':''" class="flex-1" @click="filterHas()">
                    有货
                    <van-icon name="success" />
                </li>
                <li class="price flex-1" 
                    :class="[{active: priceFlag!==''},{up: priceFlag=='up'},{down: priceFlag=='down'}]" 
                    @click="filterPrice()">
                    价格
                    <span></span>
                </li>
            </ul>
        </div>
        
        <ul class="__list">
            <li v-for="(item, index) in goodList" :key="index" class="bg_fff">
                <Card></Card>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import Card from '../commodity/Card'
import CardLimit from '../commodity/CardLimit'
export default {
    props:{
        list: Array
    },
    data () {
        return {
            hasFlag: false,
            priceFlag: '',
            goodList: this.list
        }
    },
    components: {
        Card,
        CardLimit,
    },
    methods:{
        // 是否有货
        filterHas(){
            this.hasFlag = !this.hasFlag;
        },
        // 价格排序
        filterPrice(){
            if(this.priceFlag == ''){
                this.priceFlag = 'up';
            }else if(this.priceFlag == 'up'){
                this.priceFlag = 'down';
            }else if(this.priceFlag == 'down'){
                this.priceFlag = '';
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .commodity-filter-list{
        >.__top{
            height: 40px;
            >ul{
                height: 100%;
                >li{
                   height: 100%;
                   line-height: 40px;
                   text-align: center;
                   font-size: 14px;
                   &.has{
                       color: #02a96b;
                   }
                   &.price{
                       >span{
                           position: relative;
                           &::before{
                                width: 0;
                                height: 0;
                                content: '';
                                position: absolute;
                                top: 3px;
                                left: 6px;
                                border-top: 6px solid rgba(153, 153, 153, 0.8);
                                border-right: 6px solid transparent;
                                transform: rotate(45deg);
                           }
                           &::after{
                                width: 0;
                                height: 0;
                                content: '';
                                position: absolute;
                                bottom: 3px;
                                left: 6px;
                                border-top: 6px solid rgba(153, 153, 153, 0.8);
                                border-right: 6px solid transparent;
                                transform: rotate(-135deg);
                           }
                       }
                       &.active{
                           color: #02a96b;
                       }
                       &.up{
                           >span::before{
                               border-top: 6px solid #02a96b;
                           }
                       }
                       &.down{
                            >span::after{
                               border-top: 6px solid #02a96b;
                           }
                       }
                   }
                }
            }
        }

        >.__list{
            margin: 10px;
            >li{
                margin-bottom: 10px;
                border-radius: 8px;
            }
        }
    }
</style>