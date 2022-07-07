<template>
    <span class="love-wrapper">
      <i 
      class="iconfont pointer"
      :class="{'icon-liked like':like,'icon-aixin':!like}"
      >
      </i>
    </span>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/store/index';
import { computed } from 'vue';
const store = useMainStore()

const props = defineProps({
    id:{
        type:Number,
        required:true
    },
})

let like = computed(()=>store.likeList.find((item)=>item==props.id)!=undefined)
</script>

<style lang="scss" scoped>
.like{
    color: #ec4141
}
</style>