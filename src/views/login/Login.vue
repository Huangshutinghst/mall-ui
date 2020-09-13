<template>
    <div class="mall_login scroll-hidden">
        <VHeader title="账号登陆" leftText=""></VHeader>
        <van-form @submit="loginSubmit">
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
            <div class="loagin_submit_btn">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
        <div class="register_btn" @click="toRegister">注册</div>
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
        loginSubmit(){
            // todo 测试用，待删除
            if (this.formInline.username === undefined && this.formInline.password === undefined) {
                this.formInline = {
                    username: 'zhangsan',
                    password: 'zhangsan'
                }
            }

            const userInfo = {
                username: this.formInline.username,
                password: this.Md5Util.getEncryption(this.formInline.password)
            }
            this.$api.login.login(userInfo).then(res => {
                localStorage.setItem('token', res.headers.authorization);
                this.$router.replace({ path: '/' });
            }).catch(e => {
                console.log(e)
            })
        },
        toRegister() {
            this.$router.push({ path: '/register' });
        }
    }
}
</script>

<style lang="scss" scoped>
    .mall_login{
        .van-form /deep/{
            margin-top: 100px;
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
        .loagin_submit_btn{
            margin: 26px 60px 14px;
        }
        /deep/ .van-button--info{
            background: #0db059;
            border: 1px solid #0db059;
        }
        .register_btn{
            font-size: 14px;
            color: #0db059;
            text-align: center;
        }
    }
</style>