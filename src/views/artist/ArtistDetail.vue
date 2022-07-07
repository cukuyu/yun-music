<template>
<div class="artist-detail">
    <div class="artist-header">
        <div class="artist-img">
            <img :src="artistdetail?.cover+'?param=300y300'" alt="" srcset="">
        </div>
        <div class="artist-info">
            <div class="artist-name font-24 font-bold">{{artistdetail?.name}}</div>
            <div class="mtop-10 font-14">{{artistdetail?.transNames[0]}}</div>
            <!-- <div class="artist" -->
            <div class="artist-button mtop-10">
                <div class="btn btn-white font-14">收藏</div>
            </div>
            <div class="artist-number font-14 mtop-10">
                <span> 
                    单曲数:{{artistdetail?.musicSize}} &nbsp;&nbsp;&nbsp; 
                    专辑数:{{artistdetail?.albumSize}} &nbsp;&nbsp;&nbsp;
                    MV数:{{artistdetail?.mvSize}}
                </span>
            </div>
        </div>
    </div>
    <TabMenu
      :menuList="[{name:'专辑'}, {name:'MV'}, {name:'歌手详情'}, {name:'相似歌手'}]"
      @menuClick="handleClick"
      mode="menu"
    />
    <!-- 热门50首歌 -->
    <div v-show="tabIndex==0">
        <ArtistSongList  
        :list="topList" 
        class="mbottom-40">
        </ArtistSongList>
        <ArtistSongList 
        v-for="(item,index) in albumList"
        :list="item.songs"
        :album="item.album"
        class="mbottom-40"
        >
        </ArtistSongList>
    </div>
    <!-- 歌手MV -->
    <div v-show="tabIndex==1">
        <MvList :list="mvList"></MvList>
    </div>
    <!-- 歌手简介 -->
    <div v-show="tabIndex==2">
        <div 
        v-for="item in introList"
        class="mbottom-40 artist-intro"
        >
            <div>
                <h1 class="font-14 font-bold">{{item.ti}}</h1>
                <p 
                class="font-14 cl2-color" 
                v-for="text in item.txt"
                >
                    {{text}}
                </p>
            </div>
        </div>
    </div>
    <!-- 相似歌手 -->
    <div v-show="tabIndex==3">
        <ImgList 
        :list="sameList"
        type="artist"
        @clickImg="handClickImg"
        >
        <template v-slot="{item}">
            <div class="text-hidden font-14">
                            {{ item.name }}
            </div>
        </template>
        </ImgList>
    </div>

   


    

</div>

</template>

<script lang="ts" setup>
import {getArtistDetail,getArtistTop,getArtistAlbum,
        getArtistMv, getArtistSame, getIntro,} from '@/api/api_artist'
import { getAlbumDetail } from '@/api/api_album'

import  {artistInfo} from '@/types/person'
import {musicInfo} from '@/types/music'
import {albumsInfo} from '@/types/album'
import {artistMv} from '@/types/mv'
import {artistIntro} from '@/types/person'
import { imgList } from '@/types/imgList'


import {ref,watch} from 'vue'
import {useRouter} from 'vue-router'

import TabMenu from '@/components/menu/TabMenu.vue'
import ArtistSongList from '@/components/list/ArtistSongList.vue'
import MvList from '@/components/list/MvList.vue'
import ImgList from '@/components/list/ImgList.vue'


const props = defineProps({
    id:{
        type:String,
        required: true
    }
})
const router =  useRouter()

let artistdetail = ref<artistInfo>()
let tabIndex = ref(0)
let isLoading = ref(false)
let topList = ref<musicInfo[]>([])
let albumList = ref<albumsInfo[]>([])
let mvList = ref<artistMv[]>([])
let introList = ref<artistIntro[]>([])
let sameList = ref<imgList[]>([])

//获取歌手详情
const toArtistDetail =  async()=>{
    const res  = await getArtistDetail(props.id)
    if(res.code!=200) return
    artistdetail.value = res.data.artist
}

//id改变, 更新视图
watch(()=>props.id,(val)=>{
    toArtistDetail()
    handleClick(0)
})

// 获取50首热门歌曲
const toTop = async()=>{
    const res = await getArtistTop(props.id)
    if(res==200) return
    topList.value = res.songs
}

// 获取热门专辑
const toArtistAlbum = async()=>{
    const res = await getArtistAlbum(props.id)
    if(res.code!=200) return
    albumList.value = []
    res.hotAlbums.forEach((item:any) => {
        toAlbumDetail(item.id)
    })
}

// 获取专辑详情
const toAlbumDetail = async(id:number)=>{
    const res =  await getAlbumDetail(id)
    if(res.code!=200) return
    albumList.value.push({album:res.album,songs:res.songs})
}

//获取歌手mv
const toMvList = async()=>{
    const res = await getArtistMv(props.id)
    if(res.code!=200) return
    mvList.value = res.mvs
}

//歌手简介
const toIntro = async () => {
    const res = await getIntro(props.id)
    if(res.code!=200) return
    res.introduction.forEach((item:any)=>{
        item.txt = item.txt.split("\n")
    })
    res.introduction.unshift({
        ti: artistdetail.value?.name+'简介',
        txt: [res.briefDesc]
    })
    introList.value = res.introduction
}

//获取相似歌手
const toSame =async () => {
    const res = await getArtistSame(props.id)
    if(res.code!=200) return
    sameList.value = res.artists
}

//菜单点击回调
const handleClick = (index:number)=>{
    // if(tabIndex.value == index) return
    tabIndex.value = index
    isLoading.value = true
    if(index==0){
        toTop()
        toArtistAlbum()
    }else if(index==1){
        toMvList()
    }else if(index==2){
        toIntro()
    }else{
        toSame()
    }
}

const handClickImg = (id:number)=>{
    router.push({path:"/artistdetail/"+id})
}

toArtistDetail()
handleClick(0)
</script>

<style lang="scss" scoped>

.artist-detail{
    padding: 0 2%;
}
.artist-header{
    display: flex;
    margin: 20px 0;
    .artist-img{
        img{
            width: 180px;
            height: 180px;
            border-radius: 5px;
        }
    }
    .artist-info{
        margin-left: 20px;
        .artist-button{
            width: 60px;
        }

    }
    
}
.artist-intro{
        p{
            line-height: 30px;
            text-indent: 28px;
        }
}
</style>