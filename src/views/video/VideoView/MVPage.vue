<template>
<div class="mv-list">
    <div class="new-mv-list">
        <div class="mv-tags">
            <div class="font-18 font-bold pointer" @click="toAllMv('最新')">
                最新MV <i class="iconfont icon-arrow-right"></i>
            </div>
            <div class="hot-tags">
                    <button 
                    v-for="(item,index) in newCat"
                    class="hot-tags-item btn"
                    @click="changTag(index)"
                    :class="{'red-btn':index==newIdx}">
                        {{item}}
                    </button>
            </div>
        </div>
        <VideoList :list="newMvList" type="mv">
        </VideoList>
    </div>

    <div class="new-mv-list mtop-50">
        <div class="mv-tags">
            <div class="font-18 font-bold pointer" @click="toAllMv('最热')">
                热播MV <i class="iconfont icon-arrow-right"></i>
            </div>
        </div>
        <VideoList :list="hotMvList" type="mv">
        </VideoList>
    </div>

    <div class="net-easy-mv-list mtop-50">
        <div class="font-18 font-bold pointer" @click="toAllMv('net-easy')">
            网易出品 <i class="iconfont icon-arrow-right"></i>
        </div>
        <VideoList :list="NetEasyMvList" type="mv">
        </VideoList>
    </div>

    <div class="top-mv-list mtop-50">
        <div class="mv-tags">
            <div class="font-18 font-bold pointer" @click="click2TopMv">
                MV排行榜 <i class="iconfont icon-arrow-right"></i>
            </div>
            <div class="hot-tags">
                    <button 
                    v-for="(item,index) in newCat"
                    class="hot-tags-item btn"
                    @click="changTag(index,false)"
                    :class="{'red-btn':index==topIdx}">
                        {{item}}
                    </button>
            </div>
        </div>
        <TopMvList :list="topMvList" :hasMore="false"></TopMvList>
    </div>


</div>
</template>

<script lang="ts" setup>
import {MVDetail} from '@/types/video'
import {getNewMv, getNetEasyMv, getTopMv, getAllMv } from '@/api/api_video'
import {ref} from 'vue'
import VideoList from '@/components/list/VideoList.vue'
import TopMvList from '@/components/list/TopMvList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const newCat = ['内地', '港台','欧美','日本','韩国']

let newIdx = ref(0)
let topIdx = ref(0)


let newMvList = ref<MVDetail[]>([])
let hotMvList = ref<MVDetail[]>([])
let NetEasyMvList = ref<MVDetail[]>([])
let topMvList = ref<MVDetail[]>([])
const changTag = (index:number, isNew:boolean=true)=>{
    if(isNew){
        newIdx.value = index
        toNewMv()
    }
    else{
        topIdx.value = index
        toTopMv()
    }

}

const toNewMv = async()=>{
    const res = await getNewMv(newCat[newIdx.value], 8)
    if(res.code!=200) return
    newMvList.value = res.data
}

const toNetEasyMv = async()=>{
    const res = await getNetEasyMv(8,0)
    if(res.code!=200) return
    NetEasyMvList.value = res.data
}

const toTopMv = async()=>{
    const res = await getTopMv({area:newCat[topIdx.value],limit:10,offset:0})
    if(res.code!=200) return
    topMvList.value = res.data
}

const toAllMv = (tag:string)=>{
    let query
    if(tag=='最新'|| tag=='最热'){
        query = {order:tag}
    }else if(tag=='net-easy'){
        query = {type:'网易出品'}
    }
    router.push({path:'/allmv/',query:query})
}


const toHotMv = async()=>{
    const res = await getAllMv({area:"全部",limit:8,offset:0,type:'全部',order:"最热"})
    if(res.code!=200) return
    hotMvList.value = res.data
}

const click2TopMv = ()=>{
    router.push({path:"topmv"})
}

toNewMv()
toHotMv()
toNetEasyMv()
toTopMv()
</script>

<style lang="scss" scoped>
.mv-list{
    padding:0 17%;

    .hot-tags{
        margin-left:auto;
    } 
    .mv-tags{
        display: flex;
        align-items: center;

    }
}

.red-btn {
    @include get-raga('active-bgc',0.05);
    @include get-var('color','','active-bgc');
    border-radius: 13px;
}
</style>