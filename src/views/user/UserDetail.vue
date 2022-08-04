<template>
    <div class="user-detail">
        <div class="user-info">
            <div class="user-avatar">
                <img :src="profile?.avatarUrl" alt="">
            </div>
            <div class="user-desc mleft-10">
                <div class="user-nickname font-20 font-bold">
                    {{ profile?.nickname }}
                </div>
                <div class="user-account-info">
                    <div class="vip-level pointer" :class="vipLevel">
                    </div>
                    <button class="user-level pointer font-6">
                        Lv{{ profile?.level }}
                    </button>
                    <i class="iconfont" :class="{ 'icon-male': profile?.gender == 1, 'icon-female': profile?.gender == 0 }"></i>
                    <div></div>
                    <div class="user-btns">
                        <button class="btn btn-white" v-if="parseInt(uid)==store.profile.userId">
                            <i class="iconfont icon-edit-comment font-14 mright-3"></i>
                            <span>编辑个人信息</span>
                        </button>
                    </div>
                </div>
                <div class="div-line mtop-10"></div>
                <div class="user-count-follow">
                    <div>
                        <div class="font-20 text-center">{{profile?.eventCount}}</div>
                        <div class="item-text font-12">动态</div>
                    </div>
                    <div class="column-line"></div>
                    <div>
                        <div class="font-20 text-center">{{profile?.follows}}</div>
                        <div class="item-text font-12">关注</div>
                    </div>
                    <div class="column-line"></div>
                    <div>
                        <div class="font-20 text-center">{{profile?.followeds}}</div>
                        <div class="item-text font-12">粉丝</div>
                    </div>
                </div>
                <div class="city font-14 mtop-5">
                    所在地区:{{profile?.city}}
                </div>
                <div class="social font-14 mtop-5">
                    社交网络:
                </div>
                <div class="social font-14 mtop-5">
                    个人介绍:{{profile?.signature||'暂无介绍'}}
                </div>
            </div>
        </div>
        <div class="user-list">
            <div class="list-head mtop-20">
              <TabMenu 
              :menuList="[{name:'创建的歌单'}, {name:`收藏的歌单`},{name:'创建的音乐专栏'}]"
               @menuClick="handMenuClick" 
               mode="menu"
               :font-size="'14px'">
              </TabMenu>
            </div>
            <ImgList
            @clickImg="toPlayListDetail" 
            :list="songlist" 
            type="playlist"
            class="img-list"
            :empty="isEmpty?.value"
            >
            <template v-slot="{item}">
                <div class="text-hidden font-14">
                    {{item.name}}
                </div>
            </template>
            </ImgList>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { userDetail } from '@/types/person'
import {imgList} from '@/types/imgList'
import { doUserDetail,getUserPlayList } from '@/api/api_user'
import { ref, reactive, computed,watch,  } from 'vue';
import { useMainStore } from '@/store'
import { ElMessage } from 'element-plus';
import TabMenu from '@/components/menu/TabMenu.vue'
import ImgList from '@/components/list/ImgList.vue'
import { useRouter ,onBeforeRouteUpdate} from 'vue-router';

const store = useMainStore()


onBeforeRouteUpdate( async(to) => {
    await getuserDetail(parseInt(to.fullPath.split("/").slice(-1)[0]))
    store.drawerView = false
});

const router = useRouter()
const props = defineProps({
    uid: {
        type: String,
        required: true
    }
})


let profile = ref<userDetail>()
let vipLevel = computed(() => {
    return "vip-" + (store.profile.vipType - 6)
})

let creList = ref<imgList[]>([])
let subList = ref<imgList[]>([])
let songlist = ref<imgList[]|undefined>([])

//创建的歌单为空
let creEmpty = ref(false)
//收藏的歌单为空
let subEmpty = ref(false)

let tabIndex = ref(0)


let isEmpty = computed(()=>{
    if(tabIndex.value == 0) return creEmpty
    if(tabIndex.value == 1 ) return subEmpty
})

const getuserDetail = async (uid: number) => {
    let resAll = [doUserDetail(uid), getUserPlayList(uid)]
    let [res1, res2] =  await Promise.all(resAll)
    if (res1.code != 200) {
        ElMessage.error("获取用户信息失败")
        return 
    }
    profile.value = res1.profile
    profile.value!.listenSongs = res1.listenSongs
    profile.value!.level = res1.level
    if(res2.code !=200){{
        ElMessage.error("获取用户信息失败")
        return 
    }}
    for(let list of res2.playlist){
        if(list.userId == uid){
            creList.value?.push(list)
        }else{
            subList.value?.push(list)
        }
    }
    if(creList.value.length==0) creEmpty.value = true
    if(subList.value.length==0) subEmpty.value = true
    songlist.value = creList.value
}


const toPlayListDetail = (id: number|string)=>{
    if(typeof id==='number'){
        router.push({path : '/playlistdetail/' + id})
    }
}
const handMenuClick = (index:number)=>{
    tabIndex.value = index
    if(index==0){
        songlist.value = creList.value
    }else if(index==1){
        songlist.value = subList.value
    }
}




getuserDetail(parseInt(props.uid))

</script>

<style lang="scss" scoped>
.user-detail {
    padding-left: 2%;
    padding-right: 2%;
    margin-top: 20px;

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;

        .user-avatar {
            min-height: 180px;
            min-width: 180px;
            max-width: 180px;

            img {
                border-radius: 50%;
            }
        }

        .user-desc {
            width: 100%;
        }

        .user-account-info {
            margin-top: 10px;
            display: flex;
            align-items: center;

            .vip-level {
                width: 40px;
                height: 15px;
                border-radius: 10px;
            }

            .user-level {
                background-color: #f0f0f0;
                border: none;
                border-radius: 10px;
                width: 40px;
                font-size: 12px;
                height: 15px;
            }

            .icon-male {
                margin-left: 8px;
                color: #29bcdd;
            }

            .icon-female {
                margin-left: 8px;
                color: #db348d;
            }

            .user-btns {
                margin-left: auto;
            }
        }

        .user-count-follow{
            display: flex;
            align-items: center;
            margin-top: 20px;

            .column-line {
                margin: 0 25px;
                min-width: 1px;
                background-color: #e6e6e6;
                min-height: 40px;
            }
            
        }
        

    }


}
</style>


