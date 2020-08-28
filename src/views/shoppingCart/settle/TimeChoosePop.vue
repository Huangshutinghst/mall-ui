<!-- 底部弹出 时间选择器 -->
<template>
    <div class="time-choose-popup">
        <van-popup v-model="visible" @close="close" position="bottom" :style="{ height: '30%' }">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                title="选择送达时间"
                confirm-button-text="确定"
                :columns-order="['month', 'day', 'year']"
                :formatter="formatter"
                @confirm="confirm"
                @cancel="close"
            />
        </van-popup>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        modal: Boolean
    },
    data () {
        return {
            visible: false,
            currentDate: new Date(),
        }
    },
    watch:{
        modal(val){
            if(val){
               this.visible = val; 
            }
        }
    },
    components: {

    },
    methods:{
        formatter(type, val) {
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }
            return val;
        },
        close(){
            this.visible = false;
            this.$emit('visible-change', false);
        },
        confirm(value){
            console.log(this.DateUtil.format(value, 'yyyy-MM-dd hh:mm:ss'))
            //this.close();
        }
    },
}
</script>

<style lang="scss">
    .time-choose-popup{
        .van-picker{
            height: 100% !important;
            .van-picker__toolbar{
                height: 40px;
            }
            .van-picker__columns{
                height: calc(100% - 40px) !important;
                .van-picker-column__item, .van-picker__frame{
                    // height: 30px !important;
                }
            }
        }
    }
</style>
