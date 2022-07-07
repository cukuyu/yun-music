<template>
        <div>
        <div class="home-page">
            <div class="router-list" >
                <TabMenu 
                :menuList="routerList"
                ></TabMenu>
            </div>
        </div>
        <div class="home-page-view">
            <!-- <transition name="el-fade-in"> -->
                <suspense>
                <router-view>
                </router-view>
                </suspense>
            <!-- </transition> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import TabMenu from '@/components/menu/TabMenu.vue'
import {reactive} from 'vue'

const routerList = reactive([
    {path: '/personalrecom', name: '个性推荐' },
    {path: '/personalcustom', name: '专属定制' },
    {path: '/playlist', name: '歌单' },
    {path: '/ranklist', name: '排行榜' },
    {path: '/artistlist', name: '歌手' },
    {path: '/newmusic', name: '最新音乐' },
])
</script>


<style lang="scss" scoped>
.home-page-view {
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
    margin-top: -40px;
}

.home-page {
    margin-top: 10px;
    margin-left: 30px;
    // margin-bottom: 0px;
}
</style>