<template>
    <transition name="slide-fade">
    <div class="drawer" id="drawerBar" >
        <div class="draw-wrapper mtop-20 mleft-20 mright-20">
            <div class="font-24 font-bold ">当前播放</div>
            <div class="music-info mtop-10">
                <div class="font-12 gray">总{{musicList.length}}首</div>
                <div class="pointer" style="margin-left: 150px;">
                    <i class="iconfont icon-shoucang2 font-16 " ></i> &nbsp;<span class="font-14">收藏全部</span>
                </div>
                <div class="mleft-30 cblue-color bright-hover font-14 pointer">
                    清空列表
                </div>
            </div>
        </div>
        <div class="draw-table mtop-20">
            <el-table
            :data="musicList"
            size="default"
            stripe
            tooltip-effect="light"
            @row-dblclick="playMusic"
            :show-header="false"
            :max-height="tableHeight"
            :row-class-name="rowClassName"
            >
                <el-table-column prop="name"  width="190"  show-overflow-tooltip>
                    <template v-slot="{row}">
                    <span v-show="!showCurren(row.id)">&nbsp;&nbsp;</span>
                    <span v-show="showCurren(row.id)" class="active-color font-12 ">
                        <i v-if="play" class="iconfont icon-shengyin_shiti"></i>
                        <i v-else class="iconfont icon-sound"></i>
                        &nbsp;
                    </span>
                    <span 
                    :class="{'active-color':showCurren(row.id)}"
                    class="c-color"
                    >
                    {{row.name}}
                    </span>
                    <span v-show="row.alia[0]" class="gray">{{`(${row.alia[0]})`}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ar[0].name" width="90"  show-overflow-tooltip/>
                <el-table-column prop="al.name"  width="30"  show-overflow-tooltip/>
                <el-table-column prop="dt"  width="100">
                    <template v-slot="{row}">
                    {{format.timeFormat(row.dt/1000)}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, } from 'vue';
import { useMainStore } from '@/store/index';

import useFormat from '@/hooks/format'

const format = useFormat()
const store = useMainStore()
const emit = defineEmits(['changIndex'])

let musicList = computed(()=>store.musicList)
let drawerHeight = computed(()=>{
    return (store.clientHeight -60-80)+"px"
})


let tableHeight = computed(()=>{
    return (store.clientHeight -60-80-95)
})
let currentIndex = computed(()=>store.currentIndex)
let currentMusicId = computed(()=>store.currentMusicId)
let play = computed(()=> store.play)

// let drawerHeight = layoutRef.value.getheight.offsetHeight
onMounted(()=>{
  window.onresize = () => {
        return (() => {
            console.log(`clientHight:${document.documentElement.clientHeight}`)
            store.clientHeight = parseInt(`${document.documentElement.clientHeight}`)
        })()
    }
})

// 将索引插入数据中
const rowClassName = ({row, rowIndex}:{row:any,rowIndex:number})=>{
    row.rowIndex = rowIndex
}

const playMusic = (row:any)=>{
    emit('changIndex',-currentIndex.value+row.rowIndex)
    // store.commit(row)
}
const showCurren = (id:number)=>{
      return currentMusicId.value === id
}




</script>



<style lang="scss" scoped>

.music-info{
    display: flex;
    align-items: center;
}


.drawer{
  position: fixed;
  height: v-bind(drawerHeight);
  width: 420px;
  top: 60px;
  right: 0px;
//   background-color: #FFF;
  z-index: 100;
  overflow: hidden;
  @include get-class-from-key('draw-bgc');
//   overflow-y: auto;
//   overflow-x: hidden;
  @include get-var('box-shadow','-2px 0 2px','cl-bgc');
}

.active-color {
  color: #ec4141;
}


</style>

