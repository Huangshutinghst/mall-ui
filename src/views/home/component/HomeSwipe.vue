<template>
    <div class="home-swiper">
        <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in imageList" :key="index" @click="handleActive(image)">
                <img v-lazy="$api.img + image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            imageList: [],
        }
    },
    mounted() {
        this.getTodayActivity();
    },
    methods:{
        getTodayActivity(){
            this.$api.home.getTodayActivity().then(res => {
                this.imageList = res.data.data;
            }).catch(e => {
                console.log(e)
            })
        },
        handleActive(row){
            this.$router.push({ name: 'active', query: {id: row.activityId, pic: row.pic} })
        }
    },
}
</script>

<style lang="scss">
    .home-swipe {
        height: 160px;
        overflow: hidden;
        .van-swipe__indicator{
            background: rgba(0, 0, 0, 0.5);
        }
        .van-swipe-item {
            height: 160px;
            overflow: hidden;
            background-color: #eee;
        }
    }
</style>
