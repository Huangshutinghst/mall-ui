<!-- 热门商品 -->
<template>
    <div class="module-active panel__hidden">
        <VHeader title="" :leftText="activityName"></VHeader>

        <div class="panel__content panel__scroll">
            <!-- 活动图 -->
            <div class="__top">
                <img v-lazy="$api.img + $route.query.pic" />
            </div>

            <!-- 活动分类 -->
            <van-tabs v-model="active" scrollspy sticky class="__tab">
                <van-tab v-for="(item) in goodList" :title="item.classifyName" :key="item.classifyId">
                    <!-- 商品列表 -->
                    <h5 class="__tab-title">{{ item.classifyName }}</h5>
                    <ul class="__tab-list">
                        <li class="bg_fff" v-for="(val) in item.productVoList" :key="val.productId">
                            <Card 
                                v-if="!val.flashing" 
                                :padding="true"
                                :cardInfo="val"
                            ></Card>
                            <CardLimit 
                                v-if="val.flashing" 
                                :padding="true"
                                :cardInfo="val"
                            ></CardLimit>
                        </li>
                    </ul>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../../components/VHeader'
import Card from '../../card/Card'
import CardLimit from '../../card/CardLimit'
export default {
    data () {
        return {
            activityName: '',
            active: 0,
            goodList: []
        }
    },
    components: {
        VHeader,
        Card,
        CardLimit
    },
    mounted(){
        this.getActivityShop();
    },
    methods:{
        // 获取活动下分类
        getActivityShop(){
            this.$api.home.getActivityShop(this.$route.query.id).then(res => {
                this.goodList = res.data.data;
                this.activityName = this.goodList[0].activityName;
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .module-active{
        >.panel__content{
            >.__top{
                height: 180px;
                width: 100%;
                overflow: hidden;
                position: relative;
                >img{
                    // max-width: 100%;
                    // position: absolute;
                    // top: 50%;
                    // left: 50%;
                    // transform: translate(-50%, -50%);
                }
            }

            >.__tab{
                /deep/ .van-tabs__nav{
                    background: #fff;
                }
                /deep/ .van-tabs__line{
                    background: #0db059;
                }
                /deep/ .van-tab--active{
                    .van-tab__text{
                        color: #0db059;
                    }
                }
                .__tab-title{
                    border-radius: 20px 20px 0 0;
                    height: 40px;
                    line-height: 40px;
                    margin: 10px;
                    background: rgba(205, 243, 223, 1);
                    color: #0db059;
                    font-size: 16px;
                    font-weight: bold;
                    text-align: center;
                }
                .__tab-list{
                    margin: 10px;
                    >li{
                        border-radius: 8px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
</style>
