<template>
    <ul class="tab-menu">
        <li 
        v-for="(item,index) in props.menuList" 
        @click="handMenuClick(index, item)"
        :key="index"
        class="pointer"
        :class="{isActive: tableIndex==index}"
        >
        <span>{{item.name}}</span>
        </li>
    </ul>
</template>


<script lang="ts" setup>
import {ref, PropType, computed} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()

interface menuList {
    path?:string,
    name:string
}


const props = defineProps({
    menuList:{
        type:Array as PropType<menuList[]>,
        required:true
    },
    mode:{
        type:String,
        default: 'router'
    },
    fontSize:{
        type:String,
        default: '16px'
    },
    activeFontSize:{
        type:String,
        default: '20px'
    }
})

const emits = defineEmits(['menuClick'])

let tableIndex = ref(0)
let font = computed(()=>props.fontSize)
let activefont = computed(()=> props.activeFontSize)

const handMenuClick = (index:number,item:menuList)=>{
    tableIndex.value = index
    if(props.mode=='router'){
        router.push({path:item.path!})
    }
    emits('menuClick',index)
}


</script>

<style lang="scss" scoped>
.tab-menu {
    display: flex;
    // justify-content: center;
    justify-content: flex-start;
    align-items: center;

    li {
        margin: 10px;
        font-size: v-bind(font);
        &.isActive {
            font-size: v-bind(activefont);
            font-weight: bold;

            &::after{
                display: block;
                content: '';
                height: 4px;
                width: 90%;
                margin: 0 auto;
                background-color: #ec4141;
                border-radius: 2px;
            }
        }

    }
}
</style>