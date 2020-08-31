<template>
    <div class="v-blank-panel">
        <van-empty :description="text" />
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props: {
        text: String
    },
    data () {
        return {

        }
    },
    components: {

    },
    methods:{

    },
}
</script>

<style lang="scss">
    .v-blank-panel{
        width: 100%;
        height: 100%;
        >.van-empty{
            width: 100%;
            height: 90%;
            >.van-empty__image{
                width: 100px;
                height: 100px;
            }
            >.van-empty__description{
                font-size: 12px;
            }
        }
    }
</style>
