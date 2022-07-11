<template>
    <div class="img-list">
        <ul 
        class="img-list-ul"
        :class="{'wrap':type!='radar'}"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        infinite-scroll-delay="300"
        
        >
            <li 
            class="img-item-li"
            v-for="(item,index) in props.list" 
            :key="item.id"
            :ref ="setScrollListRef"
            >
                <div class="img-wrap pointer" @click="clickImg(item.id)">
                    <img class="img img-radius5" :src="item.picUrl||item.coverImgUrl" >
                    <div class="video-playcount font-12" v-if="item.playcount||item.playCount">
                        <i class="iconfont icon-24gl-play font-12"></i>
                        {{format.transNumber(item.playcount)||format.transNumber(item.playCount)}}
                    </div>
                    <div class="play-btn pointer" v-if="showBtn">
                        <i class="iconfont icon-bofang"></i>
                    </div>
                </div>
                <slot :item="item"></slot>
            </li>
        </ul>
        <div class="loading-wrap" v-show="isLoading">
            <el-icon><loading/></el-icon>加载中
        </div>
        <div class="loading-wrap" v-show="noMore"></div>
    </div>
</template>


<script lang="ts" setup>
import {computed, PropType, reactive} from 'vue';
import {imgList} from '@/types/imgList'
import useFormat from '@/hooks/format'

const format = useFormat()
const props = defineProps({
    list:{
        type: Array as  PropType<imgList[]>,
        required: true,
        default: [] 
    },
    hasMore:{
        type: Boolean,
        default: false
    },
    infinite:{
        type:Boolean,
        default: false,
    },
    type:{
        type:String,
        required:true
    },
    isLoading:{
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['clickImg','loadMore'])

let lens = computed(()=> {
    // console.log(props.list.length)
    return props.list.length 
})



let disabled = computed(()=>{
   
    return !props.infinite || !props.hasMore || props.isLoading
})

let showBtn = computed(()=>{
    return props.type === 'playlist' || props.type === 'album' ||  props.type === 'radar'
})

let noMore = computed(()=>{
    return props.infinite && !props.hasMore
})



const clickImg = (id:number)=>{
    
    emits('clickImg',id)
}

const load = ()=>{
    if(props.hasMore) emits('loadMore', props.list.length)
}


//处理雷达歌单
let scrollListRef = reactive<Element[]>([])

let setScrollListRef = (el:any)=>{
    if(props.type=='radar'){
        scrollListRef.push(el)
    }
}

const silderScroll = (num:number)=>{
    if(props.type!=="radar") return
    scrollListRef[num].scrollIntoView({behavior: "smooth",inline: "start",block: "end"})
}

defineExpose({
    silderScroll
})
//处理雷达歌单

</script>

<style lang="scss" scoped>
.img-list-ul {
    display: flex;
    margin-top: 10px;

    // flex-wrap: wrap;
    overflow-x:hidden
}

//雷达歌单不需要换行
.wrap {
    flex-wrap: wrap;
}

.img-item-li {
    width: 18%;
    min-width: 18%;
    // height: 20vw;
    margin-right: 2%;
    margin-bottom: 30px;
    .video-playcount{
        position: absolute;
        right: 10px;
        top: 1px;
        color: #fff;
    }
    .img-wrap{
        position: relative;
    }
   
   &:hover{
       .play-btn{
            animation: showBtn 0.2s;
            animation-fill-mode:forwards;
        }
   }
   
}


.play-btn{
    position: absolute;
    opacity: 0;
    bottom: 15px;
    right: 10px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    color: #ec4141;
    background-color: #FFF;
}

@keyframes showBtn {
  from {    
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

</style>