<!-- 评价组件 -->
<template>
    <div class="comment-index panel__hidden">
        <!-- 1.header -->
        <VHeader title="" leftText="评价"></VHeader>

        <!-- 2.content -->
        <div class="panel__content">
            <div class="box bg_fff">
                <p class="rate">评分：{{ rate }} 分</p>
                <van-rate v-model="rate" void-icon="star-o" color="#ffd21e" />
            </div>
            <div class="box bg_fff">
                <p class="label">评价:</p>
                <van-field
                    v-model="commentVal"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="100"
                    placeholder="输入评价内容"
                    show-word-limit
                />
            </div>
            <div class="btn" style="margin: 40px 0;" @click="handleComment()">
                提交
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
import VHeader from '../../components/VHeader'
export default {
    components: {
        VHeader
    },
    data () {
        return {
            rate: 5,
            commentVal: ''
        }
    },
    methods:{
        handleComment(){
            this.$api.order.comment({
                orderId: this.$route.query.id,
                score: this.rate,
                comment: this.commentVal
            }).then(res => {
                this.Util.tip('评价成功');
                this.$router.replace({name:'myOrder', query: {type:''}});
            }).catch(e => {
                console.log(e)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
    .comment-index{
        >.panel__content{
            margin: 10px;
            .box{
                border-radius: 4px;
                margin-bottom: 10px;
                padding: 12px 0;
                text-align: center;
                >p{
                    font-size: 14px;
                    padding: 0 15px;
                    &.rate{
                        margin-bottom: 10px;
                    }
                    &.label{
                        text-align: left;
                    }
                }
            }
            .btn{
                height: 42px;
                line-height: 42px;
                text-align: center;
                background: linear-gradient(to right, #0db059, #089460);
                color: #fff;
                font-size: 14px;
                border-radius: 20px;
            }
        }
    }
</style>
