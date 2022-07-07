<template>
    <div class="music-info">
        <div class="music-title font-30 ">{{ imgInfo.name }}</div>
        <div class="music-author font-14 mtop-10">{{ imgInfo.author}} - {{imgInfo.name}}</div>
    </div>
    <div class="lyric-view">
        <!-- 唱片 -->
        <div class="record-player">
            <!-- 唱头 -->
            <div 
            class="pickup pointer" 
            :class="{'pickup-active':store.play}"
            @click="()=>store.play=!store.play">
                <img src="@/assets/img/pickup.png" alt="" />
            </div>
            <div 
            class="reacord"
            :class="{'record-active':store.play}"
             >
                <div class="record-wrap">
                    <img :src="imgInfo.imgUrl" />
                </div>
            </div>
        </div>
        <Lyric></Lyric>
        <div class="relation-info"></div>
    </div>

    
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store';
import Lyric from './Lyric.vue';

const store = useMainStore();
const props = defineProps({
    imgInfo:{
        type:Object,
        required:true
    }
})


</script>

<style lang="scss" scoped>
.music-info{
    text-align: center;
    .music-author {
        color: #939293;
    }
}


.lyric-view{
    display: flex;
    justify-content: space-between;
    .record-player{
        min-width: 21%;
        position: relative;
        .pickup{
            position: absolute;
            top: -50px;
            left: 120px;
            width: 150px;
            //transform-origin 属性用于设置旋转元素的基点位置
            transform-origin: 1px 1px;
            transition: all 0.5s;
            z-index: 20;
            img {
                width: 150px;
            }
        }
        .reacord{
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 30px;
            width: 280px;
            height: 280px;
            background-color: #c4c3c6;
            border-radius: 50%;
            .record-wrap{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 260px;
                height: 260px;
                background-color: #1a1c1e;
                border-radius: 50%;
           
                img{
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                }
            }

        }
        
    }

    .relation-info{
        min-width: 20%;
    }
}


.pickup-active{
    transform: rotate(30deg);
}

.record-active {
  animation: circle 30s infinite linear;
  
}
@keyframes circle {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}


</style>