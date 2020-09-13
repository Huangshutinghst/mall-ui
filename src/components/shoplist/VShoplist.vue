<template>
    <div class="shoplist">
        <h5>
            {{title}}
            <span class="fr">{{ total }}件</span>
        </h5>
        <div v-for="(item) in list" :key="item.productId" class="__info flex flex-pack-justify">
            <van-image
                class="__img"
                fit="contain"
                :src="$api.img + item.pic"
            />
            <p class="shoplist__item">
                <span class="shoplist__item__title" :class="bold?'--bold':''">
                    {{ item.productName }}
                    <br/>
                    <font>￥{{ item.price }}</font>
                </span>
                <span class="fr">x{{ item.quantity }}</span>
            </p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        title: String,
        bold: Boolean,
        list: Array,
        total: Number
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

<style lang="scss" scoped>
    .shoplist{
        padding-bottom: 6px;
        >h5{
            height: 40px;
            line-height: 40px;
            font-weight: bold;
            border-bottom: 1px solid #eee;
            font-size: 14px
        }
        >.__info{
            overflow: hidden;
            padding: 6px 0;
            >.__img{
                width: 40px;
                height: 40px;
            }
            >.shoplist__item{
                width: calc(100% - 50px);
                height: 40px;
                position: relative;
                >.shoplist__item__title{
                    &.--bold{
                        font-weight: bold;
                    }
                    >font{
                        font-weight: normal;
                        font-size: 12px;
                    }
                }
                >.fr{
                    height: 40px;
                    line-height: 40px;
                    position: absolute;
                    top: 0;
                    right: 0;
                }
            }
        }
    }
</style>
