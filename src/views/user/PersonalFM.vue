<template>
    <div class="person-fm">
        <div class="fm-music-info">
            <div class="img-button">
                <div class="img-wrap">
                    <img :src="curMusicInfo.imgUrl+'?param=300y300'" alt="">
                    <div class="play-btn pointer" @click="fmPlay">
                        <i v-show="!isPlay" class="iconfont icon-bofang font-20" ></i>
                        <i v-show="isPlay" class="iconfont icon-zanting font-20"></i>
                    </div>
                </div>
                <div class="btn-wrap font-20">
                    <button class="btn btn-white">
                        <LoveButton :id='musicList[curIndex]?.id'></LoveButton>
                    </button>
                    <button class="btn btn-white">
                        <el-icon><Delete/></el-icon>
                    </button>
                    <button class="btn btn-white"> 
                        <i class="iconfont icon-xiayishou"></i> 
                    </button>
                    <button class="btn btn-white">
                           <el-icon><More/></el-icon>
                    </button>
                </div>
            </div>
            <div class="author-lyric">
                <div class="music-info mbottom-20 text-hidden">
                    <h1 class="font-20">{{curMusicInfo.name}}</h1>
                    <div class="font-14 music-album-artists mtop-10">
                        <div>专辑: <span>{{" "+curMusicInfo.name}}</span></div>
                        <div> 歌手: <Creator :creators="curMusicInfo.author as []"></Creator> </div>
                    </div>
                </div>
                <Lyric></Lyric>
            </div>
        </div>
        <div class="comment-wrap mtop-40">
            <Comment :id="musicList[curIndex]?.id+''"></Comment>
        </div>
    </div>
</template>

<script lang='ts'  setup>
import { getPersonalFm , } from '@/api/api_music'

import {musicInfo} from '@/types/music'
import { singer } from '@/types/person';

import {ref, reactive, watch, computed, nextTick} from 'vue'

import Lyric from '@/components/drawer/drawerViews/Lyric.vue';

import Comment from '@/components/comment/Comment.vue';
import Creator from '@/components/text/Creator.vue';
import LoveButton from '@/components/button/LoveButton.vue';

import { useMainStore } from '@/store';

const store = useMainStore()


let musicList = reactive<musicInfo[]>([])
let curIndex = ref(0)


let curMusicInfo = reactive({
    imgUrl: '',
    name:"未知名歌",
    author: [] as singer[]
})

let isPlay = computed(()=>{
    return store.playType=='fm' && store.play
})

watch(()=>store.currentMusicId,()=>{
    if(store.playType!='fm') return 
    curMusicInfo.imgUrl = musicList[store.currentIndex].al.picUrl
    curMusicInfo.name = musicList[store.currentIndex].name
    curMusicInfo.author = musicList[store.currentIndex].ar
    curIndex.value = store.currentIndex
})



watch(()=>store.fmNext,()=>{
    if(store.fmNext){
        toPersonalFM()
        store.fmNext = false
    }
})



const toPersonalFM =  async()=>{
    const res = await getPersonalFm()
    if(res.code!=200) return
    musicList.length = 0
    res.data.forEach((item:any) => {
        item.al = item.album
        item.dt = item.duration
        item.ar = item.artists
    });
    musicList.push(...res.data)
    curMusicInfo.imgUrl = musicList[0].al.picUrl
    curMusicInfo.name = musicList[0].name
    curMusicInfo.author = musicList[0].ar
    if(store.playType=='fm') {
        store.playFmMusic({list:musicList})
    }else{
        if(store.musicList.length==0){
            fmPlay()
        }
    }

}

const fmPlay = ()=>{
    if(store.playType!='fm'){
        store.playType == 'fm'
        store.playFmMusic({list:musicList})
    }
    store.play = !store.play
}


toPersonalFM()

</script>

<style lang="scss" scoped>
.person-fm{
    margin: 40px auto;
    width: 800px;
    .fm-music-info{

        display: flex;
        height: 460px;
        justify-content: center;
        .img-wrap{
            margin-top: 40px;
            position: relative;
            width: 300px;
            height: 300px;
            img{
                border-radius: 3%;
            }
            .play-btn{
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50px;
                height: 50px;
                transform: translate(-50%,-50%);
                color: #ec4141;
                background-color: #fbf7f6;
                border-radius: 50%;

                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .btn-wrap{
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            margin-top: 20px;
            button{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50% !important; 

            }
        }

        .author-lyric{
            width: 300px;
            margin-left: 30px;
            .music-info{
                .music-album-artists{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
}

</style>