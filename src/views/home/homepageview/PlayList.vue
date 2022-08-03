<template>
    <div class="play-list mtop-60">
        <div class="banner" v-loading="!hasHighInfo">
            <img class="bag-img" :src="highInfos?.coverImgUrl">
            <img class="high-img" :src="highInfos?.coverImgUrl">
            <div class="info-wrapper">
                <div>
                    <button class="circle-btn">
                        <i class="iconfont icon-huiyuanhuangguanguanjun-xianxing"></i>
                        精品歌单
                    </button>
                </div>
                <div class="mtop-10">
                    <span>{{ highInfos?.name }}</span>
                </div>
                <div class="font-12 mtop-5">
                    <span>{{ highInfos?.copywriter }}</span>
                </div>
            </div>
        </div>
        <div class="list-tag mtop-10">
            <div class="layer-wrap">
                <button class="btn-white btn font-14" @click="showLayer=!showLayer">
                    {{ tagBtn }} <i class="iconfont icon-arrow-right"></i>
                </button>
                <div class="layer" v-if="showLayer" ref="layerRef"> 
                    <div class="all-list">全部歌单</div>
                    <div class="div-line"></div>
                    <div class="tag-title" 
                    v-for="(item,index) in tags"
                    :key="item.name"
                    >
                        <div class="tag-label mleft-10">
                            <i class="iconfont font-24"
                            :class="item.icon"></i>
                            <span class="mleft-6">{{item.name}}</span>
                        </div>
                        <ul>
                            <li v-for="cat in allcats?.[index]" :key="cat">
                                <button
                                @click="changeCatByLayer(cat)"
                                :class="{ isActive: cat == tagBtn }"
                                class="no-btn font-12 bright-hover"
                                >
                                {{ cat }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="tag-ul">
                <li 
                class="mright-10 font-14 pointer bright-hover" 
                v-for="h in hotcats" 
                :key="h" 
                :class="{ isActive: h == tagBtn }"
                @click="changeCat(h)">
                    {{ h }}
                </li>
            </ul>
        </div>
        <ImgList :list="playList" @clickImg="toPlayListDetail" type="playlist">
            <template v-slot="{ item }">
                <div class="text-hidden">
                    {{ item.name }}
                </div>
            </template>
        </ImgList>
        <div class="play-list-pagination" v-show="total>0">
            <el-pagination
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-size="queryInfo.limit"
            :pager-count="9"
            layout="prev, pager, next"
            :total="total"
            background
            >
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getAllCat, getHotCat, getHighquality, getPlayListByCat } from '@/api/api_playlist'
import { catQuery, highInfo } from '@/types/playList'
import { ref, reactive, shallowRef} from 'vue'
import { imgList } from '@/types/imgList'
import ImgList from '@/components/list/ImgList.vue'
import { useRouter } from 'vue-router'
import { useAnimation } from '@/hooks/animation'

const router = useRouter()
const animation = useAnimation()

let queryInfo = reactive<catQuery>({
    limit: 50,
    order: 'hot',
    cat: '华语',
    offset: 0
})

let tags = [{name:"语种",icon:"icon-diqiuquanqiu"},
            {name:"风格",icon:"icon-fengge"},
            {name:"场景",icon:"icon-xiazai47"},
            {name:"情感",icon:"icon-smiling"},
            {name:"主题",icon:"icon-zhuti"},]

let highInfos = ref<highInfo>()
let hasHighInfo = ref(false)

let tagBtn = ref('华语')
// let showLayer = ref(false)

let hotcats = reactive<string[]>([])
let allcats = shallowRef<string[][]>()

let playList = shallowRef<imgList[]>([])

let layerRef = ref()

let currentPage = ref(1)
let total = ref(1)
let showLayer =  animation.clickHidden(layerRef) 
// let showLayer = ref(false)



//获取所有歌单分类
const getCats = async () => {
    const res = await getAllCat()
    allcats.value = new Array(5).fill(0).map((item)=>[] as string[])
    if(res.code!=200) return 
    res.sub.forEach((item:{category:number,name:string}) => {
        allcats.value![item.category].push(item.name)
    });
}

