<!-- 限时抢购 -->
<template>
    <div class="limit-time-index">
        <!-- 时间标签栏滚动 -->
        <van-tabs class="__tabs" v-model="active" @change="beforeChange">
            <van-tab v-for="(item,index) in timeList" :key="index">
                <template #title>
                    <div class="tabs__item flex flex-v flex-pack-center">
                        <h5>{{item.startTime.substring(11, 16)}}</h5>
                        <p v-if="index==0 && isFlashing">立即抢购</p>
                        <p v-else>{{item.today?'即将开抢':'明天开抢'}}</p>
                    </div>
                </template>
            </van-tab>
        </van-tabs>

        <!-- 倒计时 -->
        <div class="__time bg_fff">
            <van-count-down :time="currentTime" :class="flag?'active':''" @finish="countDownFinish">
                <template #default="timeData">
                    {{flag?'离本场结束':'离本场开始'}}
                    <span class="block">{{ timeData.hours>9 ? timeData.hours : '0'+timeData.hours }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.minutes>9 ? timeData.minutes : '0'+timeData.minutes }}</span>
                    <span class="colon">:</span>
                    <span class="block">{{ timeData.seconds>9 ? timeData.seconds : '0'+timeData.seconds }}</span>
                </template>
            </van-count-down>
        </div>

        <!-- 商品列表 -->
        <ul class="__list">
            <li v-for="(item, index) in goodList" :key="index" class="bg_fff">
                <CardLimit
                    :cardInfo="item"
                    :open="flag ? true : false"
                ></CardLimit>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import CardLimit from '../../card/CardLimit'
export default {
    props: {
        modal: String
    },
    data () {
        return {
            formInline: {
                offset: 0,
                limit: 20
            },
            currentTime: 0,  //毫秒数
            timeList: [],
            goodList: [],
            active: 0, //当前选中tab
            flag: false,  //当前抢购是否开启
            currentFlashId: undefined,
            isFlashing: false, //当前是否可以抢购
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
                // 1.由于后端数据会延迟，第一场要判断它是否已经结束，如果已经结束要前端手动移除
                if(new Date().getTime() > new Date(this.timeList[0].endTime).getTime()){
                    this.timeList.shift();
                }
                // 2.判断当前第一场是抢购中or未开启
                if(new Date(this.timeList[0].startTime).getTime() > new Date().getTime()){
                    this.currentTime = new Date(this.timeList[0].startTime).getTime() - new Date().getTime();
                    this.flag = false;
                    this.isFlashing = false;
                }else{
                    this.currentTime = new Date(this.timeList[0].endTime).getTime() - new Date().getTime();
                    this.flag = true;
                    this.isFlashing = true;
                }
                // 3.获取当前第一场的商品列表
                this.active = 0;
                this.currentFlashId = this.timeList[0].flashId;
                this.getProductByFlashId(this.timeList[0].flashId);
            }).catch(e => {
                console.log(e)
            })
        },
        // 选择时间
        beforeChange(index) {
            // 1.判断当前场是抢购中or未开启
            if(new Date().getTime() > new Date(this.timeList[index].startTime).getTime() && new Date().getTime() < new Date(this.timeList[index].endTime).getTime()){
                this.currentTime = new Date(this.timeList[index].endTime).getTime() - new Date().getTime();
                this.flag = true;
            }else{
                this.currentTime = new Date(this.timeList[index].startTime).getTime() - new Date().getTime();
                this.flag = false;
            }
            // 2.获取当前场商品
            this.getProductByFlashId(this.timeList[index].flashId);
            this.currentFlashId = this.timeList[index].flashId
        },
        // 获取商品列表
        getProductByFlashId(flashId) {
            this.$api.home.getProductByFlashId(flashId, this.formInline).then(res => {
                this.goodList = res.data.data.list;
            }).catch(e => {
                console.log(e)
            })
        },
        // 倒计时结束触发
        countDownFinish() {
            if(this.modal !== 'limitTime') return;
            var thiz = this;
            if (this.currentFlashId !== undefined) {
                if(this.flag){
                    this.$dialog.alert({
                        message: '本场抢购已结束！',
                        theme: 'round-button',
                        confirmButtonText: '确定'
                    }).then(() => {
                        thiz.getTodayFlash();
                    });
                }else{
                    thiz.getTodayFlash();
                }
            }
        }
    }
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
                    >.van-tab__text{
                        height: 100%;
                    }
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
                height: 100%;
                color: rgba(255, 255, 255, 0.8);
                text-align: center;
                z-index: 999;
                position: relative;
                >h5{
                    font-size: 15px;
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