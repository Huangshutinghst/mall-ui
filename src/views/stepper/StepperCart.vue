<!-- 步进器 -->
<template>
    <div class="commodity-stepper flex flex-pack-justify">
        <div class="round reduce" @click.stop="reduce()">—</div>
        <div class="num">{{num}}</div>
        <div class="round add" :class="{disable: num >= limit}" @click.stop="add()">+</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        cartId: Number,
        productId: Number,
        limit: Number,
        count: Number,
        index: Number,
        hasStock: Boolean
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
    methods:{
        reduce(){
            if(!this.hasStock) return;
            if(this.num <= 1) {
                this.$dialog.confirm({
                    title: '',
                    message: '是否从购物车中删除？',
                    confirmButtonText: '确定'
                })
                .then(() => {
                    // on confirm
                    this.$parent.$parent.deleteItem(this.cartId, this.productId, this.index);
                })
                .catch(() => {
                    // on cancel
                });
            }else{
                this.changeCartCount(this.num - 1, 0);   
            }
        },
        add(){
            if(!this.hasStock) return;
            if(this.num >= this.limit) return;
            this.changeCartCount(this.num + 1, 1);
        },
        changeCartCount(num, type){
            this.$api.shoppingCart.cartAdd({
                cartId: this.cartId,
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
            }).catch(e => {
                console.log(e)
            })
        }
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
            line-height: 18px;
            &.reduce{
                font-size: 8px;
                font-weight: bold;
                border-right: 1px solid #dfdfdf;
            }
            &.add{
                font-size: 18px;
                border-left: 1px solid #dfdfdf;
                &.disable{
                    color: #dfdfdf;
                }
            }
        }
    }
</style>
