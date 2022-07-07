<template>
  <div class="comment-edit">
    <i v-if="props.defaultEdit" class="iconfont icon-off pointer" @click="emits('closeDig')"></i>
    <h1 v-if="props.defaultEdit" class="comment-edit-title  font-20 font-bold">
      {{title}}
    </h1>
    <div class="textarea-wrap">
       <textarea
        class="text-area mtop-10"
        ref="textAreaRef"
        v-model="commentInfo.content"
        :placeholder="placeholder"
      ></textarea>
      <div class="word-num">{{ restNum }}</div>
    </div>
      <div class="btn-wrap mtop-20">
        <div class="at-btn">
          <button class="font-18 no-btn" @click="commentInfo.content += '@'">
            @
          </button>
          <button class="font-18 no-btn" @click="commentInfo.content += '#输入想说的话题#'">#</button>
        </div>
        <div class="send-btn">
          <button 
          class="btn btn-red" 
          @click="doSendComment"
          :class="{'btn-no-zero':restNum<140,'btn-red':restNum==140}"
          >评论</button>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>


import { ref,reactive,PropType} from 'vue'
import {sendCommentPar } from '@/types/comment'
import {sendComment } from '@/api/api_comment'
import { computed } from '@vue/reactivity';

const props = defineProps({
  commentInfo:{
    type: Object as PropType<sendCommentPar>,
    default:{
      t:1,
      type: 0,
      id: 0,
      content: '',
      commentId: 0
    }
  },
  name:{
    type: String,
    default: ''
  },
  defaultEdit:{
        type: Boolean,
        default: false
  }
})


const emits = defineEmits(['closeDig'])

let placeholder = ref("发布评论")

// let title = ref("")
let title = computed(()=>{
   if(props.commentInfo.t==1){
        placeholder.value = "发布评论"
        return "歌曲: " + props.name
    }else if(props.commentInfo.t==2) {
        placeholder.value = "回复 "+ props.name +": "
        return '评论'
    }
})
let restNum = computed(()=>140-props.commentInfo.content.length)


const doSendComment = async ()=>{
  // const res = await sendComment(props.commentInfo)
  // console.log("doSendComment:",res)
  emits('closeDig')
}


</script>

<style lang="scss" scoped>


.comment-edit{
  .icon-off{
    margin-left: 420px;
    font-size: 24px;
  }
}
.comment-edit-title{
  text-align: center;
  
}

.btn-wrap{
  display: flex;
  justify-content: space-between;
}

.textarea-wrap{
  position: relative;
  .text-area{
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    @include get-class-from-key('cl-bgc');
    @include get-class-from-key('cl-color');
    @include get-var('border','1px solid','cl3-bgc');
    outline: none;
    font-size: 14px;
    border-radius: 4px;
    padding: 4px 10px;
    resize: none;
    word-break: break-all;
    word-wrap: break-word;
  }
  .word-num{
    position: absolute;
    bottom: 4px;
    right: 4px;
    font-size: 14px;
    color: #cfcfcf;
  }
}

.btn-red{
  background-color: #f6a0a0;
  color: #FFF;
}
.btn-no-zero{
  background-color: #ec4141;
  color: #FFF;
}
</style>