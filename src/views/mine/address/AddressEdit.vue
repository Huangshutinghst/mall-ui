<template>
    <div class="mall-address-form panel__hidden bg_fff">
        <VHeader title="" leftText="编辑收货地址">
            <div slot="right" @click="delAddress()">删除</div>
        </VHeader>

        <div class="panel__scroll panel__content">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="formInline.username"
                    name="收货人"
                    label="收货人："
                    placeholder="收货人姓名"
                />
                <van-field class="__none_radio" name="性别" label=" ">
                    <template #input>
                        <van-radio-group v-model="formInline.gender" direction="horizontal">
                            <van-radio name="1">先生</van-radio>
                            <van-radio name="2">女士</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                    v-model="formInline.telephone"
                    name="电话号码"
                    label="电话号码："
                    placeholder="收货人手机号码"
                />
                <van-field
                    v-model="formInline.community"
                    name="收货小区"
                    label="收货小区："
                    placeholder="小区名称/写字楼等"
                />
                <van-field
                    v-model="formInline.houseNumber"
                    name="收货地址"
                    label=" "
                    placeholder="楼号/门牌号"
                />
                <van-field class="__none_checkbox" name="地址类型" label="地址类型：">
                    <template #input>
                        <!-- <van-checkbox-group v-model="formInline.type" direction="horizontal">
                            <van-checkbox name="1" shape="square">家</van-checkbox>
                            <van-checkbox name="2" shape="square">父母家</van-checkbox>
                            <van-checkbox name="3" shape="square">朋友家</van-checkbox>
                            <van-checkbox name="4" shape="square">公司</van-checkbox>
                            <van-checkbox name="5" shape="square">学校</van-checkbox>
                        </van-checkbox-group> -->
                        <van-radio-group v-model="formInline.type" direction="horizontal">
                            <van-radio name="1" shape="square">家</van-radio>
                            <van-radio name="2" shape="square">父母家</van-radio>
                            <van-radio name="3" shape="square">朋友家</van-radio>
                            <van-radio name="4" shape="square">公司</van-radio>
                            <van-radio name="5" shape="square">学校</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <div style="margin: 40px 50px;">
                    <van-button round block type="info" native-type="submit">
                    保存收货地址
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../../components/VHeader'
export default {
    data () {
        return {
            formInline: {
                username: '',
                gender: '',
                telephone: '',
                community: '',
                houseNumber: '',
                type: ''
            }
        }
    },
    components: {
        VHeader,
    },
    methods:{
        onSubmit(){
            var thiz = this;
            console.log(thiz.formInline)
            if(thiz.formInline.username == ''){
                thiz.$toast('请填写收货人姓名');
                return;
            }
            if(thiz.formInline.gender == ''){
                thiz.$toast('请选择性别');
                return;
            }
            if(thiz.formInline.telephone == '' || !thiz.RegExpUtil.checkMobile(thiz.formInline.telephone)){
                thiz.$toast('请输入有效的手机号码');
                return;
            }
            if(thiz.formInline.community == ''){
                thiz.$toast('请先选择小区');
                return;
            }
            thiz.$router.back(-1);
        },
        delAddress(){
            var thiz = this;
            thiz.$dialog.confirm({
                title: '',
                message: '确认删除该地址？',
            })
            .then(() => {
                // on confirm
                thiz.$router.back(-1);
            })
            .catch(() => {
                // on cancel
            });
        }
    },
}
</script>

<style lang="scss">
    .mall-address-form{
        .van-field__label{
            width: 70px;
        }
        .__none_checkbox, .__none_radio{
            padding-bottom: 0;
            .van-icon{
                display: none;
            }
            .van-checkbox__label, .van-radio__label{
                margin: 0;
            }
            .van-checkbox, .van-radio{
                border: 1px solid #eee;
                padding: 1px 6px;
                margin-bottom: 12px;
                &[aria-checked=true]{
                    background: #0db059;
                    border: 1px solid #0db059;
                    .van-checkbox__label, .van-radio__label{
                        color: #fff;
                    }
                }
            }
        }

        .van-button{
            height: 40px;
        }
        .van-button--info{
            background: linear-gradient(to right, #0db059, #089460);
            border: none;
        }
    }
</style>