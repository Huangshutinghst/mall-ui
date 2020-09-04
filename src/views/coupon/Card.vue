<!-- 优惠券卡片 -->
<template>
    <div class="coupon-card" :class="type=='wsy'?'':'gray'">
        <!-- 卡片 -->
        <div class="__card flex" @click="use()">
            <div class="left">
                <h5><font>￥</font>10</h5>
                <p>满10元可用</p>
            </div>
            <div class="right flex-1">
                <h5>四周年神券 (福州通用)</h5>
                <p>09月01日-10月01日有效</p>
                <!-- <p class="today">今天到期</p> -->
                <!-- 按钮 -->
                <div v-if="isReceive=='receive' && type=='wsy'" class="btn receive" @click.stop="receive()">领取</div>
                <div v-if="isReceive=='' && type=='wsy'" class="btn">去使用</div>
                <!-- 标识 -->
                <div v-if="type!=='wsy'" class="mark">{{type=='ysy'?'已使用':'已过期'}}</div>
                <!-- 下拉按钮 -->
                <van-icon class="arrow" :class="infoShow?'arrow-up':''" name="arrow-down" @click.stop="infoOpen()" />
            </div>
        </div>

        <!-- 规则说明 -->
        <div v-show="infoShow" class="__info">
            <p>领取时间：2020-09-22 10:52:00</p>
            <p style="margin-bottom: 15px">编号：ijsfoajalj</p>
            <p>1.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>2.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>3.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>4.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>5.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>6.介绍介绍介绍介绍介绍介绍介绍介绍。</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        page: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'wsy'
        },
    },
    data () {
        return {
            isReceive: this.page,
            infoShow: false,
        }
    },
    watch: {
        page(val){
            this.isReceive = val;
        }
    },
    methods:{
        // 去使用
        use(){
            if (this.type !== 'wsy') return;
            this.$router.push({ name: 'couponList' });
        },
        // 展开关闭规则说明
        infoOpen(){
            this.infoShow = !this.infoShow;
        },
        // 领取优惠券
        receive(){
            this.isReceive = '';
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
                padding: 22px 5px 0 0;
                >h5{
                    color: #fff;
                    font-weight: bold;
                    font-size: 36px;
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