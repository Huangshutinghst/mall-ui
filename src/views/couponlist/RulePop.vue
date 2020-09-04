<template>
    <van-popup class="poupon-rule-pop flex flex-v panel__hidden" v-model="visible" @close="close" round position="bottom" :style="{ height: '50%' }">
        <div class="__top">
            优惠券说明
            <van-icon class="fr" name="cross" @click="close()" />
        </div>
        <div class="__content flex-1 panel__scroll">
            <h5>领取说明</h5>
            <p>1.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>2.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>3.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>4.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
            <p>5.介绍介绍介绍介绍介绍介绍介绍介绍；</p>
        </div>
    </van-popup>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        modal: Boolean
    },
    data () {
        return {
            visible: false,
        }
    },
    watch: {
        modal(val){
            this.visible = val;
        }
    },
    methods:{
        close(){
            this.visible = false;
            this.$emit('visible-change', false);
        }
    },
}
</script>

<style lang="scss" scoped>
    .poupon-rule-pop{
        >.__top{
            height: 40px;
            line-height: 40px;
            text-align: center;
            border-bottom: 1px solid #eee;
            font-size: 15px;
            font-weight: bold;
            padding-left: 40px;
            >i{
                vertical-align: middle;
                line-height: 40px;
                padding: 0 15px 0 10px;
            }
        }

        >.__content{
            padding: 15px 20px;
            >h5{
                font-size: 14px;
                font-weight: bold;
            }
            >p{
                font-size: 14px;
                margin-top: 8px;
            }
        }
    }
</style>
