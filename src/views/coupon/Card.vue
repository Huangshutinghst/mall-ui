<!-- 优惠券卡片 -->
<template>
    <div class="coupon-card">
        <!-- 卡片 -->
        <div class="__card flex" @click="use()">
            <div class="left">

            </div>
            <div class="right flex-1">

            </div>
        </div>
        <!-- 规则 -->
        <div class="__info">

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            //去使用
            use(){
                
            }
        }
    },
    components: {

    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
    .coupon-card{
        width: 100%;
        >.__card{
            position: relative;
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            >.left{
                width: 85px;
                height: 100%;
                background: linear-gradient(to right,  rgba(255, 137, 47, 0.9), rgba(255, 179, 61, 1));
            }
            >.right{
                background: rgba(255, 170, 31, 0.15);
            }
            &::before, &::after{
                content: '';
                width: 10px;
                height: 10px;
                background: #fff;
                border-radius: 100%;
                position: absolute;
                left: 80px;
            }
            &::before{
                top: -5px;
            }
            &::after{
                bottom: -5px;
            }
        }
        >.__info{

        }
    }
</style>