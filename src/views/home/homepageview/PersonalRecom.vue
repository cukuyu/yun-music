<template>
    <div class="personal-recome mtop-60">
        <div class="swiper-wraper">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in bannerList" :key="item">
                    <img :src="item.imageUrl" alt="">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="play-list">
            <h2 class="font-20 font-bold pointer">推荐歌单 <i class="iconfont icon-arrow-right"></i></h2>
        </div>
        <ImgList
        @clickImg="toPlayListDetail" 
        :list="recSongList" 
        type="playlist"
        class="img-list"
        >
            <template v-slot="{item}">
                <div class="text-hidden font-14">
                    {{item.name}}
                </div>
            </template>
        </ImgList>
    </div>
</template>


<script lang="ts" setup>
import {getBanner,} from '@/api/api_other'
import {getRecommend, getPersonalized,} from '@/api/api_playlist'
import {computed, reactive, ref} from 'vue'
import ImgList from '@/components/list/ImgList.vue'
import { useRouter } from 'vue-router';
import {useMainStore} from '@/store/index'
import {banner} from '@/types/homepage'
import useFormat from '@/hooks/format'

const format = useFormat()
const router = useRouter()
const store = useMainStore()

let bannerList = ref<banner[]>([])
let login = computed(()=> store.login)
let recSongList = ref<[]>([])
const limit = 30



// bannerList = await getBanner().then((res)=>res.banners)


const toPlayListDetail = (id: number|string)=>{
    if(typeof id==='number'){
        router.push({path : '/playlistdetail/' + id})
    }
}
// bannerList = await getBanner().then((res)=>res.banners)

const getBannerList = ()=>{
    getBanner().then((res)=>{
         if(res.code==200) bannerList.value = res.banners
    })
}



const getRecSongList = ()=>{
        getRecommend().then((res)=>{
            if(res.code==200){
                recSongList.value = res.recommend
            }
        })
}
const getPersonal = async ()=>{
    if(login.value) return
    const res  = await getPersonalized(limit)
    if(res.code===200){
        recSongList = Object.freeze(res.result)
    }else return
}
getBannerList()
getRecSongList()

// getRecSongList()
// getPersonal()
</script>

<style lang="less" scoped>

</style>