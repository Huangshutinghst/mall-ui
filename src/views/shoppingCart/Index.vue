<!-- 购物车 -->
<template>
    <div class="shopping-index panel__hidden">
        <!-- 头部 -->
        <van-nav-bar class="panel__header" 
                    left-text="购物车" 
                    right-text="清空" 
                    @click-right="handleClearAll" />

        <!-- 内容 -->
        <div class="panel__content--fistlevel">
            <!-- 列表 -->
            <div class="shopping-index__list panel__scroll">
                <!-- 下拉刷新 -->
                <van-pull-refresh v-model="isLoading" @refresh="handleRefresh">
                    <!-- 滑动单元格 -->
                    <van-swipe-cell v-for="(item, index) in goodlist" :key="index">
                        <!-- 商品卡片 -->
                        <div class="__item bg_fff">
                            <van-checkbox class="__checkbox fl" v-model="checkedAll"></van-checkbox>
                            <van-card
                                class="__card fr shopping-index__card bg_fff"
                                price="2.00"
                                origin-price="10.00"
                                desc="描述信息"
                                title="商品标题"
                                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                                @click="handleDetail(item)"
                            >
                                <template #tags>
                                    <van-tag plain type="danger">标签</van-tag>
                                    <van-tag plain type="danger">标签</van-tag>
                                </template>
                                <template #footer>
                                    <van-stepper v-model="item.num" theme="round" disable-input />
                                </template>
                            </van-card>
                        </div>
                        <!-- 商品删除 -->
                        <template #right>
                            <van-button style="height:100%" square type="danger" text="删除" />
                        </template>
                    </van-swipe-cell>
                </van-pull-refresh>
            </div>
            <!-- 提交订单栏 -->
            <van-submit-bar class="shopping-index__submit-bar" :price="3050" button-text="去结算" @submit="handleSubmit">
                <van-checkbox v-model="checkedAll">全选</van-checkbox>
            </van-submit-bar>
        </div>

        <!-- 底部导航 -->
        <VFootNav active="shoppingCart"></VFootNav>
    </div>
</template>

<script type="text/ecmascript-6">
import VFootNav from '../../components/VFootNav';
export default {
    data () {
        return {
            isLoading: false,
            goodlist: [
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
                {num: 0},
            ],
            checkedAll: true
        }
    },
    components: {
        VFootNav,
    },
    methods:{
        handleRefresh(){
            var thiz = this;
            setTimeout(() => {
                thiz.$toast.success('刷新成功');
                thiz.isLoading = false;
            }, 1000);
        },
        handleClearAll(){
            console.log('清空')
        },
        handleDetail(item){
            this.$router.push({ name: 'commondityDetail' })
        },
        handleSubmit(){
            var thiz = this;
            
            thiz.$router.push({ name: 'settle' });
        }
    },
}
</script>

<style lang="scss" scoped>
    .shopping-index{
        .shopping-index__list{
            height: calc(100% - 50px);
            .__item{
                height: 136px;
                border-bottom: 1px solid #eee;
                position: relative;
                .__checkbox{
                    width: 40px;
                    position: absolute;
                    top: 50%;
                    left: 20px;
                    margin-top: -10px;
                }
                .__card{
                    width: calc(100% - 40px);
                }
            }
        }
        
        .shopping-index__submit-bar{
            bottom: 40px !important;
            border-top: 1px solid #eee;
        }
    }
</style>

<style lang="scss">
    .shopping-index__card{
        margin-top: 0 !important;
        .van-stepper__minus, .van-stepper__plus{
            width: 16px;
            height: 16px;
        }
    }
</style>