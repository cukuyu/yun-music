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
        <el-skeleton v-show="!loading" :rows="6" animated />
        <div class="new-album-view" v-show="loading">
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
import { reactive, ref } from 'vue';
import ImgList from '@/components/list/ImgList.vue';

let allTypes = [{ name: "全部", id: "ALL" }, { name: "华语", id: "ZH" },
{ name: "欧美", id: "EA" }, { name: "韩国", id: "KR" }, { name: "日本", id: "JP" }]

let queryInfo = reactive<topAlbumQuery>({
    limit: 30,
    offset: 0,
    area: 'ALL',
    type: 'new',
    month: '',
    year: ''
})

let weekList = ref<imgList[]>()

let loading = ref(true)

const getNewAlbum = async () => {
    loading.value = false
    const res = await getTopAlbum(queryInfo)
    console.log("getNewAlbum",res)
    if (res.code != 200) {
        loading.value = true
        return 
    }
    if(queryInfo.area=='ALL'){
     weekList.value = res.weekData
    }else{
      weekList.value = res.monthData  
    }
    loading.value = true
}


const changeType = (id: string) => {
    queryInfo.area = id
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