<!-- 修改昵称 -->
<template>
    <div class="setting-nickname panel__hidden">
        <VHeader title="" leftText="修改昵称"></VHeader>

        <div class="setting-nickname__content">
            <van-cell-group class="form bg_fff">
                <van-field v-model="nickname" />
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
            nickname: '胖大喵'
        }
    },
    components: {
        VHeader
    },
    methods:{
        submit(){
            if(this.nickname !== ''){
                this.$router.back(-1);
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .setting-nickname{
        .setting-nickname__content{
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