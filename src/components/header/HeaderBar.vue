<template>
    <!-- 头部模块 -->
    <div class="header-bar"
    :class="{'drawer-color':store.drawerView,'close-drawer-color':!store.drawerView}"
    >
        <!-- 网易云字体图标 -->
        <div class="header-left">
            <div class="logo" >
                <i class="iconfont icon-logView pointer" v-show="!store.drawerView" @click="toHome" ></i>
            </div>

            <!-- 路由历史按钮 -->
            <div class="btn-history">
                <button class="btn-circle" @click="router.go(-1)">
                    <i class="iconfont icon-arrow-left-bold"></i>
                </button>
                <button class="btn-circle" @click="router.go(1)">
                    <i class="iconfont icon-arrow-right"></i>
                </button>
            </div>

            <!-- 搜索框 -->
            <div class="search-input">
                <el-input 
                style="width: 200px"
                placeholder="搜索"
                >
                <template #prefix>
                <el-icon class="el-input__icon"><search/></el-icon>
                </template>
                </el-input>
            </div>
            <!-- 听歌识曲 -->

            <div class="know-music" v-show="!store.drawerView">
                <el-button><i class="iconfont icon-maikefeng"></i></el-button>
            </div>
        </div>
        <div class="header-right">
            <div class='avatar-wrap  pointer' @click="loginView">
                <el-avatar :size="30" :src="circleUrl"></el-avatar>
            </div>
            <div class="login-info mleft-12 font-12" @click="getAccountInfo">
                {{name}}
                <div
                class="vip-level"
                :class="vipLevel"
                ></div>
                <i class="iconfont icon-bottom-triangle"></i>
                <div v-if="accountInfoView"  ref="accountRef">
                    <div v-if="store.login"><AccountInfo/></div>
                    <div v-else><AccountInfo/></div>
                </div>
            </div> 
            <div class="trans-skin mleft-10">
                <i class="iconfont icon-skin font-20 pointer" @click="themeSkinView = !themeSkinView">
                </i>
                <div class="theme-skin" ref="themeRef" v-if="themeSkinView">
                    <ThemeSkin>
                    </ThemeSkin>
                </div>
            </div>
            <div class="global-setup mleft-20 ">
                <i class="iconfont icon-setup font-20"></i>
            </div>
            <div class="private-message mleft-20 ">
                <i class="iconfont icon-message font-20"></i>
            </div>
            <div class="window-small mleft-20 ">
                <i class="iconfont icon-SmallWindow font-20"></i>
            </div>
            <div class="window-minimize mleft-20">
                <i class="iconfont icon-minimize font-20" @click="windowMinimize"></i>
            </div>
            <div class="window-maximize mleft-20">
                <i class="iconfont icon-maximize font-20" @click="windowMaximize"></i>
            </div>
            <div class="window-off mleft-20  mright-30">
                <i class="iconfont icon-off font-20" @click="windowExit"></i>
            </div>

        </div>
        
    </div>

</template>


<script lang="ts" setup>
import {ref, computed} from 'vue'
import { appWindow,LogicalSize } from '@tauri-apps/api/window';


import ThemeSkin from './headerBar/ThemeSkin.vue';
import AccountInfo from './headerBar/AccountInfo.vue';

import { useAnimation } from '@/hooks/animation';
import {useRouter} from 'vue-router'
import { useMainStore } from '@/store';


const router = useRouter()
const store = useMainStore()
const animation = useAnimation()

let name = computed(()=>{
    if(store.login){
        return store.profile.nickname
    }
    return "未登录"
})
let circleUrl = computed(()=>{
    if(store.login){
        return store.profile.avatarUrl
    }
    return ""
})
// watch(()=>store.drawerView,
//      (val)=>{
//         if(val)  window.document.documentElement.setAttribute("data-theme","theme1")
//         else window.document.documentElement.setAttribute("data-theme","normal")
//      }
// )

window.document.documentElement.setAttribute('data-theme','red')



let vipLevel = computed(()=>{
    if(store.login && store.profile){
        return "vip-"+(store.profile.vipType-6)
    }else{
        return "vip-1-1"
    }
})


const loginView = ()=>{
    if(store.login){
        router.push({path : '/userdetail/' + store.profile.userId})
    }else{
        store.loginView = true
    }
}


let themeRef = ref()
let themeSkinView = animation.clickHidden(themeRef)

let accountRef = ref()
let accountInfoView =  animation.clickHidden(accountRef)

const toHome = ()=>{
    router.push('/personalrecom')
}

const getAccountInfo = ()=>{
    if(store.login){
        accountInfoView!.value = !accountInfoView!.value
    }else{
        store.loginView = !store.loginView
    }
    
}




const windowExit = async()=>{
    if(window.__TAURI__){
        await appWindow.close();
    }
}

const windowMinimize = async()=>{
    if(window.__TAURI__){
       await appWindow.minimize();
    }
}

const windowMaximize = async()=>{
    if(window.__TAURI__){
        if(!store.windowIsMaximize){
            await appWindow.maximize();
        }else{
            await appWindow.setSize(new LogicalSize(1200, 600));
        }
        store.windowIsMaximize = !store.windowIsMaximize
    }
}

</script>

<style lang="scss" scoped>

.header-bar {
    height: 60px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background: $headRed;
    @include get-class-from-key('h-bgc');
    .header-left {
        display: flex;
        align-items: center;
    }

    .header-right {
        display: flex;
        align-items: center;
        .trans-skin{
            position: relative;
        }
    }
    
}




.logo {
    height: 60px;
    line-height: 60px;
    min-width:180px;
    .icon-logView{
        font-size: 48px;
    }
}


.btn-history {
    display: flex;
    margin-left: 100px;
    .btn-circle {
        display: flex;
        width: 26px;
        height: 26px;
        outline: 0;
        border: 0;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-radius: 100%;
        // color: #FFF;
        @include get-class-from-key('h-color');
        @include get-class-from-key('h-bgc');
        filter: brightness(95%) 
    }
}

.search-input {
    position: relative;
    margin-left: 10px;

}

.know-music {
    margin-left: 10px;
    .icon-maikefeng {
        font-size: 22px;
    }
    
}

.login-info {
    position: relative;
    display: flex;
    align-items: center;
    .icon-vip{
        color: #000;
        margin-top: 5px;
        margin-left: 3px;
    }
    .icon-bottom-triangle{
        color: #fff;
        margin-left: -5px;
        font-size: 10px;
    }
}



</style>