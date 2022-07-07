<template>
        <i class="iconfont icon-good mright-3 pointer"
        :class="{ isliked: liked }"
        >
        </i>
</template>

<script lang="ts" setup>

const props = defineProps({
    liked:{
        type:Boolean,
        default:false
    }
})


</script>


<style lang="scss" scoped>
.isliked {
  color: red;
}
</style>