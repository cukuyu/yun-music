<template>
 <div class="aside-bar">
     <div class="menu">
        <div 
        v-for="item in commonList"
        :key="item.path"
        :class="{'active-main-page':item.path==indexPath, 'menu-item':!item.isLogin || login, 'menu-item-disable': item.isLogin && !login}"
        @click="toPath(item.path, item.isLogin)"
        >
        <span>{{item.name}}</span>
        </div>
        <div class="menu-group">
            <div class="menu-group-title">我的音乐</div>
            <div 
                class=" menu-item text-hidden"
                v-for="(item, index) in myMusicList"
                v-show="!item.isLogin || login"
                :key="item.path"
                :class="{'active-list':item.path==indexPath}"
                @click="toPath(item.path)"
            >
            <i class="iconfont  font-18 mright-3" 
            :class="item.icon"></i>  
            <span class="text-hidden">{{item.name}}</span>
            </div>
        </div>
        <div class="menu-group" v-if="login">
            <div class="menu-group-title">创建的歌单</div>
            <div 
                class="menu-item text-hidden"
                v-for="item in creList"
                :key="item.id"
                :class="{'active-list':item.id==indexPath}"
                @click="toPath(item.id)"
            >
            <i class="iconfont icon-song-sheet font-18 "></i>
            <span class="text-hidden">{{item.name}}</span>
            </div>
        </div>
        <div class="menu-group" v-if="login">
            <div class="menu-group-title">收藏的歌单</div>
            <div 
                class="menu-item text-hidden"
                v-for="item in subList"
                :key="item.id"
                :class="{'active-list':item.id==indexPath}"
                @click="toPath(item.id)"
            >
            <i class="iconfont icon-song-sheet font-18 "></i>
            <span class="text-hidden">{{item.name}}</span>
            </div>
        </div>

        </div>
 </div>
</template>



<script lang="ts" setup>
import {ref ,reactive, computed, onMounted} from 'vue'
import { useMainStore } from '@/store/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useMainStore()
let commonList = reactive([
    {path:'/personalrecom', name:'发现音乐', isLogin:false},
    {path:'/podcast', name:'播客', isLogin:false},
    {path:'/videoview', name:'视频',  isLogin:false},
    {path:'/follows', name:'关注',  isLogin:true},
    {path:'/live', name:'直播',  isLogin:false},
    {path:'/personalfm', name:'私人FM', isLogin:false},
])


let myMusicList = reactive([
    {path:'/localDownload', name:'本地与下载', isLogin:false, icon:'icon-down'},
    {path:'/historyplay', name:'最近播放', isLogin:false, icon:'icon-recently'},
    {path:'/myCloudPan', name:'我的音乐云盘', isLogin:true, icon:'icon-cloud'},
    {path:'/myPodcast', name:'我的播客', isLogin:true, icon:'icon-music-normal'},
    {path:'/myCollection', name:'我的收藏', isLogin:true, icon:'icon-Collection'},
])


let login = computed(()=> store.login)
let profile = computed(()=> store.profile)

let myPlayList = computed(()=> {
    return store.myPlayList
})

let indexPath = ref("/personalrecom")

onMounted(()=>{
    if(store.anonimousUser) return
    if( !store.login || myPlayList.value.length==0) store.getAcount()
})

let creList = computed(()=>{
    return myPlayList.value.filter((item)=> item.userId === profile.value.userId)
})

let subList = computed(()=>{
    return myPlayList.value.filter((item)=> item.userId !== profile.value.userId)
})



const toPath = (path:string|number,isLogin=false)=>{
    if(!store.login && isLogin) return 
    indexPath.value = path+""
    if(typeof path =='number'){
        indexPath.value = path+""
        path = '/playlistdetail/'+ path
    }
    router.push(path)
}





</script>


<style lang="scss" scoped>


.aside-bar{
    // border-right: 1px solid #e1e1e1;
    @include get-class-from-key('c-color');
    @include get-class-from-key('s-border','border-right');
    @include get-class-from-key('c-bgc');
}
.menu{
   padding: 5px 0 0 10px;
}
.menu-item{
    display: flex;
    align-items: center;
    margin-top: 1px;
    height: 40px;
    font-size: 14px;
    cursor: pointer;
    text-indent: 5px;
}

.menu-item:hover{
    @include get-class-from-key('cl-bgc');
    @include get-class-from-key('cf-color'); 
}

.menu-item-disable{
    @include get-class-from-key('cl-color'); 
    display: flex;
    align-items: center;
    margin-top: 1px;
    height: 40px;
    font-size: 14px;
    cursor: not-allowed;
    text-indent: 5px;
}

.menu-group-title{
    display: flex;
    align-items: center;
    height: 34px;
    @include get-class-from-key('cl-color');
    font-size: 14px;
    text-indent: 5px;
}

.iconfont{
    // color: #909399;
    @include get-class-from-key('c-color');
    @include get-class-from-key('c-bgc');
}

.active-main-page{
    @include get-class-from-key('cl-bgc');
    font-size: 16px;
    font-weight: bold;
}


.active-list{
    @include get-class-from-key('cl-bgc');
}

</style>