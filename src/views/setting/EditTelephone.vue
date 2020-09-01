<!-- 修改手机号 -->
<template>
    <div class="setting-telephone panel__hidden">
        <VHeader title="" leftText="验证原手机号"></VHeader>

        <div class="setting-telephone__content">
            <van-cell-group class="form bg_fff">
                <van-field v-model="telphone" label="原手机号" readonly />
            </van-cell-group>
            <van-field
                v-model="sms"
                center
                clearable
                label="验证码"
                placeholder="请输入验证码"
                >
                <template #button>
                    <van-button size="small" type="primary">获取验证码</van-button>
                </template>
            </van-field>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
export default {
    data () {
        return {
            telphone: '178****8888',
            sms: ''
        }
    },
    components: {
        VHeader
    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
    .setting-telephone{
        .setting-telephone__content{


        }
    }
</style>
