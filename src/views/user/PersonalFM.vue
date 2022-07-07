<template>
    <div class="person-fm">

        
    </div>
</template>


<script lang="ts" setup>
import { getPersonalFm } from '@/api/api_music'


const toPersonalFM =  async()=>{
    const res = await getPersonalFm()
    if(res.code!=200) return
    console.log("toPersonalFM",res)
}
toPersonalFM()
</script>

<style lang="scss" scoped>


</style>