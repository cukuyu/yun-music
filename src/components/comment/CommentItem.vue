<template>
    <div class="comment-item">
        <div class="comment-item-container">
            <div class="img-wrap">
                <img 
                class="img circle pointer" 
                :src="props.item?.user.avatarUrl" 
                @click="toUserDetail(props.item!.user.userId)"
                >
            </div>
            <div class="comment-wrap mleft-10">
                <div class="comment-content">
                    <span 
                    class="font-12 pointer nickname"
                    @click="toUserDetail(props.item!.user.userId)"
                    >
                    {{props.item?.user.nickname}}：
                    </span>
                    <span class="font-12" >
                        {{props.item?.content}}
                    </span>
                </div>
                 <div class="reply-content" v-if="props.item!.beReplied.length !== 0">
                    <span
                    class="font-12 pointer"
                    style="margin-left: 5px; color: #507daf"
                    >
                    @{{ props.item?.beReplied[0].user.nickname }}：
                    </span>
                    <span class="font-12" >{{ props.item!.beReplied[0].content }}</span>
                </div>
                <div class="comment-info ">
                    <div class="time-info font-12">
                        {{props.item?.timeStr}}
                    </div>
                    <div class="btn-wrap">
                        <button class="no-btn" @click="like(props.item!.commentId, props.item!.liked)">
                            <LikeButton :liked="item?.liked"></LikeButton>
                            <span class="font-12" v-show="props.item!.likedCount>0"> {{ props.item!.likedCount }}</span>
                        </button>
                        <div class="div-column"></div>
                        <button class="no-btn">
                            <i class="iconfont icon-fenxiang"></i>
                        </button>
                        <div class="div-column"></div>
                        <button
                        class="no-btn"
                        @click="reply(props.item!.commentId, props.item!.user.nickname)"
                        >
                            <i class="iconfont icon-pinglun"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="div-line"></div>
    </div>
</template>


<script lang="ts" setup>
import {commentItem} from '@/types/comment'
import {PropType,defineEmits} from 'vue'
import LikeButton from '../button/LikeButton.vue';
import { useRouter } from 'vue-router';
import { useMainStore } from '@/store';
const router = useRouter()
const store = useMainStore()
const props = defineProps({
    item:{
        type: Object as PropType<commentItem>,
    }
})

const emit = defineEmits(['like','editComment'])

const like = (id:number, liked:boolean)=>{
    emit('like',id,liked)
}

const reply = (id:number, name:string)=>{
    emit('editComment',name,2,id)
}

const toUserDetail = (id:number)=>{
    store.drawerView = false
    router.push({path : '/userdetail/' + id})
}

</script>


<style lang="scss" scoped>

.comment-item-container{
    display: flex;
    align-items: center;
    margin: 10px 0;
    .img-wrap{
        // flex-shrink: 0;
        height: 35px;
        width: 35px;
    }
    .comment-wrap{
        line-height: 20px;
        flex: 1;
        .comment-content {
            word-break: break-all;
            word-wrap: break-word;

            .nickname{
                color: #507daf;
                &:hover{
                color: #2f629c
                }
            }          
        }
        .reply-content{
            // background-color: #FFF;
            @include get-class-from-key('cl2-bgc');
            @include get-class-from-key('bright');
        }


        .comment-info{
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            .btn-wrap{
                display: flex;
                align-items: center;
                .no-btn{
                    background-color: inherit;
                }

                .div-column{
                    display: inline-block;
                    margin: 0px 5px;
                    width: 1px;
                    height: 14px;
                    background-color: #d8d8d8;
                }
            }
        }
    }
}

.isliked {
  color: red;
}
</style>
