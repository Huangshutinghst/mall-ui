<!-- 修改密码 -->
<template>
    <div class="setting-password panel__hidden">
        <VHeader title="" leftText="修改密码"></VHeader>

        <div class="setting-password__content">
            <van-cell-group class="form bg_fff">
                <van-field
                        type="password"
                        v-model="oldPassword"
                        maxlength="20"
                        placeholder="请输入旧密码"
                />
            </van-cell-group>
            <van-cell-group class="form bg_fff">
                <van-field
                        type="password"
                        v-model="newPassword"
                        maxlength="20"
                        placeholder="请输入新密码"
                />
            </van-cell-group>
            <div class="btn-submit bg_fff" @click="submit()">
                确认保存
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
export default {
    data () {
        return {
            oldPassword: undefined,
            newPassword: undefined
        }
    },
    components: {
        VHeader
    },
    methods:{
        submit(){
            const _this = this
            if (_this.RegExpUtil.checkPassword(_this.newPassword)) {
                const password = {
                    oldPassword: this.Md5Util.getEncryption(this.oldPassword),
                    newPassword: this.Md5Util.getEncryption(this.newPassword)
                }
                this.$api.mine.changePassword(password).then(() => {
                    localStorage.removeItem('token');
                    _this.$router.replace({ path: '/login', query: { redirect: _this.$router.currentRoute.fullPath }
                    });
                }).catch(e => {
                    console.log(e)
                })
            } else {
                this.Util.tip('密码只能包含大于六位的字母、数字和下划线');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.setting-password{
    .setting-password__content{
        >.form{
            height: 40px;
            margin: 14px 0;
        }
        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
            border-width: 0;
        }
        >.btn-submit{
            margin: 14px 0;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 12px;
        }
    }
}
</style>
