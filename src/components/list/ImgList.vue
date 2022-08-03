
<template>
    <div class="img-list" v-loading="(!props.list || props.list.length==0) && !props.empty">
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
                    <img class="img img-radius5" v-lazyLoad="picUrl(item)">
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

//加载图片列表的组件

import {computed, PropType, reactive} from 'vue';
import {imgInfos, imgList} from '@/types/imgList'
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
    //动态加载
    isLoading:{
        type: Boolean,
        default: false
    },
    //是否是空的
    empty:{
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['clickImg','loadMore'])


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

const picUrl = (item:imgList)=>{
    let url =   item.picUrl||item.coverImgUrl
    return url + "?param=300y300"
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
    min-height: 200px;
    margin-left: 2%;
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

    &:last-child {
        margin-right: 0;
    }
    .video-playcount{
        position: absolute;
        right: 10px;
        top: 1px;
        color: #fff;
    }
    .img-wrap{
        position: relative;
        img{
            width: 100%;
            aspect-ratio: 1 / 1;
        }
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