<template>
    <span class="tag font-14 ">{{props.text}}</span>
</template>

<script lang="ts" setup>
// import { defineProps } from 'vue';
const props = defineProps({
    text:{
        type: String,
        required: true
    },
    color:{
        type: String,
        default:"#ec4141"
    }
})

</script>

<style lang="scss" scoped>
.tag{
    height: 24px;
    line-height: 26px;
    border: 1px v-bind(color) solid;
    border-radius:3px;
    color:  v-bind(color) ;
    padding: 1px;
}

</style>

