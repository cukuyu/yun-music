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
            <div class="theme-skins-color mright-5" @click="changeTheme('dark')">
                <img src="@/assets/img/skin-dark.jpeg" alt="">
                <div class="skin-check-icon" v-if="themeSkin=='dark'">
                    
                    <el-icon><check/></el-icon>
                </div>
            </div>
            <div class="theme-skins-color mright-10" @click="changeTheme('red')">
                <img src="@/assets/img/skin-red.jpeg" alt="">
                <div class="skin-check-icon" v-if="themeSkin=='red'">  
                    <el-icon><check/></el-icon>
                </div>
            </div>
           

        </div>
        <!-- 纯色 -->
        <div class="pure-color" v-show="menuIndex==1">
            <div 
            class="pure-color-item pointer" 
            :style="'background-color:'+item.backgroundColor+';'" 
            @click="changePureColor(item)"
            v-for="item in pureColors">
            </div>
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

const themeSkin = ref(window.document.documentElement.getAttribute("data-theme"))


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
    menuIndex.value = index
}
const changeTheme = (color:string)=>{
    themeSkin.value = color
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
    padding: 0 10px;
    @include get-class-from-key('c-bgc');
    @include get-class-from-key('c-color');
    border-radius: 1%;
    @include get-var('box-shadow','0px 0px 4px','cl-color');

    .theme-skins{
        display: flex;
        flex-wrap: wrap;
        
        .theme-skins-color{
            position: relative;
            margin-left: 10px;
            .skin-check-icon{
                position: absolute;
                bottom: 5px;   
                right: 5px;             
                height: 20px;
                width: 20px;
                color: #fff;
                background-color:#ec4141;
                line-height: 20px;
                text-align: center;
                border-radius: 50%;
                
            }
            img{
            width: 80px;
            height: 80px;
            border-radius: 5%;
            }
        }
        
    }

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