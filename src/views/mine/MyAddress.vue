<!-- 地址管理 -->
<template>
    <div class="mall-address panel__hidden">
        <VHeader title="" :leftText="$route.query.choose?'选择地址':'地址管理'">
            <div slot="right" @click="addAddress()">添加地址</div>
        </VHeader>

        <div class="panel__scroll panel__content">
            <ul v-if="addressList.length > 0" class="mall-address-list">
                <li class="bg_fff" v-for="(item,index) in addressList" :key="index" @click="addressChoose(item)">
                    <AddressCard :addressItem="item"></AddressCard>
                </li>
            </ul>

            <VBlank v-else text="暂无地址"></VBlank>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import AddressCard from './address/AddressCard'
export default {
    data () {
        return {
            formInline: {
                offset: 0,
                limit: 20,
            },
            addressList: []
        }
    },
    components: {
        VHeader,
        AddressCard,
    },
    mounted(){
        this.getAddressList();
    },
    methods:{
        getAddressList(){
            this.$api.mine.getAddressList(this.formInline).then(res => {
                this.addressList = res.data.data.list;
            }).catch(e => {
                console.log(e)
            })
        },
        addAddress(){
            this.$router.push({name:'addressAdd'});
        },
        addressChoose(address){
            if(this.$route.query.choose){
                this.$store.commit('CHANGE_CURRENT_ADDRESS', address);
                this.$router.push({ name: 'settle' });
            }
        },
    },
}
</script>

<style lang="scss" scoped>
    .mall-address{
        .mall-address-list{
            >li{
                height: 80px;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
        }
    }
</style>
