<!-- 分类 -->
<template>
    <div class="category-index panel__hidden">
        <!-- 头部 -->
        <van-nav-bar class="panel__header" left-text="分类" />
        
        <!-- 内容  -->
        <van-tree-select
            class="panel__scroll panel__content--fistlevel"
            selected-icon=""
            :items="categoryList"
            :main-active-index.sync="activeIndex"
            :active-id.sync="activeId"
            @click-nav="handleNav"
            @click-item="handleItem"
        />  

        <!-- 底部导航 -->
        <VFootNav active="category"></VFootNav>
    </div>
</template>

<script type="text/ecmascript-6">
import VFootNav from '../../components/VFootNav';
export default {
    data () {
        return {
            categoryList: [
                {
                    text: '一级类目',
                    children: [
                        {
                            text: '二级类目',
                            id: 1,
                        },
                        {
                            text: '二级类目',
                            id: 2,
                        },
                        {
                            text: '二级类目',
                            id: 3,
                        },
                        {
                            text: '二级类目',
                            id: 4,
                        },
                        {
                            text: '二级类目',
                            id: 5,
                        },
                    ],
                },
                {
                    text: '一级类目',
                    children: [
                        {
                            text: '二级类目',
                            id: 1,
                        },
                        {
                            text: '二级类目',
                            id: 2,
                        },
                        {
                            text: '二级类目',
                            id: 3,
                        },
                        {
                            text: '二级类目',
                            id: 4,
                        },
                        {
                            text: '二级类目',
                            id: 5,
                        },
                        {
                            text: '二级类目',
                            id: 6,
                        },
                        {
                            text: '二级类目',
                            id: 7,
                        },
                        {
                            text: '二级类目',
                            id: 8,
                        },
                        {
                            text: '二级类目',
                            id: 9,
                        },
                        {
                            text: '二级类目',
                            id: 10,
                        },
                        {
                            text: '二级类目',
                            id: 11,
                        },
                        {
                            text: '二级类目',
                            id: 12,
                        },
                        {
                            text: '二级类目',
                            id: 13,
                        },
                        {
                            text: '二级类目',
                            id: 14,
                        },
                        {
                            text: '二级类目',
                            id: 15,
                        },
                    ],
                }
            ],
            activeIndex: 0,
            activeId: 1,
        }
    },
    components: {
        VFootNav,
    },
    methods:{
        handleNav(index){
            this.activeIndex = index;
            this.activeId = 1;
        },
        handleItem(data){
            this.activeId = data.id;
        }
    },
}
</script>

<style lang="scss" scoped>
    .category-index{
        .van-sidebar-item--select{
            background: #fff;
        }
    }
</style>