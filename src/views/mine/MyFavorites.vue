<!-- 我的收藏 -->
<template>
    <div class="mall-favorites panel__hidden">
        <VHeader title="" leftText="我的收藏"></VHeader>

        <div ref="scroll-view" class="panel__scroll panel__content">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
            <ul class="mall-favorites__list bg_fff">
                <li class="__item" v-for="(item,index) in goodList" :key="index">
                    <Card
                            v-if="!item.flashing"
                            :cardInfo="item"
                    ></Card>
                    <CardLimit
                            v-if="item.flashing"
                            :cardInfo="item"
                    ></CardLimit>
                </li>
            </ul>
            </van-list>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
import Card from '../card/Card'
import CardLimit from "../card/CardLimit";
export default {
    data () {
        return {
            formInline: {
                offset: 0,
                limit: 10
            },
            goodList: [],
            loading: false,
            finished: false
        }
    },
    components: {
        VHeader,
        Card,
        CardLimit
    },
    beforeRouteLeave(to, from, next){
        const { name } = to;
        if (name == 'mine') {
            from.meta.keepAlive = false;
            from.meta.scrollPos = { x: 0, y: 0 };
        } else {
            from.meta.keepAlive = true;
            from.meta.scrollPos = { x: this.$refs['scroll-view'].scrollTop, y: 0 }
        }
        next();
    },
    beforeRouteEnter(to, from, next){
        next((vm) => {
            vm.$refs['scroll-view'].scrollTop = vm.$route.meta.scrollPos.x;
        })
    },
    methods:{
        onLoad() {
            const _this = this
            _this.loading = true;
            _this.$api.mine.getFavoriteList(_this.formInline).then(res => {
                _this.loading = false;
                if (res.data.data.list.length === 0) {
                    _this.finished = true;
                } else {
                    _this.formInline.offset = _this.formInline.offset + _this.formInline.limit
                    res.data.data.list.forEach(item => {
                        _this.goodList.push(item)
                    })
                }
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .mall-favorites{
        .mall-favorites__list{
            .__item{
                position: relative;
                &::after{
                    content: '';
                    position: absolute;
                    left: 15px;
                    right: 15px;
                    bottom: 0;
                    height: 1px;
                    width: calc(100% - 30px);
                    background: rgba(238,238,238,0.8);
                }
                
            }
        }
    }
</style>
