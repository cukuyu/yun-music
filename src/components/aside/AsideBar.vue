<template>
 <div class="aside-bar">
     <!-- <el-menu router :default-active="activeMenu"  @select="handleSelect">
        <el-menu-item 
        v-for="item in commonList"
        :key="item.path"
        :index="item.path"
        >
        <span>{{item.name}}</span>
        </el-menu-item>
        <el-menu-item-group>
            <template #title>我的音乐</template>
            <el-menu-item
            v-for="item in myMusicList"
            :key="item.path"
            :disabled="item.isLogin && !login"
            >
            <i class="iconfont  font-18 mright-3" 
            :class="item.icon"></i>  
            {{item.name}}
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group v-if="login">
            <template #title>创建的歌单</template>
            <el-menu-item
            v-for="(item,index) in creList"
            :key="item.id"
            :index="subPath(item.id as number)"
            class="text-hidden"
            >
            <div class="text-hidden">
                <i class="iconfont font-18 "
                :class="{'icon-song-sheet': index>0,'icon-love': index==0}"
                ></i>
                {{item.name}}
            </div>
            </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group  v-if="login">
            <template #title>收藏的歌单</template>
            <el-menu-item
            v-for="item in subList"
            :key="item.id"
            :index="subPath(item.id as number)"
            >
            <div class="text-hidden"> 
                <i class="iconfont icon-song-sheet font-18 "></i>
                {{item.name}}
            </div>
            </el-menu-item>
        </el-menu-item-group>
     </el-menu> -->
     <div class="menu">
        <div 
        class="menu-item"
        v-for="item in commonList"
        :key="item.path"
        :class="{'active-main-page':item.path==indexPath}"
        @click="toPath(item.path)"
        >
        <span>{{item.name}}</span>
        </div>
        <div class="menu-group">
            <div class="menu-group-title">我的音乐</div>
            <div 
                class=" menu-item text-hidden"
                v-for="(item, index) in myMusicList"
                :key="item.path"
                :class="{'active-list':item.path==indexPath}"
                @click="toPath(item.path)"
            >
            <i class="iconfont font-18 "
            :class="{'icon-song-sheet': index>0,'icon-love': index==0}"
                ></i>
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
    {path:'/personalrecom', name:'发现音乐'},
    {path:'/podcast', name:'播客', },
    {path:'/video', name:'视频',},
    {path:'/follows', name:'关注', },
    {path:'/live', name:'直播',},
    {path:'/personalfm', name:'私人FM'},
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
let myPlayList = computed(
    ()=> {
        return store.myPlayList
    }
    )
let indexPath = ref("/personalrecom")

onMounted(()=>{
    if(!store.login || myPlayList.value.length==0) store.getAcount()
})

let creList = computed(()=>{
    return myPlayList.value.filter((item)=> item.userId === profile.value.userId)
})

let subList = computed(()=>{
    return myPlayList.value.filter((item)=> item.userId !== profile.value.userId)
})



const toPath = (path:string|number)=>{
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