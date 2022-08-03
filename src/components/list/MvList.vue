<template>
<div class="mv-list mtop-10" v-loading="props.list.length==0">
    <div 
    class="mv-list-item" 
    v-for="item in props.list"
    :key="item.id">
        <div class="img-wrap" @click="toMvDetail(item.id)">
            <img :src="item.imgurl+'?param=320y180'" alt="">
            <div class="video-playcount font-12" v-if="item.playCount">
                <i class="iconfont icon-24gl-play font-12"></i>
                {{format.transNumber(item.playCount)}}
            </div>
            <div class="mv-time font-12" >
                {{format.timeFormat(item.duration/1000)}}
            </div>
        </div>
        <div class="text-hidden font-14"  @click="toMvDetail(item.id)">
            {{item.name}}
        </div>
    </div>
</div>
</template>
<script lang="ts" setup>
import {artistMv} from '@/types/mv'
import {PropType} from 'vue'
import useFormat from '@/hooks/format'
import { useRouter } from 'vue-router';

const format = useFormat()
const router = useRouter()

const props = defineProps({
    list: {
        type:Array as PropType<artistMv[]>,
        required:true
    }
})

const toMvDetail = (id:number)=>{
    router.push("/videodetail/mv/"+id)
}

</script>

<style lang="scss" scoped>
.mv-list{
    display: flex;
    // align-items: center;
    flex-wrap: wrap;
    .mv-list-item{
        width: 19%;
        margin-right: 1%;
        margin-bottom: 20px;
        // margin-bottom: 25px;
        .img-wrap{
            position: relative;
            img{
                // height: 180px;
                // height: ;
                border-radius: 3%;
            }
            .video-playcount{
                position: absolute;
                top: 2px;
                right: 5px;
                color: #ffffff;
            }
            .mv-time{
                position: absolute;
                bottom:  10px;
                right: 5px;
                color: #ffffff;
            }
        }
       
    }
}

</style>