<template>
  <div class="play-list-detail">
    <el-skeleton style="width: 60%; margin:20px 0 0 30px;" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 180px; height: 180px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            ">
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <!-- 歌单信息 -->
        <div>
          <div class="detail-desc mleft-30">
            <div class="detail-img-wrapper">
              <img class="img img-radius5" :src="info?.coverImgUrl" alt="">
            </div>
            <div class="detail-desc-info">
              <div class="info-title text-hidden">
                <Tag text="歌单"></Tag>
                <span class="font-20 font-bold mleft-10">{{ info?.name }}</span>
                <!-- <span>
                  <el-icon class="list-edit font-14">
                    <edit />
                  </el-icon>
                </span> -->
              </div>
              <div class="info-author">
                <img class="author-img img circle pointer mright-12" :src="info?.creator?.avatarUrl"
                  @click="toUserDetail(info?.creator?.userId)">
                <span class="author-name font-12 pointer mright-12 bright-hover cblue-color"
                  @click="toUserDetail(info?.creator?.userId)">
                  {{ info?.creator?.nickname }}
                </span>
                <span class="created-time font-12 pointer cl2-color">{{ info?.createTime }}</span>
              </div>
              <div class="info-btn">
                <button class="btn btn-white mright-10 play-all">
                  <i class="iconfont icon-bofang"></i>
                  <span>播放全部</span>
                </button>
                <button class="btn btn-white mright-10">
                  <el-icon class="font-14">
                    <folder-add />
                  </el-icon>
                  <span>收藏</span>
                </button>
                <button class="btn btn-white mright-10">
                  <i class="iconfont icon-fenxiang"></i>
                  <span>分享</span>
                </button>
                <button class="btn btn-white mright-10">
                  <i class="iconfont icon-down"></i>
                  <span>下载全部</span>
                </button>
              </div>
              <div class="info-tag font-14" v-show="info?.tags?.length > 0">
                <!-- v-for tag -->
                <span>标签：</span>
                <span class="bright-hover cblue-color pointer" v-for="(item) in info?.tags" :key="item">
                  {{ item }}
                </span>
              </div>
              <div class="info-num font-14">
                歌曲：<span class="cl2-color mright-12">{{ info?.trackCount }}</span>
                播放：<span class="cl2-color">{{ info?.playCount }}</span>
              </div>
              <div class="intro font-14" v-show="info?.description">
                <input id="check" type="checkbox">
                <div class="element">
                  <p>简介：<span class="cl2-color">{{ info?.description }}</span></p>
                </div>
                <div class="check-label">
                  <label for="check" class="check-in"><i class="iconfont  icon-zhankai"></i></label>
                  <label for="check" class="check-out"><i class="iconfont icon-shouqi"></i></label>
                </div>
              </div>
            </div>
          </div>


        </div>
      </template>
    </el-skeleton>
    <!-- 歌曲列表 -->
    <div class="detail-head">
      <TabMenu :menuList="[{ name: '歌曲列表' }, { name: `评论(${info?.commentCount||0})` }, { name: '收藏者' }]"
        @menuClick="handMenuClick" mode="menu">
      </TabMenu>
      <div class="detail-search mright-30" v-show="tableIndex==0">
        <el-input placeholder="搜索歌单音乐" clearable v-model="key">
          <template #suffix>
            <el-icon class="el-input__icon">
              <search />
            </el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <div class="music" v-if="tableIndex == 0">
      <MusicList ref="listRef" :list="list"></MusicList>
    </div>
    <div class="comment" v-if="tableIndex == 1">
      <Comment :type="2" :id="id"></Comment>
    </div>
  </div>
</template>


<script lang='ts' setup>

import { getPlayListDetail, getSuberList, setPlaylistSub } from '@/api/api_playlist'
import { musicListInfo, musicInfo } from '@/types/music'


import { ref, shallowRef, defineProps, computed } from 'vue';


import Tag from '@/components/text/Tag.vue'
import TabMenu from '@/components/menu/TabMenu.vue'
import MusicList from '@/components/list/MusicList.vue'
import Comment from '@/components/comment/Comment.vue';


import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import useFormat from '@/hooks/format'
import { useMainStore } from '@/store/index'

const format = useFormat()
const router = useRouter()
const store = useMainStore()



onBeforeRouteUpdate(async (to) => {
  getPlayList(to.fullPath.split("/").slice(-1)[0])
});


const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

let loading = ref(false)


let info = shallowRef<musicListInfo>({} as musicListInfo)
let playlist = shallowRef<musicInfo[]>([])

//搜索关键词
let key = ref("")
let list = computed(() => {
  let reg = new RegExp(key.value.trim(), 'ig')
  return playlist.value.filter((item) => {
    return item.name.match(reg)
  })
})


//加载歌单信息
const getPlayList = async (id: string) => {
  loading.value = true
  playlist.value = []
  const res = await getPlayListDetail(id)
  loading.value = false
  if (res.code == 200) {
    res.playlist.createTime = new Date(res.playlist.createTime).toLocaleDateString().replaceAll("/", "-")
    res.playlist.playCount = format.transNumber(res.playlist.playCount)
    info.value = res.playlist
    playlist.value = res.playlist.tracks
  }
}

getPlayList(props.id)

let tableIndex = ref(0)

const handMenuClick = async (index: number) => {
  tableIndex.value = index
}


const toUserDetail = (id: number) => {
  store.drawerView = false
  router.push({ path: '/userdetail/' + id })
}


</script>


<style lang="scss" scoped>
.play-list-detail {
  width: 100%;
  // max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
}

.detail-desc {
  display: flex;
}

.detail-desc-info {
  flex-grow: 1;

  div {
    // width: 100% 不知道为什么会出错
    // width: 100%;

    margin-bottom: 5px;
  }
}

// .detail-desc-info 

.detail-img-wrapper {
  max-width: 180px;
  margin-right: 2%;
  img{
    width: 100%;
    aspect-ratio: 1 / 1;
  }
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
  width: 600px;


  span {
    line-height: 24px;
  }
}


.intro {
  display: flex;
  justify-content: space-between;

  .check-label {
    margin-left: auto;
    margin-right: 40px;
    // flex-grow: 1;
  }
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

:checked~.element {
  max-height: 660px;
}

:checked~div .check-in {
  display: none;
}

:checked~div .check-out {
  display: inline-block;
}

.check-in,
.check-out {
  color: #34538b;
  cursor: pointer;
}


.detail-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 20px;
}


.play-all {
  background-color: #ec4141;
  color: #ffffff;

  &:hover {
    filter: brightness(90%);
    background-color: #ec4141;
  }
}

.comment {
  margin: 0 30px;
}


</style>