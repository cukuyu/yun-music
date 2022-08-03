<template>
    <div class="album-detail">
    <el-skeleton style="width: 240px" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template  #default>
          <!-- 歌单信息 -->
          <div>
            <div class="detail-desc mleft-30">
                <div class="detail-img-wrapper">
                    <img class="img img-radius5"  :src="albumDetail?.album.picUrl+ '?param=300y300'" alt="">
                </div>
                <div class="detail-desc-info">
                    <div class="info-title">
                      <Tag text="专辑"></Tag>
                      <span class="font-20 font-bold mleft-10">{{albumDetail?.album.name}}</span>
                    </div>
                    <div class="info-btn">
                      <button class="btn btn-white mright-10"> 
                        <i class="iconfont icon-bofang"></i> 
                        <span>播放全部</span>
                      </button>
                      <button class="btn btn-white mright-10"> 
                        <el-icon class="font-14"><folder-add/></el-icon> 
                        <span>收藏</span>
                      </button>
                      <button class="btn btn-white mright-10"> 
                        <i class="iconfont icon-down"></i> 
                        <span>下载全部</span>
                      </button>
                      <button class="btn btn-white mright-10"> 
                        <i class="iconfont icon-fenxiang"></i> 
                        <span>分享</span>
                      </button>
                    </div>
                    <div class="info-author font-14">
                      <span class="mright-10">歌手:</span>
                      <span 
                      v-for=" singer in albumDetail?.album.artists"
                      class="author-name pointer mright-12" 
                      style="color: #507daf;"  
                      @click="toArtistDetail(singer.id)"
                      >
                      {{singer.name}}/ &nbsp;
                      </span>
                    </div>
                    <div class="info-author font-14">
                        <span class="mright-10">时间:</span>
                        <span class="created-time font-12 pointer">{{format.dateFormat(albumDetail!.album.publishTime)}}</span>
                    </div>
                    
                   
                   
                </div>
            </div>
            <!-- 歌曲列表 -->
            <div class="detail-head">
              <TabMenu :menuList="[{name:'歌曲列表'}, {name:`评论`},{name:'收藏者'}]" @menuClick="handMenuClick" mode="menu">
              </TabMenu>
            </div>
            <div class="music">
              <MusicList ref="listRef" :list="albumDetail!.songs"></MusicList>
            </div>

          </div>
      </template>
    </el-skeleton>
    </div>
</template>


<script lang='ts' setup>
import { getAlbumDetail } from '@/api/api_album'

import {musicListInfo,musicInfo} from '@/types/music'
import {albumsInfo} from '@/types/album'
import TabMenu from '@/components/menu/TabMenu.vue'
import Tag from '@/components/text/Tag.vue'
import MusicList from '@/components/list/MusicList.vue'
import useFormat from '@/hooks/format'
import { ref, reactive, defineProps,computed } from 'vue';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import {useMainStore} from '@/store/index'

const format = useFormat()
const router = useRouter()
const store = useMainStore()

onBeforeRouteUpdate( async(to) => {
    await toAlbumDetail(to.fullPath.split("/").slice(-1)[0])
});

const props = defineProps({
  id:{
    type: String,
    required: true
  }
})
let albumDetail = ref<albumsInfo>()
let loading = ref(false)


// let info =  ref<musicListInfo>({} as musicListInfo)
// let playlist = ref<musicInfo[]>([])
// let key = ref("")
// let list = computed(()=>{
//   let reg = new RegExp(key.value.trim(),'ig')
//   return playlist.value.filter((item)=>{
//     return item.name.match(reg)
//   })
// })


//加载歌单信息
const toAlbumDetail= async(id:string)=>{
  const res = await getAlbumDetail(id)
  if(res.code!=200) return
    albumDetail.value = {album:res.album,songs:res.songs}
}

await toAlbumDetail(props.id)

const handMenuClick = async()=>{
}


const toArtistDetail = (id:number)=>{
    store.drawerView = false
    router.push({path : '/artistdetail/' + id})
}


</script>


<style lang="scss" scoped>

.album-detail{
  width: 100%;
  // max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
}

.detail-desc {
  display: flex;
}

.detail-desc-info div{
  // width: 100% 不知道为什么会出错
  // width: 100%;
  margin-bottom: 5px;
}

.detail-img-wrapper{
  max-width: 180px;
  margin-right: 2%;
}

.author-img {
  max-width: 25px;
  vertical-align: middle;
}

input[type='checkbox'] {
  position: absolute;
  clip: rect(0 0 0 0);
}

.info-title {
  height: 24px;
  span{ 
    line-height: 24px;
  }
}

.info-btn{
    display: flex;
    align-items: center;
}

.intro {
  display: flex;
  justify-content: space-between;

}
.element {
    max-height: 20px;
    overflow: hidden;
    white-space: pre-line;
    // transition: max-height 0.1s;
  }
.check-out {
  display: none;
}

:checked ~ .element{
  max-height: 660px;
}

:checked ~ div .check-in{
  display: none;
}

:checked ~ div .check-out{
  display: inline-block;
}
.check-in, .check-out {
  color: #34538b;
  cursor: pointer;
}


.detail-head{
  display: flex;
  justify-content:space-between;
  align-items:baseline;
  margin-top: 20px;
}



</style>