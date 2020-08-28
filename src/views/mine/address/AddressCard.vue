<template>
    <div class="address-card flex flex-pack-justify">
        <div class="__info flex flex-v flex-pack-justify flex-1">
            <h5>
                这是小区名
                <span>标签1</span>
                <span>标签2</span>
            </h5>
            <p class="p1">这是详细地址-门牌号</p>
            <p class="p2">
                <span>胖大喵</span>
                <span>1788888888</span>
            </p>
        </div>
        <div class="__btn flex flex-v flex-pack-center">
            <van-icon class="__edit" name="edit" @click="editAddress()" />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        addressItem: Object,
    },
    data () {
        return {

        }
    },
    components: {

    },
    methods:{
        editAddress(){
            this.$router.push({name:'addressEdit'});
        }
    },
}
</script>

<style lang="scss" scoped>
    .address-card{
        width: 100%;
        height: 100%;
        >.__info{
            padding: 0 10px 0 14px;
            >h5{
                font-size: 14px;
                font-weight: bold;
                >span{
                    display: inline-block;
                    font-weight: normal;
                    font-size: 12px;
                    padding: 2px 4px;
                    background: #eee;
                    color: #999;
                    transform: scale(0.8);
                    vertical-align: baseline;
                }
            }
            >.p1{
                font-size: 12px;
            }
            >.p2{
                font-size: 12px;
                color: #999;
            }
        }
        >.__btn{
            width: 40px;
            text-align: center;
            >.__edit{
                padding: 5px;
            }
        }
    }
</style>
