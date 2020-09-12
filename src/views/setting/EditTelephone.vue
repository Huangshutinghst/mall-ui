<!-- 修改手机号 -->
<template>
    <div class="setting-telephone panel__hidden">
        <VHeader title="" leftText="修改手机号"></VHeader>

        <div class="setting-telephone__content">
            <van-cell-group class="form bg_fff">
                <van-field
                        type="tel"
                        v-model="telphone"
                        maxlength="15"
                        placeholder="请输入手机号"
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
            telphone: undefined
        }
    },
    components: {
        VHeader
    },
    methods:{
        submit(){
            const _this = this
            if (_this.RegExpUtil.checkMobile(_this.telphone)) {
                const userInfo = {
                    phone: this.telphone
                }
                this.$api.mine.updateUserInfo(userInfo).then(() => {
                    this.$router.back(-1);
                }).catch(e => {
                    console.log(e)
                })
            } else {
                this.Util.tip('请输入正确手机号');
            }
        }
    },
    mounted() {
        this.telphone = this.$route.query.telphone
    }
}
</script>

<style lang="scss" scoped>
    .setting-telephone{
        .setting-telephone__content{
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
