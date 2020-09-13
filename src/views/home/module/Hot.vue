<!-- 热门商品 -->
<template>
    <div class="module-hot">
        <van-list
                class="bg_fff"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <ul class="__list bg_fff">
                <li v-for="(item, index) in goodList" :key="index">
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
</template>

<script type="text/ecmascript-6">
import Card from '../../card/Card'
import CardLimit from '../../card/CardLimit'
export default {
    data () {
        return {
            loading: false,
            finished: false,
            formInline: {
                offset: 0,
                limit: 20
            },
            goodList: [],
            page: {
                offset: 0,
                limit: 10
            }
        }
    },
    components: {
        Card,
        CardLimit
    },
    methods:{
        onLoad() {
            const _this = this
            _this.loading = true;
            _this.$api.home.getHotProduct(_this.page).then(res => {
                _this.loading = false;
                if (res.data.data.list.length === 0) {
                    _this.finished = true;
                } else {
                    _this.page.offset = _this.page.offset + _this.page.limit
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
    .module-hot{
        .__list{
            border-top: 1px solid rgba(238,238,238,0.8);
            >li{
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
