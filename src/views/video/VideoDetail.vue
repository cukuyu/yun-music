<template>
    <div class="video-detail">
        <div class="video-container">
            <div class="title font-20 font-bold">
                <el-icon><arrowLeft/></el-icon>
                {{title}}详情
            </div>
            <video  controls :src="urlInfo?.url">
                您的浏览器不支持 video 标签。
            </video>
            <div class="video-creator text-hidden">
                <img v-if="type=='mv'" :src="mvInfo?.artists[0].img1v1Url" alt="">
                <img v-if="type=='vi'" :src="videoInfo?.creator.avatarUrl" alt="">
                <Creator v-if="type=='mv'" :creators="mvInfo?.artists as []"></Creator>
                <Creator v-if="type=='vi'" 
                type="user"
                :creators="[{id:videoInfo?.creator.userId as number, 
                            name:videoInfo?.creator.nickname as string}]">
                </Creator>
            </div>
            <div class="mtop-20 font-22 font-bold">
                <span v-if="type=='mv'">{{mvInfo?.name}}</span>
                <span v-if="type=='vi'">{{videoInfo?.title}}</span>
                <i  v-if="type=='mv' && mvInfo?.briefDesc.length!=0"
                class="iconfont  mleft-10"
                :class="showDesc?'icon-shouqi':'icon-zhankai'"
                @click="showDesc = !showDesc">
                </i>
            </div>
            <div class="mtop-10 font-12 video-time-playcount">
                <span v-if="type=='mv'">发布：{{mvInfo?.publishTime}}</span>
                <span v-if="type=='vi'">发布：{{format.dateFormat(videoInfo?.publishTime as number)}}</span>
                <span v-if="type=='mv'" class="mleft-20">播放：{{format.transNumber(mvInfo?.playCount)}}</span>
                <span v-if="type=='vi'" class="mleft-20">播放：{{format.transNumber(videoInfo?.playTime)}}</span>
            </div>
            <div v-if="type=='mv'" class="video-desc" v-show="showDesc">
                {{mvInfo?.desc}}
            </div>
            <div v-else class="mtop-10">
                <button class="btn font-12 cl-bgc tags-item" v-for="item in videoInfo?.videoGroup">
                    {{item.name}}
                </button>
            </div>
            <div class="video-comment-btn font-20 mtop-20">
                <button class="btn-white btn">
                    <LikeButton :liked="videoLikeInfo?.liked"></LikeButton>赞({{videoLikeInfo?.likedCount}})
                </button>
                <button class="btn-white btn">
                    <i class="iconfont icon-shoucang2"></i>收藏(
                        <span  v-if="type=='mv'"> {{mvInfo?.subCount}}</span>
                        <span  v-else> {{videoInfo?.subscribeCount}}</span>
                        )
                </button>
                <button class="btn-white btn"> 
                    <i class="iconfont icon-fenxiang"></i>分享(  
                        <span  v-if="type=='mv'"> {{mvInfo?.shareCount}}</span>
                        <span  v-else> {{videoInfo?.shareCount}}</span>)
                </button>
                <button class="btn-white btn"> 
                    <i class="iconfont icon-down"></i>下载
                </button>
            </div>
            <div class="font-20 font-bold mtop-20">
                评论
                <span class="font-12 gray">({{videoLikeInfo?.commentCount}})</span>
            </div>
            <Comment 
            :id="props.id"
            :type="props.type=='vi'?5:1"
            >
            </Comment>
        </div>
        <div class="video-relate">
            <div class="font-20 font-bold mbottom-20">相关推荐</div>
            <div v-if="type=='mv'">
                <div class="video-relate-item" v-for="item in mvRelates">
                    <div class="img-wrap pointer" @click="toOtherVideoDetail(item.id+'')">
                        <img :src="item.picUrl+'?param=140y80'" alt="">
                        <div class="video-playcount font-12" v-if="item.playCount">
                            <i class="iconfont icon-24gl-play font-12"></i>
                            {{format.transNumber(item.playCount)}}
                        </div>
                        <div class="mv-time font-12" >
                            {{format.timeFormat(item.duration/1000)}}
                        </div>
                    </div>
                    <div class="video-relate-info">
                        <div class="video-relate-name pointer" 
                        @click="toOtherVideoDetail(item.id+'')">
                            {{item.name}}
                        </div>
                        <div 
                        class="video-relate-creator pointer"
                        @click="toCreatorDetail(item.artistId)"
                        > 
                            {{'by '+item.artistName}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="video-relate-item" v-for="item in videoRelates">
                    <div class="img-wrap pointer" @click="toOtherVideoDetail(item.vid)">
                        <img :src="item.coverUrl+'?param=140y80'" alt="">
                        <div class="video-playcount font-12" v-if="item.playTime">
                            <i class="iconfont icon-24gl-play font-12"></i>
                            {{format.transNumber(item.playTime)}}
                        </div>
                        <div class="mv-time font-12" >
                            {{format.timeFormat(item.durationms/1000)}}
                        </div>
                    </div>
                    <div class="video-relate-info">
                        <div class="video-relate-name pointer" 
                        @click="toOtherVideoDetail(item.vid)">
                            {{item.title}}
                        </div>
                        <div 
                        class="video-relate-creator pointer"
                        @click="toCreatorDetail(item.creator[0].userId)"
                        > 
                            {{'by '+item.creator[0].userName}}
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    </div>
                        <!-- <label for="check" class="check-in"><i class="iconfont  icon-zhankai"></i></label>
                        <label for="check" class="check-out"><i class="iconfont icon-shouqi"></i></label> -->
</template>


<script lang="ts" setup>
import {getVideoDetail, getVideoUrl, getVideoLike, subVideo, getRelatedVideo} from '@/api/api_video'

import {mvUrl, videoUrl, videoDetail, MVDetail, videoLike, videoRelate, mvRelate} from '@/types/video'

import Creator from '@/components/text/Creator.vue';
import LikeButton from '@/components/button/LikeButton.vue';
import Comment from '@/components/comment/Comment.vue';

import { useMainStore } from '@/store';
import { computed, ref, watch } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import useFormat from '@/hooks/format'

const store = useMainStore()
const router = useRouter()
const format = useFormat()

//离开组件时显示右侧边栏和下播放条
onBeforeRouteLeave((to)=>{
    if(!to.fullPath.startsWith("/videodetail")){
        store.videoView = false
    }
})

//隐藏右侧边和播放条
store.videoView = true


const props = defineProps({
    id:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
})



let title = computed(()=>{
    return props.type=="vi"?"视频":'MV'
})
//播放连接
let urlInfo = ref<mvUrl|videoUrl>()

//视频信息
let videoInfo = ref<videoDetail>()
let mvInfo = ref<MVDetail>()
//显示简介
let showDesc = ref(false)

//点赞信息
let videoLikeInfo = ref<videoLike>()

let videoRelates = ref<videoRelate[]>([])
let mvRelates = ref<mvRelate[]>([])

//获得视频信息
const toVideoDetail = async()=>{
    const res = await getVideoDetail(props.type,props.id)
    if(res.code!=200) return
    if(props.type=='vi')videoInfo.value = res.data
    else mvInfo.value = res.data
    // console.log("toVideoDetail",res)
}
//获取视频url
const toVideoUrl = async()=>{
    const res = await getVideoUrl(props.type, props.id)
    if(res.code!=200) return
    if(props.type=='vi'){
        urlInfo.value = res.urls[0]
    }else{
        urlInfo.value = res.data
    }
}

//获取视频评论信息
const toVideoLike = async () => {
    const res = await getVideoLike(props.type, props.id)
    if(res.code!=200) return
    videoLikeInfo.value = res
}

const toSubVideo =  async() =>{

}

const toRelatedVideo = async () => {
    const res = await getRelatedVideo(props.type, props.id)
    if(res.code!=200) return
     if(props.type=='vi'){
        videoRelates.value = res.data
    }else{
        mvRelates.value = res.result
    }
}

const toOtherVideoDetail = (id:string)=>{
    if(props.type=='mv'){
        router.push("/videodetail/mv/"+id)
    }else{
        router.push("/videodetail/vi/"+id)
    }
  
}
const toCreatorDetail = (id:number)=>{
    if(props.type=='mv'){
        router.push("/artistdetail/"+id)
    }else{
        router.push("/userdetail/"+id)
    }

}

watch(()=>props.id,()=>{
    toVideoLike()
    toVideoDetail()
    toVideoUrl()
    toRelatedVideo()
})


toVideoLike()
toVideoDetail()
toVideoUrl()
toRelatedVideo()
</script>

<style lang="scss" scoped>

.video-detail{
    display: flex;
    padding: 0 15%;
    @include get-class-from-key('c-bgc');
    @include get-class-from-key('c-color');
    .video-container{
        min-width: 660px;
        max-width: 55%;
        .title{
            display: flex;
            align-items: center;
        }
        video{
            margin-top: 20px;
            width: 100%;
        }
        .video-creator{
            display: flex;
            align-items: center;
            margin-top: 10px;
            font-size: 14px;
            img{
                height: 50px;
                width: 50px;
                border-radius: 50%;
                margin-right: 10px;
            }
        }
        .video-time-playcount{
            color: #cfcfcf;
        }

        .video-desc{
            height: 50px;
            line-height: 17px;
            font-size: 12px;
            overflow: hidden;
            white-space: wrap;
            text-overflow: ellipsis;
            margin-top: 10px;
        }
        .tags-item{
            height: 20px;
            margin-right: 3px;
            line-height: 20px;
        }
       
        .video-comment-btn{
            button{
                width: 20%;
                margin-left: 1%;
            }
        }
    }
    .video-relate{
        // margin-top: 45px;
        margin-left: 20px;
        .video-relate-item{
            display: flex;
            // align-items: center;
            margin-bottom:10px;
            .img-wrap{
                width: 140px;
                height: 80px;
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
            .video-relate-info{
                width: 285px;
                margin-left: 10px;
                .video-relate-name{
                    height: 36px;
                    margin-top: 10px;
                    font-size: 14px;
                    line-height: 17px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    // white-space: nowrap;
                }
                .video-relate-creator{
                    margin-top: 10px;
                    font-size: 12px;
                    color: #9f9f9f;
                }
                
            }
        }
    }
}
</style>
