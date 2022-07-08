<template>
    <div class="player">
        <div class="player-container mleft-10">
            <div class="play-left">
                <img 
                :src="imgInfo.imgUrl" 
                class="img img-radius10 pointer mright-10" @click="changeDrawerView">
                <div class="music-info">
                    <div class="text-hidden font-14 ">
                        <span>{{imgInfo.name}}</span> 
                        <LoveButton :id="currentMusicId"></LoveButton>
                    </div>
                    <div class="text-hidden font-12">{{imgInfo.author}}</div>
                </div>
            </div>
            <div class="player-wrapper">
                <div class="player-bar">
                    <button class="no-btn">
                        <i class="iconfont icon-liebiaoshunxu" ></i>
                    </button>
                    <button class="no-btn" @click="nextMusic(-1)">
                        <i class="iconfont icon-shangyishou"></i>
                    </button >
                    <button class="no-btn" @click="pause">
                        <i v-show="play"  class="iconfont icon-zanting"></i>
                        <i v-show="!play" class="iconfont icon-bofang "></i>
                    </button>
                    <button class="no-btn" @click="nextMusic(1)">
                        <i class="iconfont icon-xiayishou"></i>
                    </button>
                    <button class="no-btn">
                        <i class="iconfont icon-geci"></i>
                    </button>
                </div>
                <div class="time-progress">
                    <span class="font-12 gray">
                        {{format.timeFormat(currentTime)}}
                    </span>
                    <el-slider 
                    class="timeSlider"
                    v-model="currenPercent"
                    :show-tooltip="false"
                    @change="changeCurrenTime">
                    </el-slider>
                    <span class="font-12 gray">
                        {{format.timeFormat(currentMusicInfo.totalTime/1000)}}
                    </span>
                </div>
            </div>
            <div class="btn-other mright-30">
                <div class="tone-quality pointer">
                    <Tag text="标准" color="#000"></Tag>
                </div>
                <div class="jingyun" @click="drawerSound = !drawerSound">
                    <i class="iconfont icon-jingyun font-24 pointer"></i>
                  
                </div>
                <div class="volume">
                    <el-popover
                        placement="top-start"
                        trigger="hover"
                        :width="6"
                        popper-style="min-width:0"
                    >
                        <template #reference>
                            <i class="iconfont pointer font-24"
                            :class="{'icon-shengyin':volume!=0,'icon-shengyinguanbi': volume===0 }"
                            @click="mute">
                            </i>
                        </template>
                        <template #default>
                            <el-slider
                            vertical
                            height="100px"
                            :show-tooltip="false"
                            v-model="volume"
                            >
                            </el-slider>
                        </template>
                    </el-popover>
                </div>
                <div class="listen-togather">
                    <i class="iconfont  icon-yiqipindan  pointer font-24"></i>
                </div>
                <div class="curren-list" @click="drawer=!drawer">
                    <i class="iconfont  icon-liebiaoshunxu  pointer font-24"></i>
                </div>
            </div>
        </div>
        <audio 
        :src="musicUrl" 
        ref="audioRef"
        @timeupdate="updateCurrenTime"
        @ended="nextMusic(1)">
        </audio>
        <div 
        v-show="drawer" 
        ref="drawerBarRef">
            <DrawerBar  @changIndex="nextMusic"></DrawerBar>
        </div>
        
        <DrawerView :img-info="imgInfo"></DrawerView>
        <div v-if="drawerSound" ref="drawerSoundRef"> <DrawerSound></DrawerSound></div>
    </div>
</template>


<script lang="ts" setup>
import {getMusicUrl} from '@/api/api_music'
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useMainStore } from '@/store/index';
import Tag from '../text/Tag.vue';
import DrawerBar from '@/components/drawer/DrawerBar.vue';
import DrawerView from '@/components/drawer/DrawerView.vue';
import DrawerSound from '@/components/drawer/DrawerSound.vue';
import useFormat from '@/hooks/format'
import LoveButton from '@/components/button/LoveButton.vue';
import {ElMessage} from 'element-plus'
import { useAnimation } from '@/hooks/animation';
import { useAudio } from '@/hooks/audio';

const format = useFormat()
const store = useMainStore()




let musicUrl = ref("")

let imgInfo = reactive({
    imgUrl: 'https://cdn.jsdelivr.net/gh/crazybox521/blogImg/music.jpg',
    name:"未知名歌",
    author:"未知名歌手"
})


let audioRef = ref()
let audio = useAudio(audioRef)

// 音量
let volume = ref(20)
let lastVolume = ref(20)
// 进度条百分比
let currenPercent = ref(0)

let currentMusicId = computed(()=>store.currentMusicId)

let currentIndex= computed(()=>store.currentIndex)
let musicList = computed(()=> store.musicList)
let currentMusicInfo = computed(()=> {
    return store.currentMusicInfo
})

let currentTime =  computed(()=> {
    return store.currentMusicInfo.currentTime
})   
let play = computed(()=>{{
    return store.play
}})



//监听歌曲id id改变获取 musicUrl
watch(()=>currentMusicId.value,
     (val)=>{
        getMusic()
        store.play = true
    }
)

watch(()=>play.value,
    (val)=>{
        if(musicUrl.value==null||musicUrl.value.length==0){return}
        if(val){
            audio.play()
        } else {
            audio.pause()
        }
    }
)

