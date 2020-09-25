<!-- 步进器 -->
<template>
    <div class="commodity-stepper flex flex-pack-justify">
        <div class="btn" v-if="num == 0" @click.stop="add()">立即抢</div>
        <template v-else>
            <div v-show="num > 0" class="round reduce" @click.stop="reduce()">—</div>
            <div v-show="num > 0" class="num">{{num}}</div>
            <div class="round add" :class="{disable: num >= limit}" @click.stop="add()">+</div>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        limit: Number,
        count: Number,
        productId: Number,
    },
    data () {
        return {
            num: this.count,
            selectFlag: true,
        }
    },
    watch: {
        count(val){
            this.num = val;
        }
    },
    methods:{
        reduce(){
            this.changeCartCount(this.num - 1, 0);
        },
        add(){
            if(this.num >= this.limit) return;
            this.changeCartCount(this.num + 1, 1);
        },
        changeCartCount(num, type){
            if(!this.selectFlag) return;
            this.selectFlag = false;
            this.$api.shoppingCart.cartAdd({
                productId: this.productId,
                quantity: num
            }).then(res => {
                if(type == 0){
                    this.$emit('count-change', -1);
                    this.$store.commit('GET_SHOP_CARD_COUND');
                }else if(type == 1){
                    this.$emit('count-change', 1);
                    this.$store.commit('GET_SHOP_CARD_COUND');
                }
                this.$store.commit('checkedChange', {
                    type: type,
                    count: num,
                    productId: this.productId
                });
                this.selectFlag = true;
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .commodity-stepper{
        .btn{
            text-align: center;
            color: #fff;
            font-size: 10px;
            width: 56px;
            height: 18px;
            line-height: 18px;
            border-radius: 10px;
            background: #ee0a24;
            margin-top: -1px;
            &.disable{
                background: #999;
            }
        }
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
                border: 1px solid #ee0a24;
                color: #ee0a24;
                line-height: 14px;
                font-size: 8px;
                font-weight: bold;
            }
            &.add{
                background: #ee0a24;
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