//获取热门歌单分类
const getHotCats = async () => {
    const res = await getHotCat()
    if (res.code != 200) return
    hotcats.length = 0
    res.tags.forEach((item: { name: string }) => {
        if (item.name == tagBtn.value) hotcats.push(item.name)
        else hotcats.push(item.name)
    });
}

const getHighInfo = async (cat: string) => {
    const res = await getHighquality({ limit: 1, cat: cat, before: 0 })
    if (res.code != 200) return
    if (res.playlists.length === 0) {
        highInfos.value = { coverImgUrl: "", name: "" }
        hasHighInfo.value = false
    } else {
        highInfos.value = res.playlists[0]
        hasHighInfo.value = true
    }

}

const getPlayLists = async () => {
    playList.value = []
    const res = await getPlayListByCat(queryInfo)
    if (res.code != 200) return
    playList.value = res.playlists
    total.value = res.total
}


const changeCat = (name: string) => {
    tagBtn.value = name
    queryInfo.cat = name
    if(hotcats.includes(name)) getHighInfo(name)
    queryInfo.offset = 0
    currentPage.value = 1
    getPlayLists()
}

const toPlayListDetail = (id: number | string) => {
    if (typeof id === 'number') {
        router.push({ path: '/playlistdetail/' + id })
    }
}


const changeCatByLayer = (name:string)=>{
    showLayer!.value = false
    changeCat(name)
}

const handleCurrentChange = (val:number)=>{
    queryInfo.offset = (val-1)*queryInfo.limit
    currentPage.value = val
    getPlayLists()
}

getCats()
getHighInfo(queryInfo.cat)
getHotCats()
getPlayLists()

</script>


<style lang="scss" scoped>
.play-list {
    .banner {
        height: 200px;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        display: flex;
        align-items: center;

        .bag-img {
            position: absolute;
            top: -400px;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            z-index: 1;
            filter: blur(45px);
        }

        .high-img {
            margin: 0 20px;
            border-radius: 6px;
            z-index: 2;
            height: 80%;
        }

        .info-wrapper {
            z-index: 2;

            .circle-btn {
                border: 1px solid #e7aa5a;
                color: #e7aa5a;
            }

            .mtop-10 {
                color: #FFF;
            }

            .font-12 {
                color: rgb(132, 130, 130)
            }
        }
    }

    .list-tag {
        display: flex;
        justify-content: space-between;

        .layer-wrap{
            position: relative;
            .tag-btn {
                @include get-var('border','1px solild','c-bgc');
                padding: 0 25px;
                &:hover {
                    @include get-class-from-key('cl2-bgc')
                }
            }

            .layer {
                position: absolute;
                top: 40px;
                height: 715px;
                width: 655px;
                @include get-class-from-key('c-bgc');
                @include get-var('box-shadow','0 0 4px','cl3-color');
                // box-shadow: 0 0 8px #e5e5e5;
                border-radius: 4px;
                font-size: 14px;
                min-height: 400px;
                z-index: 3;

            
                .all-list{
                    margin-left: 20px ;
                    height: 60px;
                    line-height: 60px;
                }

                .tag-title{
                    display: flex;
                    margin-top: 15px;
                    
                    .tag-label{
                        display: flex;
                        align-items: center;
                        height: 30px;
                        color: #b1b1b1;
                    }
                    ul {
                        margin-left: 40px;
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        width: 520px;

                        li{
                            width: 80px;
                            height: 30px;
                            line-height: 30px;
                            margin-right: 20px;
                            &:hover{
                                color: #ec4141;
                            }
                        }
                        
                    } 
                }

            }
        }
       

        .tag-ul {
            display: flex;
            justify-content: space-around;
            align-items: center;

            li {
                padding: 5px 10px;
            }
        }
    }

}

.isActive {
    @include get-raga('active-bgc',0.05);
    // @include get-class-from-key('active-bgc');
    @include get-var('color','','active-bgc');
    // opacity: 0.1;
    border-radius: 13px;
}

.play-list-pagination{
    display: flex;
    justify-content: center;
    margin: 10px 0 30px 0;
}
</style>