<template>
    <div class="new-song">
        <div class="new-song-header">
            <div class="new-song-type">
                <ul class="all-types">
                    <li v-for="item in allTypes" :key='item.id' :class="{ 'active': item.id == type }"
                        @click="changeType(item.id)">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <div class="new-song-btn">
                <button class="btn-red btn">
                    <i class="iconfont icon-bofang"></i>
                    <span class="btn-text">播放全部</span>
                </button>
                <button class="btn btn-white mleft-12">
                    <i class="el-icon-folder-add"></i>
                    <span class="btn-text">收藏全部</span>
                </button>
            </div>
        </div>
        <div class="new-song-view mtop-20">
            <div class="new-song-table" v-loading="!newSongList||newSongList.length==0">
                <div 
               v-for="(item,index) in newSongList"
                class="new-song-table-item stripe-list-item" 
                @dblclick="playMusic(item.id)"
                >
                <div class="sub-index">
                    <span class="cl-color" v-show="!showCurren(item.id)">{{index+1>9?index+1+"":"0"+(index+1)}}</span>
                    <span v-show="showCurren(item.id)" class="active-color">
                        <i v-if="store.play" class="iconfont icon-shengyin_shiti"></i>
                        <i v-else class="iconfont icon-sound"></i>
                    </span>
                </div>
                <div class="sub-img">
                    <img :src="item.al.picUrl + '?param=60y60'" alt="">
                    <div class="play-btn pointer">
                        <i class="iconfont icon-bofang"></i>
                    </div>
                </div>
                <div class="sub-title text-hidden">
                    <span class="c-color" :class="{'active-color':showCurren(item.id)}">{{item.name}}</span>
                    <span v-show="item.alia[0]" class="cl-color">{{`(${item.alia[0]})`}}</span>
                </div>
                <div class="sub-item text-hidden">
                    <Creator :creators="(item.ar as any)"></Creator>
                </div>
                <div class="sub-album cl-color text-hidden pointer">
                    <span @click="toAlbumDetail(item.al.id)">{{item.al.name}}</span>
                </div>
                <div class="sub-final cl-color">
                    <span>{{ format.timeFormat(item.dt/1000) }}</span>
                </div>
            </div>
        </div>

           
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getTopMusic } from '@/api/api_music'
import { musicInfo } from '@/types/music'
import { ref, shallowRef } from 'vue'
import InfoList from '@/components/list/InfoList.vue'
import Creator from '@/components/text/Creator.vue'

import { useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import useFormat from '@/hooks/format'


const format = useFormat()
const store = useMainStore()
const router = useRouter()

//全部:0 华语:7 欧美:96 日本:8 韩国:16
let allTypes = [{ name: "全部", id: 0 }, { name: "华语", id: 7 }, { name: "欧美", id: 96 }, { name: "日本", id: 8 }, { name: "韩国", id: 16 }]
let type = ref(0)
let newSongList = ref<musicInfo[]>([])
const getNewSong = async () => {
    newSongList.value.length = 0
    const res = await getTopMusic(type.value)
    if (res.code != 200) return
    newSongList.value.length = 0
    res.data.forEach((item: any) => {
        let music: musicInfo = {
            id: item.id,
            dt: item.duration,
            alia: item.alias,
            al: item.album,
            ar: item.artists,
            name: item.name,
            mv: item.mvid,
            fee: item.fee
        }
        newSongList.value.push(music)
    });

}
const changeType = (id:number)=>{
    type.value = id
    getNewSong()
}
getNewSong()

const toAlbumDetail = (id:number)=>{
    router.push({path:"/albumdetail/"+id})
}

const playMusic = (id:number)=>{
     store.playMusic({list: newSongList.value,id:id})
}

const showCurren = (id:number)=>{
      return store.currentMusicId === id
}
</script>


<style lang="scss" scoped>
.new-song {
    .new-song-header {
        display: flex;
        justify-content: space-between;
        .new-song-type {
            .all-types {
                display: flex;

                li {
                    margin-right: 20px;
                    cursor: pointer;
                    @include get-class-from-key('cl5-color');
                    &:hover {
                        @include get-class-from-key('c-color');
                    }
                }

                .active {
                    font-weight: bold;
                    margin-top: -1px;
                    @include get-class-from-key('cf-color');
                    &:hover {
                       @include get-class-from-key('cf-color')
                    }
                }
            }
        }
    }


    .new-song-table-item{
        display: flex;
        align-items: center;
        height: 80px;
        font-size: 14px;
        min-width: 200px;
        .sub-img {
            position: relative;
            height: 60px;
            width: 60px;
            margin-left: 2%;
            img{
                 border-radius: 4px;
            }
            .play-btn{
                position: absolute;
                height: 25px;
                width: 25px;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                color: #ec4141;
                background-color: #e6e6e6;
                border-radius: 50%;
                font-size: 12px;
                text-align: center;
                line-height: 25px;

            }
        }
        .sub-title {
            max-width: 450px;
            flex: 1;
            margin-left: 2%;
           
        }
        .sub-item {
            width: 150px;
        }
        .sub-album{
            width: 150px;
            margin-left: 2%;

        }
        .sub-final {
            width: 100px;
            text-align: center;
            margin-left: auto;
            margin-right: 2%;
        }
        .sub-index {
            margin-left: 1%;
            width: 50px;
            text-align: center;
            font-size: 14px;
        }
    }
}

.btn-red{
    background-color: #ec4141;
    color:#fff;
}

.btn-red:hover {
    background-color: #d73535;
    color:#fff;
}

.active-color {
  color: #ec4141;
}
</style>