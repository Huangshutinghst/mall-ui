<template>
    <div class="mall_login scroll-hidden">
        <van-form @submit="loginSubmit">
            <van-field
                v-model="formInline.username"
                label="用户名"
                placeholder="请输入用户名"
                :rules="[{ required: true}]"
            />
            <van-field
                v-model="formInline.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="请输入密码"
                :rules="[{ required: true}]"
            />
            <div class="loagin_submit_btn">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data(){
        return {
            formInline: {
                username: undefined,
                password: undefined
            }
        }
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .mall_login{
        .loagin_submit_btn{
            margin: 16px;
        }
    }
</style>