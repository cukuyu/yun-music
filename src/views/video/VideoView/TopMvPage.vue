<template>
    <h1 class="font-20 font-bold mtop-20 mleft-40">MV排行榜</h1>
    <div class='top-mv'>
        <div class="mv-tags font-12">
            <button 
            class="btn" v-for="item in tags"
            :class="{'red-btn':item==query.area}"
            @click="changeTag(item)"
            >
            {{item}}
            </button>
        </div>
        <div class="top-mv-info">
            <TopMvList :list="mvList"></TopMvList>
        </div>
    </div>
   
</template>




<script lang='ts' setup>
import {getTopMv} from '@/api/api_video'
import {MVDetail} from '@/types/video'

import { ref, reactive} from 'vue'

import TopMvList from '@/components/list/TopMvList.vue';

const tags = ['内地', '港台', '欧美', '日本', '韩国']

const changeTag = (tag:string)=>{
    query.area = tag
    mvList.length = 0
    toTopMv()
}
let query = reactive({
    area: '内地',
    limit: 50,
    offset: 0,
})
let mvList = reactive<MVDetail[]>([])

const toTopMv = async ()=>{
    const res = await getTopMv(query)
    if(res.code!=200) return
    mvList.push(...res.data)
}
toTopMv()

</script>




<style lang='scss' scoped>
.top-mv{
    padding: 0 17%;
    .mv-tags{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}



</style>