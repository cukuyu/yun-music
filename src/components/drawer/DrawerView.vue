<template>
    <!-- 歌曲抽屉详细页面 -->
    <div class="drawer-view" ref="drawerViewRef" v-if="store.drawerView">
        <header class="header"><DrawerViewHeaderVue></DrawerViewHeaderVue></header>
        <div class="drawer-view-container">
            <MusicView :imgInfo="imgInfo" ></MusicView>
            <div class="commemt-wrapper">
                <Comment  
                :scrollDom="'.drawer-view'"
                :type="0" 
                :id="store.currentMusicId+''"
                :defaultEdit="true"
                ref="commentRef">
                </Comment>
            </div>
        </div>
            <button 
            class="btn left-edit-button" 
            :class="{'close-top':!isTop, 'open-top':isTop}"
            @click="showEditComment">
                <i class="iconfont icon-edit-comment font-14 mright-3"></i>
                <span class="font-14">写评论</span>
            </button>
            <button 
            class="btn middle-edit-button" 
            :class="{'close-top':isTop, 'open-top':!isTop}"
            @click="showEditComment">
                <i class="iconfont icon-edit-comment font-14 mright-3"></i>
                <span class="font-14">发表我的音乐评论</span>
            </button>
            <button 
            class="btn go-top-button" 
            :class="{'close-top':isTop, 'open-top':!isTop}"
            @click="setScrollTop(0)">
                <i class="iconfont icon-top font-16"></i>
            </button>
            
    </div>

</template>

<script lang="ts" setup>
import { computed, ref, watch, PropType } from 'vue';
import MusicView from './drawerViews/MusicView.vue'
import { useMainStore } from '@/store';
import Comment  from '@/components/comment/Comment.vue'
import { imgInfos } from '@/types/imgList';
import DrawerViewHeaderVue from '@/components/drawer/drawerViews/DrawerViewHeader.vue';

const store = useMainStore()

const props = defineProps({
    imgInfo:{
        type: Object as PropType<imgInfos>,
        required: true
    },
    type:{
        type:Number,
        default:0
    }
})


//自适应高度
let height = computed(()=> (store.clientHeight-80)+"px")


let commentRef = ref()
let drawerViewRef = ref()
let isTop = ref(true)




//绑定scroll事件监听
watch(()=>drawerViewRef.value,()=>{
    drawerViewRef.value?.addEventListener('scroll',()=>{
        // console.log("drawerViewRef.value.scrollTop",drawerViewRef.value.scrollTop)
        if(drawerViewRef.value.scrollTop==0) isTop.value = true
        else isTop.value = false
    })
})

const setScrollTop = (top:number)=>{
    drawerViewRef.value.scrollTop = top
}

const showEditComment = ()=>{
    commentRef.value.editComment(props.imgInfo.name,1)
}


</script>


<style lang="scss" scoped>
.drawer-view{
    position: fixed;
    bottom: 80px;
    height: v-bind(height);
    width: 100%;
    background: var(--draw-bg);
    animation: open-view 0.3s ease-in  ;
    overflow-y: scroll;
}


.drawer-view-container{
    width: 100%;
    margin: 0 auto;
    padding: 0 15%;
    margin-top: 30px;
}

.commemt-wrapper{
    margin: 0 auto;
    width: 60%;
}

.left-edit-button, .middle-edit-button, .go-top-button {
    position: fixed;
    bottom: 95px;
    background-color: var(--draw-comment-button-bgc);
    color: var(--lyric-active-color);
    border-radius: 16px;
    overflow: hidden;
}

.left-edit-button{
    right: 22%;
    height: 32px;
}
.middle-edit-button {
    right: 50%;
    height: 32px;
    transform: translateX(50%);
}

.go-top-button{
    display: flex;
    justify-content: center;
    align-items: center;
    right: 23%;
    border-radius:50%;
    width: 32px;
    height: 32px;
}


.close-top {
    // height: 0px;
    animation: top-close 0.1s  ease-in;
    animation-fill-mode: forwards;
}

.open-top {
    animation: top-open 0.1s  ease-in;
}

@keyframes open-view {
  from {height: 0px;}
  to {height: v-bind(height)}
}

@keyframes top-close {
    from {
        opacity: 0.8;
    }
    to {
        bottom: 80px;
        opacity: 0;
        visibility: hidden;
        // display: none;
    }
}

@keyframes top-open {
    from {
        bottom: 80px;
        opacity: 0;
        visibility: hidden;
    }
    to {
    }
}


</style>