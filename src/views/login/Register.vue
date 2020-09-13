<template>
    <div class="mall_register scroll-hidden">
        <van-form @submit="registerSubmit">
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
            <div class="register_submit_btn">
                <van-button round block type="info" native-type="submit">
                    注册
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
        .register_submit_btn{
            margin: 16px;
        }
    }
</style>