<template>
    <div class="top-list">
        <div>
            <h1 class="font-20 font-bold ">官方榜</h1>
            <div class="official-list-warp" v-loading="!officialList||officialList.length==0">
                <div v-for="(list, listIndex) in officialList" :key="list.id" class="mbottom-30">
                    <div class="official-list">
                        <div class="img-wrap">
                            <img :src="list.coverImgUrl" alt="">
                        </div>
                        <ul class="mleft-30" v-loading="!list.tracks||list.tracks.length==0">
                            <li v-for="(music, index) in list?.tracks?.slice(0, 5)" :key="music.id"
                                class="default-cursor stripe-list-item" @dblclick="playMusic(list.tracks, index)">
                                <span class="mleft-12 text-hidden">{{ index + 1 }}</span>
                                <span class="mleft-12 name text-hidden">{{ music.name }}</span>
                                <span class="alia" v-show="music?.alia.length > 0">({{ music?.alia[0] }})</span>
                                <span class="author mright-10 text-hidden">
                                    <Creator :creators="(music.ar as any)"></Creator>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <h1 class="show-all pointer" @click="toPlayListDetail(list.id)">
                        查看全部<i class="iconfont icon-arrow-right"></i>
                    </h1>
                </div>
            </div>

        </div>
        <div>
            <h1 class="font-20 font-bold ">全球榜</h1>
            <ImgList :list="globalList" type="playlist" @clickImg="toPlayListDetail">
            </ImgList>
        </div>

    </div>

</template>

<script lang="ts" setup>
import { getToplist, getPlayListDetail } from '@/api/api_playlist'
import { musicListInfo, musicInfo } from '@/types/music'
import { imgList } from '@/types/imgList'
import { shallowRef,ref } from 'vue'
import ImgList from '@/components/list/ImgList.vue'
import Creator from '@/components/text/Creator.vue'
import { useRouter } from 'vue-router'
import { useMainStore } from "@/store/index"

const router = useRouter()
const store = useMainStore()

let officialList = ref<musicListInfo[]>([])
let globalList = shallowRef<imgList[]>([])

const getTopLists = async () => {
    const res = await getToplist()
    if (res.code != 200) return
    officialList.value = res.list.slice(0, 4)
    globalList.value = res.list.slice(4)
    const alltracks:Promise<any>[] = []

    officialList.value?.forEach(async (item) => {
        alltracks.push(getPlayListDetail(item.id as string))
    })
    let restraks =  await Promise.all(alltracks)
    for(let i=0;i<restraks.length;i++){
        officialList.value![i] = restraks[i].playlist
    }

}

const toPlayListDetail = (id: number | string) => {
    if (typeof id === 'number') {
        router.push({ path: '/playlistdetail/' + id })
    }
}

const playMusic = (tracks: musicInfo[] | undefined, index: number) => {
    if (!tracks) return
    store.playMusic({ list: tracks, id: tracks[index].id })
}

getTopLists()
</script>

<style lang="scss" scoped>
.top-list {
    margin-top: 40px;

    .official-list {
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 5px;

        .img-wrap {
            width: 170px;
            height: 170px;

            img {
                border-radius: 5px;
            }
        }

        ul {
            width: 70%;

            li {
                height: 33px;
                line-height: 33px;
                color: #f00;
                font-size: 12px;

                // background-color: #ffffff;
                .name {
                    @include get-class-from-key('c-color')
                }

                .author {
                    float: right;
                    @include get-class-from-key('cl4-color');
                }

                .alia {
                    @include get-class-from-key('cl4-color');
                }
            }
        }

    }

    .show-all {
        font-size: 12px;
        margin-left: 210px;
    }
}
</style>