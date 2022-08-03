<template>  
  <div class="layout" >
    <header class="header"><HeaderBar></HeaderBar></header>
    <main class="main">
      <aside class="aside" v-show="!store.videoView">
        <AsideBar></AsideBar>
      </aside>
      <div class="main-right">
          <div class="view-main">
            <router-view v-slot="{ Component }">
                <transition name="el-fade-in">
                  <suspense>
                    <component :is="Component"/>
                  </suspense>
                </transition>
          </router-view>
          </div>
        <!-- <el-backtop target=".main-right" :bottom="100"></el-backtop> -->
      </div>
    </main>
    <div class="footer" v-show="!store.videoView">
      <FooterBar></FooterBar>
    </div>
    <div v-if="store.loginView"><Login></Login></div>
  </div>
</template>

<script lang="ts" setup>
import HeaderBar from '@/components/header/HeaderBar.vue'
import AsideBar from '@/components/aside/AsideBar.vue';
import FooterBar from '@/components/footer/FooterBar.vue'
import Login from './Login.vue';

import { useMainStore } from '@/store';
import { computed } from 'vue';
const store = useMainStore()

//打开video时的bottom是0
let videoBottom = computed(()=>{
  return store.videoView?'0px':'80px'
})

</script>


<style lang="scss" scoped>
.layout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow:hidden;
}


.main {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: v-bind('videoBottom');
  height: auto;
  width: auto;
  @include get-class-from-key('c-color');
  @include get-class-from-key('c-bgc');
}

.aside {
  position: absolute;
  width: 200px;
  height: 100%;
  left: 0px;
  bottom: 0px;
  // background-color: #ffffff;
  overflow-y: scroll;
  overflow-x: hidden;

}

.main-right{
  position: absolute;
  left: 200px;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: auto;
  overflow-y: scroll;
  // background-color: #FFF;
  overflow-x: hidden;
  scrollbar-width: thin;
  // .view-main {
    // width: 90%;
    // margin: 0 auto;
    // max-width: 1100px;
    // background-color: cadetblue;
  // }
  
}




.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  @include get-class-from-key('s-border','border-top');
  z-index: 200;
}
</style>