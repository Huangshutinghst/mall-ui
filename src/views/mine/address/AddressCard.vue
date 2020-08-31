<template>
    <div class="address-card flex flex-pack-justify">
        <div class="__info flex flex-v flex-pack-justify flex-1">
            <h5>
                这是小区名
                <span class="orange">家</span>
                <!-- <span class="orange">父母家</span>
                <span class="purple">朋友家</span>
                <span class="blue">公司</span>
                <span class="green">学校</span> -->
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
                    font-size: 10px;
                    padding: 0 6px;
                    vertical-align: middle;
                    border-radius: 4px;
                    min-width: 20px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    margin-top: -2px;
                    &.orange{
                        color: #ff6f00;
                        border: 1px solid #ff6f00;
                        background: rgba(255, 111, 0, 0.1);
                    }
                    &.purple{
                        color: #5030c0;
                        border: 1px solid #5030c0;
                        background: rgba(80, 48, 192, 0.1);
                    }
                    &.blue{
                        color: #3698fb;
                        border: 1px solid #3698fb;
                        background: rgba(54, 152, 251, 0.1);
                    }
                    &.green{
                        color: #02a96b;
                        border: 1px solid #02a96b;
                        background: rgba(2, 169, 107, 0.1);
                    }
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
                font-size: 16px;
                color: #aaa;
                padding: 5px;
            }
        }
    }
</style>
