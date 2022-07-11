<template>
<div class="video-info">
    <ul v-if="type=='vi'" class="video-list-info" v-infinite-scroll="load" :infinite-scroll-disabled="!hasMore"
        infinite-scroll-delay="300">
        <li v-for="item in videos" class="video-list-item">
            <div class="img-wrap pointer" @click="toVideoDetail(item.vid)">
                <img :src="item.coverUrl + '?param=250y140'" alt="">
                <div class="video-playcount font-12" v-if="item.playTime">
                    <i class="iconfont icon-24gl-play font-12"></i>
                    {{ format.transNumber(item.playTime) }}
                </div>
                <div class="mv-time font-12">
                    {{ format.timeFormat(item.durationms / 1000) }}
                </div>
            </div>
            <div class='item-info font-12 mtop-5'>
                <div class="text-hidden pointer"
                @click="toVideoDetail(item.vid)">
                    {{ item.title }}
                </div>
                <div class="cl3-color pointer  mtop-5" @click="toUserDetail(item.creator?.userId)">
                    {{ 'by ' + item.creator?.nickname }}
                </div>
            </div>
        </li>
    </ul>
    <ul v-else class="video-list-info" v-infinite-scroll="load" :infinite-scroll-disabled="!hasMore"
        infinite-scroll-delay="300">
        <li v-for="item in mvs" class="video-list-item">
            <div class="img-wrap pointer" @click="toVideoDetail(item.id)">
                <img :src="item.cover + '?param=250y140'" alt="">
                <div class="video-playcount font-12" v-if="item.playCount">
                    <i class="iconfont icon-24gl-play font-12"></i>
                    {{ format.transNumber(item.playCount) }}
                </div>
                <!-- <div class="mv-time font-12">
                    {{ format.timeFormat(item.duration / 1000) }}
                </div> -->
            </div>
            <div class='item-info font-12 mtop-5'>
                <div class="text-hidden pointer"
                @click="toVideoDetail(item.id)">
                    {{ item.name }}
                </div>
                <div class="mtop-5 text-hidden" @click="toUserDetail(item.artistId)">
                    <Creator :creators="item.artists"></Creator>
                </div>
            </div>
        </li>
    </ul>
    
</div>
</template>


<script lang="ts" setup>
// import {getVideoUrl}  from '@/api/api_video'
import { videoInfo,MVDetail } from '@/types/video'
import { PropType, computed } from 'vue'

import Creator from '../text/Creator.vue';

import useFormat from '@/hooks/format'
import { useRouter } from 'vue-router';


const format = useFormat()
const router = useRouter()

const props = defineProps({
    type: {
        type: String,
        require: true
    },
    list: {
        type: Array as PropType<videoInfo[]|MVDetail[]>,
        require: true
    },
    hasMore:{
        type:Boolean,
        default: false
    },
    isLoading:{
        type:Boolean,
        default: false
    }

})

let videos = computed(()=>{
    return props.list as videoInfo[]
})

let mvs = computed(()=>{
    return props.list as MVDetail[]
})


const emits = defineEmits(['loadHald'])

const load = ()=>{
    if(props.isLoading) return
    emits('loadHald')
}

const toUserDetail = (id:number)=>{
    if(props.type=='vi'){
        router.push({path:'/userdetail/'+id})
    }else{
        router.push({path:'/artistdetail/'+id})
    }
}

const toVideoDetail = (id:string|number)=>{
    if(props.type=='vi'){
        router.push({path:"/videodetail/vi/"+id})
    }else{
        router.push({path:"/videodetail/mv/"+id})
    }
}

</script>

<style lang="scss" scoped>

.video-list-info{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .video-list-item{
            width: 250px;
            margin-left: 2%;
            margin-top: 10px;
            .img-wrap{
                position: relative;
                font-size: 12px;
                img{
                    // height: 180px;
                    // height: ;
                    border-radius: 3%;
                }
                .video-playcount{
                    position: absolute;
                    top: 2px;
                    right: 5px;
                    color: #ffffff;
                }
                .mv-time{
                    position: absolute;
                    bottom:  10px;
                    right: 5px;
                    color: #ffffff;
                }
            }
        }   
    }
</style>