<!-- 优惠券卡片 -->
<template>
    <div class="coupon-card" :class="type==1?'':'gray'">
        <!-- 卡片 -->
        <div class="__card flex" @click="use()">
            <div class="left">
                <h5><font>￥</font>{{ couponObj.discount }}</h5>
                <p>满{{ couponObj.minPrice }}元可用</p>
            </div>
            <div class="right flex-1">
                <h5 class="double-row">{{ couponObj.name }}</h5>
                <p v-if="couponObj.timeType !== null && couponObj.timeType == 1">领取后{{ couponObj.days==0?'当':couponObj.days }}天内有效</p>
                <p v-else>{{ couponObj.startTime }}至{{ couponObj.endTime }}有效</p>
                <!-- <p class="today">今天到期</p> -->
                <!-- 按钮 -->
                <div v-show="!couponObj.received && type==1" class="btn receive" @click.stop="handleReceive(couponObj.couponId)">领取</div>
                <div v-show="couponObj.received && type==1 && page!=='shop'" class="btn">去使用</div>
                <van-icon v-show="page==''" class="arrow" :class="infoShow?'arrow-up':''" name="arrow-down" @click.stop="infoOpen()" />
                <!-- 标识 -->
                <div v-show="type!==1" class="mark">{{type=='ysy'?'已使用':'已过期'}}</div>
                <div v-show="couponObj.received && (page=='receive' || page=='shop')" class="mark_receive">已领取</div>
            </div>
        </div>

        <!-- 规则说明 -->
        <div v-show="infoShow" class="__info">
            <p style="margin-bottom: 15px">领取时间：{{ couponObj.userReceivedTime }}</p>
            <p>{{ couponObj.desc }}</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        obj: Object,
        // 卡片使用场景：已领取、未领取、适用商品页
        page: {
            type: String,
            default: ''
        },
        // 卡片类型：未使用、已使用、已过期
        type: {
            type: Number,
            default: 1
        },
    },
    data () {
        return {
            couponObj: this.obj,
            infoShow: false
        }
    },
    methods:{
        // 去使用
        use(){
            if (this.page == 'shop' || this.type !== 1) return;
            this.$router.push({ name: 'couponList', query: {obj: JSON.stringify(this.couponObj)} })
        },
        // 展开关闭规则说明
        infoOpen(){
            this.infoShow = !this.infoShow;
        },
        // 领取优惠券
        handleReceive(couponId){
            this.$api.coupon.getCoupon(couponId).then(res => {
                this.Util.tip('领取成功');
                this.couponObj.received = true;
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .coupon-card{
        width: 100%;
        >.__card{
            position: relative;
            height: 90px;
            border-radius: 8px;
            overflow: hidden;
            >.left{
                width: 95px;
                height: 100%;
                background: linear-gradient(to right,  rgba(255, 137, 47, 0.8), rgba(255, 179, 61, 1));
                padding: 26px 5px 0 0;
                >h5{
                    color: #fff;
                    font-weight: bold;
                    font-size: 28px;
                    text-align: center;
                    >font{
                        font-size: 14px;
                    }
                }
                >p{
                    color: #fff;
                    font-size: 11px;
                    text-align: center;
                }
            }
            >.right{
                background: rgba(255, 179, 61, 0.1);
                position: relative;
                padding: 14px 78px 14px 15px;
                >h5{
                    font-size: 14px;
                    font-weight: bold;
                }
                >p{
                    font-size: 11px;
                    color: #666;
                    margin-top: 8px;
                    &.today{
                        color: #ee0a24;
                    }
                }
                >.btn{
                    position: absolute;
                    top: 14px;
                    right: 10px;
                    color: rgba(255, 137, 47, 0.8);
                    border: 1px solid rgba(255, 179, 61, 1);
                    border-radius: 10px;
                    width: 60px;
                    height: 20px;
                    line-height: 19px;
                    text-align: center;
                    font-size: 11px;
                    font-weight: bold;
                    &.receive{
                        border: none;
                        background: rgba(255, 137, 47, 0.8);
                        color: #fff;
                        line-height: 20px;
                    }
                }
                >.mark{
                    position: absolute;
                    top: -10px;
                    right: -10px;
                    font-size: 11px;
                    width: 52px;
                    height: 46px;
                    line-height: 50px;
                    text-align: center;
                    border-radius: 100%;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    background: rgba(0, 0, 0, 0.03);
                    color: rgba(0, 0, 0, 0.4);
                    transform: rotate(30deg);
                    &::before{
                        content: '';
                        position: absolute;
                        top: 2px;
                        left: 2px;
                        right: 2px;
                        bottom: 2px;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                        border-radius: 100%;
                    }
                }
                >.mark_receive{
                    position: absolute;
                    bottom: -10px;
                    right: -10px;
                    font-size: 11px;
                    width: 52px;
                    height: 46px;
                    line-height: 42px;
                    text-align: center;
                    border-radius: 100%;
                    border: 1px solid rgba(255, 179, 61, 0.2);
                    background: rgba(255, 179, 61, 0.05);
                    color: rgba(255, 179, 61, 0.4);
                    transform: rotate(-30deg);
                    &::before{
                        content: '';
                        position: absolute;
                        top: 2px;
                        left: 2px;
                        right: 2px;
                        bottom: 2px;
                        border: 1px solid rgba(255, 179, 61, 0.2);
                        border-radius: 100%;
                    }
                }
                >.arrow{
                    padding: 10px 12px;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    font-size: 12px;
                    color: rgba(255, 179, 61, 1);
                    transition: all 0.2s;
                    &.arrow-up{
                        transform: rotate(-180deg);
                    }
                }
            }
            &::before, &::after{
                content: '';
                width: 10px;
                height: 10px;
                background: #fff;
                border-radius: 100%;
                position: absolute;
                left: 90px;
                z-index: 9;
            }
            &::before{
                top: -5px;
            }
            &::after{
                bottom: -5px;
            }
        }
        >.__info{
            position: relative;
            padding: 12px 10px 10px;
            &::before{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: calc(100% + 8px);
                border-top: none;
                border-left: solid rgba(255, 179, 61, 0.1);
                border-right: solid rgba(255, 179, 61, 0.1);
                border-bottom: solid rgba(255, 179, 61, 0.1);
                border-radius: 0 0 10px 10px;
                box-sizing: border-box;
            }
            >p{
                font-size: 12px;
                line-height: 20px;
            }
        }

        // 已使用 / 已过期
        &.gray{
            -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
            filter: grayscale(100%);
            .__card{
                >.left{
                    opacity: 0.6;
                }
            }
        }
    }
</style>