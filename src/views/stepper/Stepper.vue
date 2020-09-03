<!-- 步进器 -->
<template>
    <div class="commodity-stepper flex flex-pack-justify">
        <div v-show="count > 0" class="round reduce" @click.stop="reduce()">—</div>
        <div v-show="count > 0" class="num">{{num}}</div>
        <div class="round add" :class="{disable: count >= limit}" @click.stop="add()">+</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        limit: Number,
        count: Number,
    },
    data () {
        return {
            num: this.count,
        }
    },
    watch: {
        count(val){
            this.num = val;
        }
    },
    components: {

    },
    methods:{
        reduce(){
            this.$emit('count-change', -1);
        },
        add(){
            if(this.count >= this.limit) return;
            this.$emit('count-change', 1);
        },
    },
}
</script>

<style lang="scss" scoped>
    .commodity-stepper{
        .num{
            font-size: 12px;
            width: 20px;
            line-height: 16px;
            text-align: center;
        }
        .round{
            width: 16px;
            height: 16px;
            border-radius: 100%;
            text-align: center;
            &.reduce{
                border: 1px solid #0db059;
                color: #0db059;
                line-height: 14px;
                font-size: 8px;
                font-weight: bold;
            }
            &.add{
                background: #0db059;
                color: #fff;
                line-height: 16px;
                font-size: 16px;
                &.disable{
                    background: rgba(153, 153, 153, 0.7);
                }
            }
        }
    }
</style>
