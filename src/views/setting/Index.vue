<!-- 账号管理 -->
<template>
    <div class="setting-index panel__hidden">
        <VHeader title="" leftText="账号管理"></VHeader>

        <div class="setting-index__content panel__content">
            <ul class="bg_fff">
                <!-- 头像 -->
                <li class="flex flex-align-center" @click="editHead()">
                    <div class="box flex flex-align-center flex-pack-justify">
                        <div class="left">
                            <h5>头像</h5>
                        </div>
                        <div class="right">
                            <img class="head-image" src="../../images/default_head_pic.png" />
                            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                        </div>
                    </div>
                </li>
                <!-- 昵称 -->
                <li class="flex flex-align-center" @click="editNickname()">
                    <div class="box flex flex-align-center flex-pack-justify">
                        <div class="left">
                            <h5>昵称</h5>
                            <p>{{ userInfo.nickname }}</p>
                        </div>
                        <div class="right">
                            修改
                            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                        </div>
                    </div>
                </li>
                <!-- 手机号 -->
                <li class="flex flex-align-center" @click="editTelephone()">
                    <div class="box flex flex-align-center flex-pack-justify">
                        <div class="left">
                            <h5>手机号</h5>
                            <p>{{ userInfo.phone !== undefined && userInfo.phone !== null  ? Util.maskPhone(userInfo.phone): '' }}</p>
                        </div>
                        <div class="right">
                            修改
                            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                        </div>
                    </div>
                </li>
                <!-- 修改密码 -->
                <li class="flex flex-align-center" @click="editPassword()">
                    <div class="box flex flex-align-center flex-pack-justify">
                        <div class="left">
                            <h5>密码</h5>
                        </div>
                        <div class="right">
                            修改
                            <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
                        </div>
                    </div>
                </li>
            </ul>

            <div class="btn-login-out bg_fff" @click="loginOut()">
                退出登录
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
export default {
    data () {
        return {
           userInfo: {}
        }
    },
    components: {
        VHeader
    },
    mounted() {
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
            this.$api.mine.getUserInfo().then(res => {
                this.userInfo = res.data.data;
            }).catch(e => {
                console.log(e)
            })
        },
         // 修改头像
        editHead(){
            this.Util.tip('暂未支持自定义头像');
        },
        // 修改昵称
        editNickname(){
            this.$router.push({ name: 'editNickName', query:{ nickname: this.userInfo.nickname } })
        },
        // 修改手机号
        editTelephone(){
            this.$router.push({ name: 'editTelephone', query:{ telphone: this.userInfo.phone } })
        },
        // 修改密码
        editPassword() {
            this.$router.push({ name: 'editPassword' })
        },
        // 退出登录
        loginOut(){
            this.$dialog.confirm({
                message: '确定退出登录吗？',
                confirmButtonText: '确定'
            })
            .then(() => {
                // on confirm
                localStorage.removeItem('token');
                this.$router.replace({ path: '/login', query: { redirect: this.$router.currentRoute.fullPath }});
            })
            .catch(() => {
                // on cancel
            });
        }
    },
}
</script>

<style lang="scss" scoped>
    .setting-index{
        .setting-index__content{
            >ul{
                margin: 14px 0;
                >li{
                    height: 56px;
                    &:not(:last-child){
                        border-bottom: 1px solid rgba(238, 238, 238, 0.4);
                    }
                    >.box{
                        width: 100%;
                        padding: 0 10px;
                        overflow: hidden;
                        >.left{
                            h5{
                                font-size: 12px;
                            }
                            p{
                                font-size: 12px;
                                color: #999;
                                margin-top: 2px;
                            }
                        }
                        >.right{
                            height: 40px;
                            line-height: 40px;
                            font-size: 12px;
                            color: #999;
                            >.van-icon{
                                font-size: 14px;
                                color: #999;
                                vertical-align: middle;
                                margin-top: -2px;
                                margin-left: 0;
                            }
                            .head-image{
                                display: inline-block;
                                width: 40px !important;
                                height: 40px !important;
                                vertical-align: top;
                            }
                        }
                    }
                }
            }

            >.btn-login-out{
                margin: 14px 0;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 12px;
                color: #ee0a24;
            }
        }
    }
</style>
