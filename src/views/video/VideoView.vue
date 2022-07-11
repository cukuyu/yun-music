<template>
<div class="video-view mtop-10 mleft-20">
    <TabMenu :menu-list="list"></TabMenu>
    <div class="mtop-20">
        <router-view></router-view>
    </div>
</div>
</template>

<script lang="ts" setup>
import TabMenu from '@/components/menu/TabMenu.vue';

const list = [{name:'视频',path:'/video'},{name:'MV',path:'/mv'}]

</script>

<style lang="scss">

</style>