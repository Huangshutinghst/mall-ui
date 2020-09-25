<!-- 商品列表通用组件 -->
<template>
    <div class="commodity-filter-list panel__scroll" :class="['commodity-filter-list--' + type, {fixed: fixedHead}]">
        <div class="__top bg_fff" :class="{fixed: fixedHead}">
            <ul class="flex">
                <li :class="hasFlag?'has':''" class="flex-1" @click="filterHas()">
                    有货
                    <van-icon name="success" />
                </li>
                <li class="price flex-1" 
                    :class="[{active: priceFlag!==''},{up: priceFlag==1},{down: priceFlag==2}]" 
                    @click="filterPrice()">
                    价格
                    <span></span>
                </li>
            </ul>
        </div>

        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <ul class="__list">
                <li v-for="item in list" :key="item.productId" class="bg_fff">
                    <Card
                            v-if="!item.flashing"
                            :padding="padding"
                            :cardInfo="item"
                    ></Card>
                    <CardLimit
                            v-if="item.flashing"
                            :padding="padding"
                            :cardInfo="item"
                    ></CardLimit>
                </li>
            </ul>
        </van-list>

<!--        <VBlank v-if="list.length == 0" text="没有相关商品"></VBlank>-->


    </div>
</template>

<script type="text/ecmascript-6">
import Card from '../card/Card'
import CardLimit from '../card/CardLimit'
export default {
    props:{
        padding: {
            type: Boolean,
            default: true
        },
        fixedHead: {
            type: Boolean,
            default: false
        },
        type: String,
        list: Array,
        loading: {
            type: Boolean,
            default: false
        },
        finished: {
            type: Boolean,
            default: false
        },
    },
    data () {
        return {
            hasFlag: false,
            priceFlag: '',
        }
    },
    components: {
        Card,
        CardLimit,
    },
    methods:{
        // 是否过滤有货
        filterHas(){
            this.hasFlag = !this.hasFlag;
            this.$emit('filter-has', this.hasFlag);
        },
        // 价格排序
        filterPrice(){
            if(this.priceFlag == ''){
                this.priceFlag = 1;
            }else if(this.priceFlag == 1){
                this.priceFlag = 2;
            }else if(this.priceFlag == 2){
                this.priceFlag = '';
            }
            this.$emit('filter-price', this.priceFlag)
        },
        onLoad () {
            this.$emit('on-load')
        }
    },
}
</script>

<style lang="scss" scoped>
    .commodity-filter-list{
        &.fixed{
            padding-top: 36px;
        }
        position: relative;
        >.__top{
            height: 36px;
            >ul{
                height: 100%;
                border-bottom: 1px solid #eee;
                >li{
                   height: 100%;
                   line-height: 36px;
                   text-align: center;
                   font-size: 12px;
                   &.has{
                       color: #0db059;
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
                           color: #0db059;
                       }
                       &.up{
                           >span::before{
                               border-top: 6px solid #0db059;
                           }
                       }
                       &.down{
                            >span::after{
                               border-top: 6px solid #0db059;
                           }
                       }
                   }
                }
            }
            &.fixed{
                width: 100%;
                position: fixed;
                top: 38px;
                left: 0;
                z-index: 9;
            }
        }

        // 样式1
        &.commodity-filter-list--space{
            .__list{
                margin: 10px;
                >li{
                    margin-bottom: 10px;
                    border-radius: 8px;
                }
            }
        }

        // 样式2
        &.commodity-filter-list--border{
            .__list{
                margin: 0 10px;
                >li{
                    border-bottom: 1px solid rgba(238, 238, 238, 0.8);
                    // &:not(:last-child){
                    //     border-bottom: 1px solid rgba(238, 238, 238, 0.8);
                    // }
                }
            }
        }
    }
</style>