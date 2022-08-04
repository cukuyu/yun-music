<template>
    <!-- 头部模块 -->
    <div class="drawer-header"
    :class="{'drawer-color':store.drawerView,'close-drawer-color':!store.drawerView}"
    >
        <!-- 网易云字体图标 -->
        <div class="header-left">
            <div class="logo" >
                <i class="iconfont icon-arrow-right font-20 mleft-40 pointer"  @click="store.drawerView = !store.drawerView" ></i>
            </div>

            <!-- 路由历史按钮 -->
            <div class="btn-history">
                <button class="btn-circle"  @click="router.go(-1)">
                    <i class="iconfont icon-arrow-left-bold"></i>
                </button>
                <button class="btn-circle"  @click="router.go(1)"> 
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
            <div class="window-off mleft-20  mright-30 ">
                <i class="iconfont icon-off font-20" @click="windowExit"></i>
            </div>

        </div>
        
    </div>

</template>


<script lang="ts" setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { useMainStore } from '@/store';
import ThemeSkin from '@/components/header/headerBar/ThemeSkin.vue';
import { useAnimation } from '@/hooks/animation';
import { appWindow,LogicalSize } from '@tauri-apps/api/window';
const router = useRouter()
const store = useMainStore()
const animation = useAnimation()

let themeRef = ref()
let themeSkinView = animation.clickHidden(themeRef)

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

.drawer-header {
    height: 60px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--draw-h-color);
    // background: $headRed;
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
        color: var(--draw-h-color);
        background: var(--draw-bg) !important;
        filter: var(--draw-bright);
        // @include get-class-from-key('bright');
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