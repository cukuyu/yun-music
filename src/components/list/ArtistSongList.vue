<template>
<div class="artist-song-list">
    <div class="img-wrap">
        <img v-if="hasAlbum" :src="picurl" class="pointer" @click="toAlbumDetail()" >
        <img v-else src="@/assets/img/top50.png" alt="" srcset="">
    </div>
    <div class="song-list mleft-40">
        <div class="song-list-button mbottom-10">
            <span v-if="hasAlbum" class="font-18 font-bold">{{name}}</span>
            <span v-else  class="font-18 font-bold">热门50首</span>
            <!-- <span class="iconfont icon-bofang mleft-20"></span>-->
            <el-icon 
            class="font-24 mleft-20 pointer cl2-color"
            @click="playAll()"
            ><videoPlay/>
            </el-icon>
            <div class="vertical-line "></div>
            <el-icon class="font-24 pointer cl2-color"><folderAdd/></el-icon>
        </div>
        <div 
        v-for="(item,index) in disList"
        :key="item.id"
        class="stripe-list-item song-list-detail"
        @dblclick="playMusic(item.id)"
        >
            <div v-show="!showCurren(item.id)" class="mleft-20">{{index+1>9?index+1+"":"0"+(index+1)}}</div>
            <div v-show="showCurren(item.id)" class="mleft-20 active-color">
                    <i v-if="store.play" class="iconfont icon-shengyin_shiti"></i>
                    <i v-else class="iconfont icon-sound"></i>
            </div>
            <div class="mleft-20">
                <LoveButton :id="item.id"></LoveButton>
                &nbsp;
                <i class="iconfont font-14 icon-down pointer"></i>
            </div>
            <div class="mleft-20">
                <span :class="{'active-color':showCurren(item.id)}" class="c-color">{{item.name}}</span>
                <span v-show="item.alia[0]" class="cl-color">{{`(${item.alia[0]})`}}</span>
            </div>
            <div class="song-time cl-color" >
                {{format.timeFormat(item.dt/1000)}}
            </div>
        </div>
        <div 
        v-if="!showAll"
        class="stripe-list-item show-all-button"
        >
            <span 
            class="mright-100"
            @click="showAll=true"
            >
                查看全部{{props.list.length}}首 <i class="iconfont icon-arrow-right"></i>
            </span>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import {musicInfo} from '@/types/music';
import { album } from '@/types/album';

import {PropType, ref, computed} from 'vue'
import LoveButton from '@/components/button/LoveButton.vue';
import { useMainStore } from '@/store';
import useFormat from '@/hooks/format'
import { useRouter } from 'vue-router';

const store = useMainStore()
const format = useFormat()
const router = useRouter()
const props = defineProps({
        list:{
            type: Array as PropType<musicInfo[]>,
            required: true
        },
        album:{
            type: Object as PropType<album>,
        }
    }
)
    
let showAll = ref(false) 
let hasAlbum = props.album!=undefined

let disList = computed(()=>{
    if(props.list.length<=10 && props.list.length!=0){
        showAll.value = true
        return props.list
    }
    if(!showAll.value) return props.list.slice(0,10)
    return props.list
})

let picurl = computed(()=>{
    return props.album?.picUrl + '?param=300y300'

})

let name = computed(()=>{
    return props.album?.name    
})




const showCurren = (id:number)=>{
      return store.currentMusicId === id && store.musicList == props.list
}
const toAlbumDetail = ()=>{
    router.push({path:"/albumdetail/"+props.album?.id})
}

const playAll = ()=>{
    if(props.list.length==0) return
    playMusic(props.list[0].id)
}

const playMusic = async (id:number)=>{
    // let res = await checkMusic(row.id);
    console.log("id",id)
    store.playMusic({list: props.list,id:id})
}
</script>

<style lang="scss" scoped>

.artist-song-list{
    display: flex;
    .img-wrap{
        img{
            height: 150px;
            width: 150px;
            border-radius: 5px;
        }
    }
    .song-list{
        flex-grow: 1;

        .song-list-button{
            display: flex;
            align-items: center;
        }

        .song-list-detail{
            color: #9f9f9f;
            display: flex;
            align-items: center;
            height: 40px;
            font-size: 14px;
            .song-time{
                margin-left: auto;
                margin-right: 20%;
            }
        }
        .show-all-button{
            display: flex;
            justify-content: end;
            align-items: center;
            height: 40px;
            font-size: 14px;
            color: #9f9f9f;

        }
       
    }
}


.active-color {
  color: #ec4141;
}
</style>