watch(()=>volume.value,
    (val,old)=>{
        changeVolume(val)
        lastVolume.value = old
    }
)

watch(()=>musicUrl.value,
    (val)=>{
        if(val==null){return}
        nextTick(()=>{
            audio.play()
        })
    }
)



const getMusic = async()=>{
    if(!currentMusicId.value){
        return 
    }
    getImgInfo()
    getTolaltime()
    let res = await getMusicUrl(currentMusicId.value);
    if(res.code!=200) return
    else{
        musicUrl.value = res.data[0].url
    }
}

const getImgInfo = ()=>{
    if(musicList.value[currentIndex.value].al.picUrl)
        imgInfo.imgUrl = musicList.value[currentIndex.value].al.picUrl
    else 
        imgInfo.imgUrl = ''
    imgInfo.author = musicList.value[currentIndex.value].ar[0].name
    imgInfo.name = musicList.value[currentIndex.value].name
}

const pause = ()=>{
    if(musicUrl.value==null||musicUrl.value.length==0){
        ElMessage.error('播放失败')
    }
    else store.play = !play.value
}

const getTolaltime = ()=> {
      store.currentMusicInfo.totalTime =  musicList.value[currentIndex.value].dt
}


const updateCurrenTime = ()=>{
    let curTime = audioRef.value.currentTime
    curTime = Math.floor(curTime)
    if(curTime != currentTime){
        store.currentMusicInfo.currentTime = curTime
        currenPercent.value = Math.floor((curTime*100000)/currentMusicInfo.value.totalTime)
    }
}

const changeCurrenTime = (time:number)=>{
    let cur = time/100 * currentMusicInfo.value.totalTime /1000;
    audioRef.value.currentTime = cur
}


const changeVolume = (val:number)=>{
    audioRef.value.volume = val/100
}

//静音
const mute = ()=>{
    if(volume.value!=0) volume.value = 0
    else {
        if(lastVolume.value==0 || lastVolume.value==1) lastVolume.value = 20
        volume.value = lastVolume.value
        lastVolume.value = volume.value
    }
}
const nextMusic = (val:number)=>{
    let nextIndex = (currentIndex.value+val+musicList.value.length) % (musicList.value.length)
    store.currentMusicId = musicList.value[nextIndex].id
    store.currentIndex = nextIndex

    //设置drawerView的背景颜色变化
    if(store.drawerView && window.document.documentElement.getAttribute("data-theme")!="drak"){
        let rgb = []
        for(let i=0;i<3;i++){
            rgb.push(Math.floor(Math.random()*60)+170)
        }
        document.body.style.setProperty('--draw-bg', `linear-gradient(rgb(${rgb[0]},${rgb[1]},${rgb[2]}) 0%, #FFF 40%) fixed`)
    }
   
}


// const canPlayEnd =  ()=>{
//     console.log("true")
// }


//设置drawerView的主题
const changeDrawerView = ()=>{
    store.drawerView = !store.drawerView
    if(store.drawerView){
        if(window.document.documentElement.getAttribute("data-theme")!="drak"){
                document.body.style.setProperty('--draw-bg', 'linear-gradient(#e7e7e7 0%, #FFF 40%) fixed')
                document.body.style.setProperty('--draw-h-color', '#7a7a7a')
                document.body.style.setProperty('--draw-bright', 'brightness(95%)')
                document.body.style.setProperty('--draw-record-bgc', '#c4c3c6')
                document.body.style.setProperty('--lyric-color', '#666666')
                document.body.style.setProperty('--lyric-active-color', '#000000')
                document.body.style.setProperty('--draw-comment-button-bgc', '#f1f1f1')
            }else{
                document.body.style.setProperty('--draw-bg', 'linear-gradient(#2c2c2c 0%, #2b2b2b 40%) fixed')
                document.body.style.setProperty('--draw-h-color', '#808080')
                document.body.style.setProperty('--draw-bright', 'brightness(120%)')
                document.body.style.setProperty('--draw-record-bgc', '#353535')
                document.body.style.setProperty('--lyric-color', '#696969')
                document.body.style.setProperty('--lyric-active-color', '#ffffff')
                document.body.style.setProperty('--draw-comment-button-bgc', '#3e3e3e')
        }
    }
}

//点击视图外 关闭视图
const animation = useAnimation()
let drawerBarRef = ref()
let drawer = animation.clickHidden(drawerBarRef)

let drawerSoundRef = ref()
let drawerSound =  animation.clickHidden(drawerSoundRef)
</script>

<style lang="scss" scoped>


.player-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}
.play-left{
    display: flex;
    align-items: center;
    width: 300px;
    height: 80px;
    
}

.img{
    width: 50px;
    height: 50px;
}



.player-bar{
    margin-top: 6px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    margin: 0 auto;

    & .no-btn:nth-child(3) {
        height: 32px;
        width: 32px;
        border-radius: 50%;
    }
    & .no-btn:hover{
        color: $headRed;
    }
}

.time-progress{
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.timeSlider {
    width: 460px;
    margin: 0 10px;
}

.btn-other{
    display: flex;
    width: 200px;
    align-items: center;
    justify-content: space-between;
}
</style>