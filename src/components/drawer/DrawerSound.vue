<template>
<div class="drawer-sound">
    <div class="sound-header">
        <span class="c-color font-16 ">鲸鱼音效</span>
    </div>
    <div class="recom-effect">
        <div class="cl4-color font-12">推荐音效</div>
        <div class="recom-effect-list">
            <div 
            class="recom-effect-item"
            v-for="(item,index) in recomEffect"
            @click="changeEffect(item.node, index)"
            :class="{'active':index==recomInd}"
            >
                <span class="mleft-20" >{{item.name}}</span>
            </div>
            
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMainStore } from '@/store';
const store = useMainStore()


const recomEffect = [{name:'360°环绕',node:'panner'},{name:'无',node:''}] 
let recomInd = ref(-1)

const changeEffect = (node:string, index:number)=>{
    recomInd.value = index
    store.audioEffect = node
}
</script>

<style lang="scss" scoped>
.drawer-sound{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 700px;
    height: 440px;
    @include get-class-from-key('sound-effct-bgc');
    .sound-header{
        display: flex;
        align-items: center;
        height: 55px;
        padding-left: 30px;  
        @include get-class-from-key('sound-effct-header-bgc');
    }
    z-index: 300;
    .recom-effect{
        margin: 20px 0 0 30px;
        .recom-effect-list{
            display: flex;
            flex-wrap: wrap;
           .recom-effect-item{
                display: flex;
                align-items: center;
                margin-top: 10px;
                width: 320px;
                height: 80px;
                border-radius: 10px;
                border: 1px solid transparent;
                @include get-class-from-key('sound-effct-item-bgc');
           }
           .recom-effect-item:nth-child(even){
                margin-left: 10px;
           }
        }
    }
}

.active{
    border-color: #ff0000 !important;
}

</style>