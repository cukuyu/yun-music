<template>
    <h1 class="font-20 font-bold mtop-20 mleft-40">全部MV</h1>
    <div class='all-mv mtop-20 font-14'>
        <div class="tags-type" v-for="(tagsType,typeIdx) in taglist">
            <div v-show="typeIdx=='area'">地区</div>
            <div v-show="typeIdx=='type'">类型</div>
            <div v-show="typeIdx=='order'">顺序</div>
            <div v-for="(item, index) in tagsType" @click="curTagIdx[0] = index"  class="tags-item mright-10">
                <button 
                class="btn"
                :class="{'red-btn':index==curTagIdx[['area','type','order'].indexOf(typeIdx)]}"
                @click="changTag(typeIdx,index)"
                >
                    {{ item }}
                </button>
            </div>
        </div>
        <div class="all-mv-info">
            <VideoList :list="mvList" :is-loading="loading" :hasMore="hasMore" @load-hald="load"></VideoList>
        </div>
    </div>
</template>




<script lang='ts' setup>
import { getAllMv, } from '@/api/api_video'
import {MVDetail} from '@/types/video'
import { reactive, ref } from 'vue'
import VideoList from '@/components/list/VideoList.vue';
import { useRoute } from 'vue-router';

const route = useRoute()


const props = defineProps({
    tag: {
        type: Number,
        default: 0
    }
})


const taglist = {
    area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
    type: ['全部', '官方版', '现场版', '网易出品'],
    order: ['上升最快', '最热', '最新']
}



let curTagIdx = reactive(new Array(3).fill(0))

if(route.query){
    let params = route.query
    if(params.type && taglist.type.indexOf(params.type as string)!=-1){
        
        curTagIdx[1] = taglist.type.indexOf(params.type as string)
    }
    if(params.order && taglist.order.indexOf(params.order as string)!=-1){
        curTagIdx[2] = taglist.order.indexOf(params.order as string)
    }
}

let query = reactive({
    area: taglist.area[curTagIdx[0]],
    type: taglist.type[curTagIdx[1]],
    order: taglist.order[curTagIdx[2]],
    limit: 8,
    offset: 0
})

let mvList = reactive<MVDetail[]>([])

let loading = ref(false)
let hasMore = ref(false)


const changTag = (type:string,index:number)=>{
    if(type=='area'){
        curTagIdx[0] = index
        query.area = taglist.area[curTagIdx[0]]
    }
    if(type=='type') {
        curTagIdx[1] = index
        query.type = taglist.type[curTagIdx[1]]
    }
    if(type=='order'){
        curTagIdx[2] = index
        query.order = taglist.order[curTagIdx[2]]
    }
    //重置标签
    query.offset = 0
    mvList.length = 0
    toAllMv()
    
}


const toAllMv = async ()=>{
    loading.value = true
    const res = await getAllMv(query)
    if(res.code!=200) return
    mvList.push(...res.data)
    hasMore.value = res.hasMore
    if(mvList.length<24){
        query.offset += 8
        toAllMv()
        loading.value = false
    }else{
        //节流
       setTimeout(()=>
       loading.value = false
       ,200)
    }
}


const load = async ()=>{
    if(loading.value) return
    query.offset += 8
    toAllMv()
}

toAllMv()
</script>




<style lang='scss' scoped>
.all-mv {
    padding: 0 17%;

    .tags-type {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .tags-item{
            display: flex;
            justify-content: center;
            width: 85px;
            
        }
    }
}
</style>