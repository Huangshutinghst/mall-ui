<template>
    <div class="mall_register scroll-hidden">
        <VHeader title="账号注册" leftText=""></VHeader>

        <div class="title">Mall</div>

        <van-form @submit="registerSubmit">
            <van-field
                    v-model="formInline.username"
                    placeholder="请输入用户名"
                    :rules="[{ required: true}]"
            />
            <van-field
                    v-model="formInline.password"
                    type="password"
                    name="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true}]"
            />
            <div class="register_submit_btn">
                <van-button round block type="info" native-type="submit">
                    注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
export default {
    data(){
        return {
            formInline: {
                username: undefined,
                password: undefined
            }
        }
    },
    components: {
        VHeader
    },
    methods: {
        registerSubmit(){
            const _this = this
            if (!_this.RegExpUtil.checkUsername(_this.formInline.username)) {
                _this.Util.tip('用户名只能包含字母和数字');
                return;
            }

            if (!_this.RegExpUtil.checkPassword(_this.formInline.password)) {
                _this.Util.tip('密码只能包含大于六位的字母、数字和下划线');
                return;
            }

            const userInfo = {
                username: _this.formInline.username,
                password: _this.Md5Util.getEncryption(_this.formInline.password)
            }
            _this.$api.login.register(userInfo).then(res => {
                _this.$router.push({ path: '/login' });
            }).catch(e => {
                console.log(e)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .mall_register{
        >.title{
            width: 60px;
            height: 60px;
            line-height: 60px;
            background: #0db059;
            border-radius: 10px;
            text-align: center;
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            margin: 40px auto;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: -6px;
                top: -6px;
                width: 70px;
                height: 70px;
                border-radius: 26px;
                border: 1px solid #eee;
            }
        }

        .van-form /deep/{
            margin-top: 40px;
            .van-cell{
                padding: 10px 20px;
                &::after{
                    border-bottom: 1px solid rgb(59, 59, 59);
                }
            }
            .van-field__control{
                text-align: center;
            }
        }
        .register_submit_btn{
            margin: 26px 60px 14px;
            font-size: 14px;
            color: #0db059;
            text-align: center;
        }
        /deep/ .van-button--info{
            background: #0db059;
            border: 1px solid #0db059;
        }
    }
</style>