<template>
    <span class="love-wrapper" @click="tolike">
      <i 
      class="iconfont pointer"
      :class="{'icon-liked like':like,'icon-aixin':!like}"
      >
      </i>
    </span>
</template>

<script lang="ts" setup>
import { likeMusic} from '@/api/api_music'
import { computed } from 'vue';
import {ElMessage} from 'element-plus'
import { useMainStore } from '@/store/index';

const store = useMainStore()

const props = defineProps({
    id:{
        type:Number,
        required:true
    },
})

let like = computed(()=>store.likeList.find((item)=>item==props.id)!=undefined)

const tolike = async ()=>{
    if(!store.login){
        store.loginView = true
        ElMessage.success("请先登录")
    }else{
        if(!like.value){
            const res = await likeMusic(props.id)
            if(res.code!=200) return
            store.likeList.push(props.id)
        }else{
            const res = await likeMusic(props.id, false)
            if(res.code!=200) return
            let index = store.likeList.indexOf(props.id)
            store.likeList.splice(index,1)
        }
        
    }
}
</script>

<style lang="scss" scoped>
.like{
    color: #ec4141
}
</style>