<template>
<div class="footer-bar">
    <Suspense>
        <Player></Player>
    </Suspense>
</div>
</template>


<script lang="ts" setup>
import Player from '../player/Player.vue';
</script>


<style lang="scss" scoped>
.footer-bar{
 @include get-class-from-key('f-bgc');
 @include get-class-from-key('f-color');
 height: 100%;

 button{
    @include get-class-from-key('f-color');
 }

}
</style>