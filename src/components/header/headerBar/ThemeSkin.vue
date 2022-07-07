<template>
    <div class="theme-container">
        <TabMenu
        :menuList="[{name:'主题'},{name:'纯色'}]"
        @menuClick="handClick"
        fontSize="14px"
        activeFontSize="14px"
        mode="menu"
        >
        </TabMenu>
        <!-- 主题 -->
        <div class="theme-skins" v-show="menuIndex==0">
            <button @click="changeTheme('drak')">dark</button>
            <button @click="changeTheme('red')">red</button>
        </div>
        <!-- 纯色 -->
        <div class="pure-color" v-show="menuIndex==1">
            <div 
            class="pure-color-item pointer" 
            :style="'background-color:'+item.backgroundColor+';'" 
            @click="changePureColor(item)"
            v-for="item in pureColors">
            </div>
            <div class="pure-color-item"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { useMainStore, } from '@/store';
import TabMenu from '@/components/menu/TabMenu.vue';

const store = useMainStore()
// const pureColors = [{backgroundColor:'#FFFFFF',color:"a"},'#ff5c8a', '#ff7a9e','#717ff9','#4791eb','#39afea',
//                     '#2bb669','#6acc19', '#e2ab12', '#ff8f57', '#fd726d', '#fd544e']

const pureColors = [
    {backgroundColor:'#f5f5f5',color:"#313131"},
    {backgroundColor:'#ff5c8a',color:"#ffffff"},
    {backgroundColor:'#ff7a9e',color:"#ffffff"},
    {backgroundColor:'#717ff9',color:"#ffffff"},
    {backgroundColor:'#4791eb',color:"#ffffff"},
    {backgroundColor:'#39afea',color:"#ffffff"},
    {backgroundColor:'#2bb669',color:"#ffffff"},
    {backgroundColor:'#6acc19',color:"#ffffff"},
    {backgroundColor:'#e2ab12',color:"#ffffff"},
    {backgroundColor:'#ff8f57',color:"#ffffff"},
    {backgroundColor:'#fd726d',color:"#ffffff"},
    {backgroundColor:'#fd544e',color:"#ffffff"},
]
let menuIndex = ref(0)
const handClick = (index:number, )=>{
    console.log("index",index)
    menuIndex.value = index
}
const changeTheme = (color:string)=>{
    window.document.documentElement.setAttribute('data-theme',color)
}

// let pureColor = ref('#FFFFFF')
const changePureColor = (item:{backgroundColor:string, color:string} )=>{
    store.pureColor = item
}
// window.document.documentElement.setAttribute('data-theme','pure-color')

</script>

<style lang="scss">





.theme-container{
    position: absolute;
    z-index: 999;
    top: 43px;
    height: 275px;
    width: 335px;
    transform: translate(-40%);
    color: #000;
    background-color:#FFF;
    border-radius: 1%;
    box-shadow: 0px 0px 10px #ccc;

    .pure-color{
        display: flex;
        flex-wrap: wrap;
        &-item{
            width: 40px;
            height: 40px;
            margin-left: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
        }
        &-item:first-child{
            border: 1px solid #ccc;
        }
        &-item:last-child{
            background-color: #fd544e;
            // background-color: v-bind(store.$state.pureColor.backgroundColor);
        }
    }
}
</style>