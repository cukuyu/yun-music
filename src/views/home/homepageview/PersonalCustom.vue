<template>
<div class="personal-custom mtop-60" >
    <div class="private-radar" v-if="store.login">
        <h1 class="font-20 font-bold">{{store.profile.nickname}}的雷达歌单</h1>
        <div class="private-radar-btn">
            <h1 class="font-14 gray mtop-5">根据你的红心收藏为你推荐更多宝藏歌曲</h1>
            <div class="slider-btn">
                <button class="btn-circle" @click="changeRadarIndex(-1)">
                    <i class="iconfont icon-arrow-left-bold"></i>
                </button>
                <button class="btn-circle" @click="changeRadarIndex(1)">
                    <i class="iconfont icon-arrow-right"></i>
                </button>
            </div>
        </div>
        <div class="private-radar-view">
            <ImgList
            :list="radarList"
            type="radar"
            ref="radarListRef"
            @click-img="toPlayListDetail">
            </ImgList>
        </div>
    </div>
    <div class="other-radar">
        <h1 class="font-20 font-bold">音乐推荐</h1>
        <div>
            <ImgList
            :list="OtherRadarList"
            type="playlist"
            @click-img="toPlayListDetail"
            >
            </ImgList>
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import {getUserPlayList } from '@/api/api_user'
import { getPlayListDetail } from '@/api/api_playlist'
import {imgList} from '@/types/imgList'
import ImgList from '@/components/list/ImgList.vue'

import {ref, shallowRef} from 'vue'
import {useMainStore} from '@/store'
import { useRouter } from 'vue-router'

const store = useMainStore()
const router = useRouter()


//私人雷达 , 新歌雷达 , 宝藏雷达, 华语私人雷达, 时光雷达, 
//神秘雷达, 乐迷雷达 , 日系私人订制 , 韩系私人订制 , 欧美私人订制
let privateRadarId : string[] = ["3136952023","5300458264","5362359247","2829883282","5320167908",
                                "5341776086","5327906368","2829896389","2829920189","2829816518"]

let radarList = shallowRef<imgList[]>()
let radarInd = ref(0)

const getPrivateRadar = async ()=>{
    console.log(store.login)
    if(!store.login) return 
    let allpriRadar = []
    for(const id of privateRadarId){
        allpriRadar.push(getPlayListDetail(id)) 
        
    }
    const res  = await Promise.all(allpriRadar)
    radarList.value = res.map((item)=>item.playlist)
}

let radarListRef = ref()

getPrivateRadar()

const changeRadarIndex = (num:number)=>{
    radarInd.value += num
    if(radarInd.value>5){
        radarInd.value = 5
        return
    }else if(radarInd.value<0){
        radarInd.value = 0
        return
    }
    radarListRef.value.silderScroll(radarInd.value)
}


//其他歌单
let OtherRadarList = ref<imgList[]>([])

//云音乐官方歌单
let queryInfo ={
    uid:1463586082,
    offset:0, 
    limit:50
}

const getOtherRadarList = async ()=>{
    const res = await getUserPlayList(queryInfo.uid,queryInfo.offset,queryInfo.limit)
    if(res.code!=200) return
    OtherRadarList.value.push(...res.playlist.slice(1))
}

getOtherRadarList()

const toPlayListDetail = (id: number|string)=>{
    if(typeof id==='number'){
        router.push({path : '/playlistdetail/' + id})
    }
}

</script>

<style lang="scss" scoped>


.private-radar-view{
    min-height: 200px;
}
.private-radar-btn{
    display: flex;
    justify-content: space-between;

    .slider-btn{
        width: 60px;
        display: flex;
    }
    .btn-circle {
        display: flex;
        width: 26px;
        height: 26px;
        outline: 0;
        border: 0;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-radius: 100%;
        color: #000;
    }
}

</style>