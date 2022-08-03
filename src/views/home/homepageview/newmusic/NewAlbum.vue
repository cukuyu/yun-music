<template>
    <div class="new-album">
        <div class="new-album-header">
            <ul class="all-types">
                <li v-for="item in allTypes" :key='item.id' :class="{ 'active': item.id == queryInfo.area }"
                    @click="changeType(item.id)">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div class="new-album-view">
            <div class="week-span"></div>
            <ImgList :list="weekList" type="album">
                <template v-slot="{ item }">
                    <div class="text-hidden">
                        {{ item.name }}
                    </div>
                    <div style="color: #9f9f9f" class="text-hidden">
                        {{ item.artist!.name }}
                    </div>
                </template>
            </ImgList>
        </div>
    </div>

</template>


<script lang="ts" setup>
import { topAlbumQuery } from '@/types/album'
import { imgList } from '@/types/imgList'
import { getTopAlbum } from '@/api/api_album'
import { reactive, ref, shallowRef } from 'vue';
import ImgList from '@/components/list/ImgList.vue';

let allTypes = [{ name: "全部", id: "ALL" }, { name: "华语", id: "ZH" },
{ name: "欧美", id: "EA" }, { name: "韩国", id: "KR" }, { name: "日本", id: "JP" }]

let queryInfo = reactive<topAlbumQuery>({
    limit: 10,
    offset: 1200,
    area: 'ALL',
    type: 'new',
    month: '' ,
    year: '',
})


let weekList = shallowRef<imgList[]>()

let loading = ref(false)

const getNewAlbum = async () => {
    console.log("queryInfo",queryInfo)
    loading.value = true
    const res = await getTopAlbum(queryInfo)
    console.log("getNewAlbum",res)
    if (res.code != 200) {
        loading.value = false
        return 
    }
    if(queryInfo.area=='ALL'){
     weekList.value = res.weekData
    }else{
      weekList.value = res.monthData  
    }
    loading.value = false
}


const changeType = (id: string) => {
    queryInfo.area = id
    queryInfo.offset = 0
    weekList.value = []
    getNewAlbum()
}
getNewAlbum()


</script>

<style lang="scss" scoped>
.new-album {
    margin-top: 10px;

    .all-types {
        display: flex;
        li {
            margin-right: 20px;
            cursor: pointer;
            @include get-class-from-key('cl5-color');
            &:hover {
                @include get-class-from-key('c-color');
            }
        }

        .active {
            font-weight: bold;
            margin-top: -1px;
            @include get-class-from-key('cf-color');
            &:hover {
                @include get-class-from-key('cf-color')
            }
        }
    }
}
</style>