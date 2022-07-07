<template>
    <div class="new-music">
        <div class="new-music-btn">
            <button 
            class="song-album-btn" 
            :class="{ 'active': compoIndex == 0 }"
             @click="compoIndex=0">
                新歌速递
            </button>

            <button 
            class="song-album-btn" 
            :class="{ 'active': compoIndex == 1 }"
            @click="compoIndex=1">
                新碟上架
            </button>
        </div>
        <!-- <div class="new-music-view"> -->
            <component :is="compo" />
        <!-- </div> -->
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import NewSong from '@/views/home/homepageview/newmusic/NewSong.vue'
import NewAlbum from '@/views/home/homepageview/newmusic/NewAlbum.vue'

let compoIndex = ref(0)
const dyCompo = [NewSong, NewAlbum]

let compo = computed(()=> dyCompo[compoIndex.value])


</script>

<style lang="scss" scoped>
.new-music {
    margin-top: 60px;

    .new-music-btn {
        width: 232px;
        height: 32px;
        margin: 0 auto;
        @include get-var('border','1px solid','cl3-color');
        
        border-radius: 25px;

        .song-album-btn {
            width: 50%;
            height: 30px;
            border-radius: 25px;
            border: none;
            @include get-class-from-key('c-bgc');
            
            &:hover {
                 @include get-class-from-key('draw-hover-bgc');
            }

        }

        .active {
            @include get-class-from-key('cl7-bgc');
            color: #fff;
            &:hover {
               @include get-class-from-key('cl7-bgc');
            }
        }
    }
}
</style>