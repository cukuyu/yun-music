<template>
    <span 
    v-for="(item,index) in props.creators"
    :key="item.id"
    @click="handClick(item.id)"
    class="creator pointer"
    >
        <span class="pointer">{{item.name}}</span>
        <span 
        v-if="index!=props.creators?.length-1"
        style="margin:0 5px;"
        >/</span>
    </span>
</template>

<script lang="ts" setup>

import {PropType} from 'vue'
import {useRouter} from 'vue-router'

interface creator{
    id:number,
    name:string
}

const router = useRouter()
const emit = defineEmits(['handClick'])

const props = defineProps({
    creators:{
        type: Array as PropType<creator[]>,
        required: true
    },
    color:{
        type: String,
    },
    mode:{
        type:String,
        default:'router'
    },
    type:{
        type:String,
        default:'artist'
    }
})

const handClick = (id:string|number)=>{
    console.log("handClick",'/artistdetail/'+id)
    console.log("handClick",props.mode)
    if(props.mode=='router'){
        if(props.type=='artist'){
            router.push('/artistdetail/'+id)
        }else{
            router.push('/userdetail/'+id)
        }
       
    }
    else emit('handClick',id)
}

</script>

<style lang="scss" scoped>
.creator{
    @include get-class-from-key('cl5-color');
    color: v-bind('props.color');
}

</style>

