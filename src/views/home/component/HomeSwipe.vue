<template>
    <div class="home-swiper">
        <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
        <!-- <van-swipe class="home-swipe" indicator-color="white"> -->
            <van-swipe-item v-for="(image, index) in imageList" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            imageList: [
                '',
                '',
                '',
                '',
            ],
        }
    },
    components: {

    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
    .home-swiper{
    
    }
</style>

<style lang="scss">
    .home-swipe {
        height: 150px;
        overflow: hidden;
        .van-swipe__indicator{
            background: rgba(0, 0, 0, 0.5);
        }
        .van-swipe-item {
            height: 150px;
            overflow: hidden;
            background-color: #eee;
        }
    }
</style>
