<template>
<div class="mv-list">
    <div class="new-mv-list">
        <div class="mv-tags">
            <div class="font-18 font-bold">
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

    <div class="net-easy-mv-list mtop-50">
        <div class="font-18 font-bold">
            网易出品 <i class="iconfont icon-arrow-right"></i>
        </div>
        <VideoList :list="NetEasyMvList" type="mv">
        </VideoList>
    </div>

    <div class="top-mv-list mtop-50">
        <div class="mv-tags">
            <div class="font-18 font-bold">
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
import {getNewMv, getNetEasyMv, getTopMv } from '@/api/api_video'
import {ref} from 'vue'
import VideoList from '@/components/list/VideoList.vue'
import TopMvList from '@/components/list/TopMvList.vue'

const newCat = ['内地', '港台','欧美','日本','韩国']

let newIdx = ref(0)
let topIdx = ref(0)


let newMvList = ref<MVDetail[]>([])
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
    console.log("toTopMv",res)
}

toNewMv()
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