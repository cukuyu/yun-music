<template>
    <div class="lyric-wrap" ref="lyricRef">
       <p  
       v-for="(line, index) in lyricObj?.lines"
        :key="index"
        class="lyric-lines text-hidden"
        :class="{'active':index==lyricObj?.curren,'normal':index!=lyricObj?.curren}"
       > 
         {{ line?.txt }}
       </p>
    </div>

</template>

<script lang="ts" setup>
import {getLyric} from '@/api/api_music'
import {useMainStore} from '@/store'
import {ref, watch} from 'vue'
import useLyric from "@/hooks/lyric"
import {LyricBase} from '@/types/music'
import {useAnimation} from '@/hooks/animation'

const animation = useAnimation()


const props = defineProps({
    height:{
        type:String,
        default: '400px'
    }
})


const store = useMainStore()
let lyricObj = ref<LyricBase>() 

let lyricRef = ref()
let next = ref(0)
watch(()=> store.currentMusicInfo.currentTime,
    (val,old)=>{
        srollLyric(val,old)
    })

watch(()=>store.currentMusicId,(val)=>{
    if(lyricObj.value || store.playType=='music'){
        lyricObj.value!.curren = 0
        lyricRef.value.scrollTop = 0
    }
    next.value = 0
   
    getLyricById()
})

const getLyricById = async ()=>{
    const res = await getLyric(store.currentMusicId)
    if(res.code!=200) return
    lyricObj.value = useLyric(res.lrc.lyric).value

    //初始化滑动
    if(store.currentMusicInfo.currentTime!=0){
        srollLyric(store.currentMusicInfo.currentTime,-1)
    }
}

const srollLyric  = (time:number,old:number)=>{
    if(!lyricObj.value || !time || !old) return

    //正常播放
    if(time==old+1){
        if(next.value<lyricObj.value?.lines.length && lyricObj.value?.lines[next.value].time< time+0.5){
            next.value ++
        }
    }
    //拖拽歌曲播放滑动条
    else{
        next.value = lyricObj.value?.lines.findIndex((item)=>item.time>=time+0.5)
        next.value = next.value==-1? lyricObj.value?.lines.length : next.value
    }

    if(next.value-1!=lyricObj.value?.curren ){
        let preCurren =  lyricObj.value.curren 
        lyricObj.value.curren = next.value-1
        scrollAnimation(lyricObj.value.curren,preCurren)
    }
}



const scrollAnimation = (curline:number,preline:number, timeOfAnimation:number = 300)=>{
    if(curline<=4 && preline<=4) {
        lyricRef.value.scrollTop = 0
        return
    }
    curline -=4
    preline -=4
    animation.scrollAnimation(40 * preline, 40 * curline, lyricRef.value, timeOfAnimation)
}


getLyricById()

</script>

<style lang="scss" scoped>

.lyric-wrap{
    // width: 600px;
    // position: relative;
    height: v-bind(height);
    overflow-y: scroll;
    .lyric-lines{
        text-align: center;
        height: 40px;
    }

    // &::after {
    // position: absolute;
    // content: '';
    // width: 100%;
    // height: 100%;
    // top: 0;
    // left: 0;
    // box-shadow:0 0 50px 30px  inset;
    // }
}

.active {
    font-size: 18px;
    font-weight: bold;
    @include get-class-from-key('cf-color');
}
.normal {
    font-size: 16px;
    @include get-class-from-key('cl-color');
}


</style>