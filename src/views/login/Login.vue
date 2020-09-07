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
import {mapActions} from 'vuex'
export default {
    data(){
        return {
            formInline: {
                username: 'zhangsan',
                password: 'zhangsan'
            }
        }
    },
    methods: {
        ...mapActions([
            'setSinger'
        ]),
        loginSubmit(){
            // this.$api.login.login({        
            //     username: this.formInline.username,
            //     password: this.formInline.password
            // }).then(res=> {
            //     console.log(res)  
            // })   
            this.$api.home.search({        
                productName: this.formInline.username,
            }).then(res => {
                console.log(res)  
            }).catch(e => {
                console.log(e)
            })

            // this.setSinger({
            //     list: [1],
            //     index: 1
            // })
            // this.$router.replace({ name: 'Layout' });
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