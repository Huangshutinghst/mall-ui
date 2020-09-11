<!-- 限时抢购 -->
<template>
    <div class="limit-time-index">
        <!-- 时间标签栏滚动 -->
        <van-tabs class="__tabs" @change="beforeChange">
            <van-tab v-for="(item,index) in timeList" :key="index">
                <template #title>
                    <div class="tabs__item">
                        <h5>{{item.startTime.substring(11, 16)}}</h5>
                        <!-- 即将开抢/明天开抢 -->
                        <p>即将开抢</p>
                    </div>
                </template>
            </van-tab>
        </van-tabs>

        <!-- 倒计时 -->
        <div class="__time bg_fff">
            <van-count-down :time="currentTime" :class="currentIndex==0?'active':''" format="HH:mm:ss">
                <template #default="timeData">
                    {{currentIndex==0?'离本场结束':'离本场开始'}}
                    <span class="block">{{ timeData.hours }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds }}</span>
                </template>
            </van-count-down>
        </div>

        <!-- 商品列表 -->
        <ul class="__list">
            <li v-for="(item, index) in goodList" :key="index" class="bg_fff">
                <CardLimit
                    :cardInfo="item"
                    :open="currentIndex==0 ? true : false"
                ></CardLimit>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import CardLimit from '../../card/CardLimit'
export default {
    data () {
        return {
            formInline: {
                offset: 0,
                limit: 20
            },
            currentTime: 0,  //毫秒数
            currentIndex: 0,
            timeList: [],
            goodList: []
        }
    },
    components: {
        CardLimit
    },
    methods:{
        // 获取限时抢购时间
        getTodayFlash(){
            this.$api.home.getTodayFlash().then(res => {
                this.timeList = res.data.data;
                this.currentTime = new Date(this.timeList[0].endTime).getTime() - new Date().getTime();
                this.getProductByFlashId(this.timeList[0].flashId);
            }).catch(e => {
                console.log(e)
            })
        },
        // 选择时间
        beforeChange(index) {
            this.currentIndex = index;
            if(new Date().getTime() > new Date(this.timeList[index].endTime)){
                this.currentTime = new Date().getTime() - new Date(this.timeList[index].startTime).getTime();
            }else{
                this.currentTime = new Date(this.timeList[index].endTime).getTime() - new Date().getTime();
            }
            this.getProductByFlashId(this.timeList[index].flashId);
        },
        // 获取显示抢购商品
        getProductByFlashId(flashId) {
            this.$api.home.getProductByFlashId(flashId, this.formInline).then(res => {
                this.goodList = res.data.data.list;
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .limit-time-index{
        position: relative;
        .__time{
            position: absolute;
            top: 60px;
            left: 10px;
            right: 10px;
            padding: 0 10px;
            border-radius: 8px;
            height: 36px;
            line-height: 36px;
            .van-count-down{
                width: 100%;
                height: 100%;
                text-align: center;
                font-size: 12px;
                padding: 8px 0;
            }
            .colon {
                display: inline-block;
                margin: 0 1px;
                color: rgba(0, 0, 0, 0.95);
            }
            .block {
                display: inline-block;
                width: 22px;
                color: #fff;
                font-size: 12px;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.95);
                border-radius: 20px;
            }
            >.active{
                .colon {
                    color: #ee0a24;
                }
                .block {
                    background-color: #ee0a24;
                }
            }
        }

        .__list{
            margin: 30px 10px 10px;
            >li{
                border-radius: 8px;
                margin-bottom: 10px;
            }
        }
    }
</style>

<style lang="scss">
    .limit-time-index{
        .__tabs{
            .van-tabs__nav{
                background: #ee0a24;
            }
            .van-tabs__line{
                display: none;
            }
            .van-tabs__wrap{
                height: 76px;
                .van-tab{
                    height: 60px;
                    padding: 0 16px;
                }
                .van-tab--active{
                    .tabs__item{
                        >h5{
                            color: #fff;
                        }
                        >p{
                            color: #ee0a24;
                            background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.7));
                        }
                    }
                }
            }
            .tabs__item{
                width: 60px;
                color: rgba(255, 255, 255, 0.8);
                text-align: center;
                >h5{
                    font-size: 16px;
                    font-weight: bold;
                }
                >p{
                    font-size: 10px;
                    padding: 0 8px;
                    line-height: 16px;
                    border-radius: 10px;
                    margin-top: 2px;
                }
            }
        }
    }
</style>