<template>
    <span class="tag">{{props.text}}</span>
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
    },
    height:{
        type: String,
        default:"24px"
    },
    fontSize:{
        type: String,
        default:"16px"
    }
})

</script>

<style lang="scss" scoped>
.tag{
    height: v-bind(height);
    line-height: v-bind(height);
    border: 1px v-bind(color) solid;
    border-radius:3px;
    color:  v-bind(color) ;
    padding:0 1px;
    font-size: v-bind(fontSize);
}

</style>

