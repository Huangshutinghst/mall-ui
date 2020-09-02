<!-- 步进器 -->
<template>
    <div class="commodity-stepper flex flex-pack-justify">
        <div class="round reduce" @click.stop="reduce()">—</div>
        <div class="num">{{num}}</div>
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
            if(this.count <= 1) return;
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
        border: 1px solid #dfdfdf;
        border-radius: 10px;
        .num{
            font-size: 12px;
            width: 20px;
            line-height: 18px;
            text-align: center;
        }
        .round{
            width: 20px;
            height: 18px;
            text-align: center;
            &.reduce{
                line-height: 16px;
                font-size: 8px;
                font-weight: bold;
                border-right: 1px solid #dfdfdf;
            }
            &.add{
                line-height: 18px;
                font-size: 18px;
                border-left: 1px solid #dfdfdf;
                &.disable{
                    color: #dfdfdf;
                }
            }
        }
    }
</style>
