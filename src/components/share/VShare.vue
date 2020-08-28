<!-- 分享面板组件 -->
<template>
    <div class="share-panel">
        <van-share-sheet
            v-model="visible"
            :title="title"
            :options="options"
            @select="onSelect"
            @cancel="onCancle"
            @click-overlay="onCancle"
        />
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        modal: Boolean,
        title: String,
    },
    watch:{
        modal(val){
            if(val){
                this.visible = val;
            }
        }
    },
    data () {
        return {
            visible: false,
            options: [
                { name: '微信', icon: 'wechat' },
                { name: 'QQ', icon: 'qq' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
            ],
        }
    },
    components: {

    },
    methods:{
        onSelect(option) {
            this.$toast(option.name);
            this.onCancle();
        },
        onCancle(){
            this.visible = false;
            this.$emit('visible-change', false);
        },
    },
}
</script>

<style lang="scss" scoped>
    .share-panel{

    }
</style>
