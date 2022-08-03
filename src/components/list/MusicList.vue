<template>
<div class="music-list" style="width: 100%" v-loading="props.list.length==0">
    <el-table
    :data="props.list"
    size="default"
    stripe
    tooltip-effect="light"
    @row-dblclick="playMusic"
    class="music-list">
        <el-table-column  width="60">
            <template v-slot="{$index,row}">
                <div style="">
                    &nbsp;
                    &nbsp;
                    <span class="font-12" v-show="!showCurren(row.id)">{{$index+1>9?$index+1+"":"0"+($index+1)}}</span>
                    <span v-show="showCurren(row.id)" class="active-color">
                        <i v-if="play" class="iconfont icon-shengyin_shiti"></i>
                        <i v-else class="iconfont icon-sound"></i>
                    </span>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作" width="70">
            <template v-slot="{row}">
                <LoveButton :id="row.id"></LoveButton>
                &nbsp;
                <i class="iconfont font-14 icon-down pointer"></i>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="标题" width="675"  show-overflow-tooltip>
            <template v-slot="{row}">
                <span class="c-color" :class="{'active-color':showCurren(row.id)}">{{row.name}}</span>
                <span v-show="row.alia[0]" class="gray">{{`(${row.alia[0]})`}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" width="325">
            <template v-slot="{row}">
                <Creator :creators="row.ar"></Creator>
                <!-- <span class="pointer" @click="toArtistDetail(row.ar[0].id)">{{row.ar[0].name}}</span> -->
            </template>
        </el-table-column>
        <el-table-column prop="al.name" label="专辑" width="300"  show-overflow-tooltip>
            <template v-slot="{row}">
                <span class="pointer" @click="toAlbumDetail(row.al.id)">{{row.al.name}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="dt" label="时间" width="170">
            <template v-slot="{row}">
            {{format.timeFormat(row.dt/1000)}}
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import {PropType} from 'vue'
import { useMainStore } from '@/store/index';
import {musicInfo} from '@/types/music'
import useFormat from '@/hooks/format'
import LoveButton from '../button/LoveButton.vue';
import Creator from '../text/Creator.vue';
import { useRouter } from 'vue-router';
// import {checkMusic} from '@/api/api_music'
// import {ElMessage} from 'element-plus'

const store = useMainStore()
const router = useRouter()
const format = useFormat()

let props = defineProps({
    list:{
        type: Array as PropType<musicInfo[]>,
        required: true
    }
})



let currentMusicId = computed(()=> store.currentMusicId)
let play = computed(()=> store.play)

const playMusic = async (row:{id:number})=>{
    // let res = await checkMusic(row.id);
    store.playMusic({list: props.list,id:row.id})
}
const showCurren = (id:number)=>{
      return currentMusicId.value === id
}

const toAlbumDetail = (id:number)=>{
    router.push({path:"/albumdetail/"+id})
}



</script>


<style lang="scss" scoped>

.active-color {
  color: #ec4141;
}


</style>