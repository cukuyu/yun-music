<template>
    <div>
        <div class="artist-list">
            <div class="tags">
                <div 
                class="tags-type" 
                v-for=" (item, index) in tags "
                :key="item.name"
                >
                    <div class="tags-title">{{item.name}}:</div>
                    <ul class="tags-type-list">
                        <li 
                        v-for="tag in item.tagData" 
                        class="tags-item" 
                        :key="tag.id"
                        @click="changeTags(index,tag.id)">
                            <span 
                            class="value-item"
                            :class="{ 'active': tagType[index] == tag.id }">
                                {{ tag.value }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="singer-list">
                <ImgList
                :list="artistList"
                @loadMore="load"
                :hasMore="hasMore"
                :infinite="true"
                type="artist"
                :isLoading="isLoading"
                @clickImg="handClickImg"
                >
                    <template v-slot="{item}">
                        <div class="text-hidden font-14">
                            {{ item.name }}
                        </div>
                    </template>
                </ImgList>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive ,computed} from 'vue'
import { artistQuery, artistTags } from '@/types/artistList'
import { ToGetArtistList, } from "@/api/api_artist";
import { imgList } from '@/types/imgList'
import ImgList from '@/components/list/ImgList.vue'
import Data from '@/assets/json/artistData.json'
import {ElMessage} from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()
let queryInfo = reactive<artistQuery>({
    //查询歌手信息的参数
    limit: 30,
    area: "-1",
    offset: 0,
    type: "-1",
    initial: '-1'
})
const tags = [{name:'语种',tagData:Data.area},{name:'分类',tagData:Data.type},{name:'筛选',tagData:Data.initial}]
const tagType= computed(()=>[queryInfo.area,queryInfo.type,queryInfo.initial])

let artistList = reactive<imgList[]>([])
let hasMore = ref(true)
let isLoading =ref(false)

const getArtistList = async () => {
    isLoading.value = true
    const res = await ToGetArtistList(queryInfo)
    if(res.code!=200) return 
    artistList.push(...res.artists)
    hasMore.value = res.more
    //防抖
    if(artistList.length>30){
        setTimeout(() => {
          isLoading.value = false
        }, 2000)
    }else isLoading.value = false
}

const load = (num:number)=>{
    if(isLoading.value) return
    if(!hasMore.value){
        ElMessage.info("已经到底了!")
        return 
    } 
    queryInfo.offset +=num
    getArtistList()
}

const changeTags = (tagsType: number, id: string) => {
    if (tagsType == 0) queryInfo.area = id
    if (tagsType == 1) queryInfo.type = id
    if (tagsType == 2) queryInfo.initial = id
    queryInfo.offset = 0
    artistList.length = 0
    getArtistList()
}

const handClickImg = (id:number)=>{
    router.push({path:"/artistdetail/"+id})
}

getArtistList() 
</script>


<style lang="scss" scoped>
.artist-list {
    margin-top: 60px;


    .tags-type {
        margin-bottom: 10px;
        display: flex;

        .tags-title {
            min-width: 35px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
        }

        .tags-type-list {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .tags-item {
                position: relative;
                width: 75px;
                height: 20px;
                margin-bottom: 10px;
                font-size: 14px;
                line-height: 20px;
                text-align: center;

                &::after {
                    position: absolute;
                    right: -1px;
                    top: 2px;
                    content: "";
                    width: 1px;
                    height: 16px;
                    @include get-class-from-key('cl3-bgc')

                }

                &:last-child::after {
                    width: 0;
                }
            }
        }
    }

    
    .active {
        @include get-raga('active-bgc',0.05);
        @include get-var('color','','active-bgc');
        border-radius: 13px;
        padding:3px 6px;
    }
}
</style>