<template>
    <div class="video-list">
        <div class="video-tags">
            <div class="video-all-tags">
                <button class="btn btn-white font-14" @click="allTagsView=!allTagsView">
                    {{curTags.name}} <i class="iconfont icon-arrow-right"></i>
                </button>
                <div class="all-tags-warpper font-14" ref="allTagsRef" v-if="allTagsView">
                    <h1 
                    class="mtop-10 mleft-10 pointer hover-tags"
                    @click="changTag({id:-1,name:'全部视频'}); allTagsView=false"
                    >全部视频</h1>
                    <div class="div-line mtop-10 mbottom-10"></div>
                    <div class="all-tags-list mleft-30">
                        <button
                        v-for="item in allTags"
                        class="all-tags-item btn font-14 hover-tags"
                        @click="changTag(item); allTagsView=false"
                        :class="{'red-btn':item.id==curTags.id}">
                            {{item.name}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="video-hot-tags">
                <button 
                v-for="item in hotTags"
                class="hot-tags-item btn"
                @click="changTag(item)"
                :class="{'red-btn':item.id==curTags.id}">
                    {{item.name}}
                </button>
            </div>
        </div>
         
                <VideoList
                type="vi"
                :list="videoList"
                :hasMore="hasMore"
                :isLoading="isLoading"
                @loadHald ='load'
                ></VideoList>

    </div>
</template>

<script lang="ts" setup>
import {
    getVideoHotTag,
    getVideoAlltag,
    getAllVideo,
    getVideoByTag
} from '@/api/api_video'

import {videoInfo, videoTag} from '@/types/video'
import {ref} from 'vue'

// import useFormat from '@/hooks/format'
import { useAnimation } from '@/hooks/animation';
// import { useRouter } from 'vue-router';
// import { useMainStore } from '@/store';
import VideoList from '@/components/list/VideoList.vue';

const animation = useAnimation()

// const format = useFormat()
// const router = useRouter()
// const store = useMainStore()

//视频标签列表
let hotTags = ref<videoTag[]>(
    [
        {id: 60100, name: '翻唱'},
        {id: 2100, name: '生活'},
        {id: 1105, name: '最佳饭制'},
        {id: 1101, name: '舞蹈'},
        {id: 2103, name: '游戏'},
        {id: 58100, name: '现场'},
        {id: 58101, name: '听BGM'},
        {id: 1000, name: 'MV'},
        {id: 57104, name: 'ACG音乐'}
     ])

//当前视频标签
let curTags = ref<videoTag>({id:-1, name:'全部视频'})

//全部视频标签layer
let allTags = ref<videoTag[]>()
let allTagsRef = ref()
let allTagsView = animation.clickHidden(allTagsRef)

//视频信息
let videoList = ref<videoInfo[]>([])
//动态加载是否有更多的视频
let hasMore = ref(false)
//动态加载偏移量
let offset = ref(0)
//
let isLoading = ref(false)

const toVideoHotTag = async()=>{
    const res = await getVideoHotTag()
    if(res.code!=200) return
    hotTags.value = res.data
}

const toVideoAlltag= async()=>{
    const res = await getVideoAlltag()
    if(res.code!=200) return
    allTags.value = res.data
}

const changTag = (tag:videoTag)=>{
    curTags.value = tag
    offset.value = 0
    videoList.value.length = 0
    toVideoByTag()
}



const toVideoByTag = async()=>{
    isLoading.value = true
    let res
    if(curTags.value.id!=-1){
        res = await getVideoByTag(curTags.value.id, offset.value)
    }else{
        res = await await getAllVideo(offset.value)
    }

    if(res.code!=200) return
    res.datas = res.datas.map((item:any)=>item.data)
    videoList.value.push(...res.datas)
    hasMore.value = res.hasmore
    if(videoList.value.length>24){
        setTimeout(() => {
          isLoading.value = false
        }, 200)
    }else {
        isLoading.value = false
        load()
    }
    
}

const load = ()=>{
    if(isLoading.value) return 
    offset.value +=8
    toVideoByTag()
}


toVideoHotTag()
toVideoAlltag()
toVideoByTag()

</script>

<style lang="scss" scoped>

.video-list{
    padding:0 17%;
    .video-tags{
        display: flex;
        // align-items: center;

        .video-hot-tags{
            margin-left:auto;
        }
        .video-all-tags{
            position: relative;
            .all-tags-warpper{
                position: absolute;
                width: 650px;
                height: 490px;
                top: 40px;

                @include get-class-from-key('c-bgc');
                @include get-var('box-shadow','0 0 4px','cl3-color');
                // box-shadow: 0 0 8px #e5e5e5;
                border-radius: 4px;
                
                z-index: 300;
                overflow-y: scroll;


                .all-tags-item{
                    margin-top: 20px;
                    margin-left: 10px;
                    width: 100px;
                    height: 30px;
                } 
              
            }
        }

    }

    
}

.red-btn {
    @include get-raga('active-bgc',0.05);
    @include get-var('color','','active-bgc');
    border-radius: 13px;
}

.hover-tags:hover{
    color: #ec4141;
}
</style>