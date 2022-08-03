<template>
    <div class="top-mv-list mtop-20" v-loading="!list || list.length==0">
        <ul class="top-mv-list-ul">
            <li class="mv-list-item" v-for="(item, index) in list">
                <div class="mleft-20 font-20 cl-color mright-10">{{ index + 1 > 9 ? index + 1 + "" : "0" + (index + 1) }}</div>
                <div class="img-wrap">
                    <img :src="item.cover + '?param=170y90'" alt="">
                    <div class="mv-playcount font-12">
                        <i class="iconfont icon-24gl-play font-12"></i>
                        <span>{{item.score}}</span>
                    </div>
                </div>
                <div class="mv-item-info">
                    <div class="font-14 mv-item-name pointer text-hidden" @click="toMvDetail(item.id)">{{item.name}}</div>
                    <div class="font-12 text-hidden">
                        <Creator :creators="item.artists"></Creator>
                    </div>
                </div>

            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { MVDetail } from '@/types/video'
import { PropType } from 'vue';
import Creator from '@/components/text/Creator.vue'
import  {useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps({
    list: {
        type: Array as PropType<MVDetail[]>
    }
})

const toMvDetail = (id:string|number)=>{
    router.push({path:'/videodetail/mv/'+id})
}

</script>

<style lang="scss" scoped>
.top-mv-list {
    .top-mv-list-ul {
        min-height: 650px;
        display: flex;
        // align-items: center;
        flex-wrap: wrap;

        .mv-list-item {
            height: 130px;
            display: flex;
            align-items: center;
            justify-content: start;
            width: 49%;
            @include get-var('border-bottom', '', 's-border')
        }

        .mv-list-item:nth-child(2n) {
            @include get-var('border-left', '', 's-border')
        }

        .img-wrap {
            position: relative;

            img {
                border-radius: 3%;
            }
            .mv-playcount {
                position: absolute;
                right: 5px;
                top: 1px;
                color: #fff;
            }
        }

        .mv-item-info{
            width: 40%;
            margin-left: 10px;
            .mv-item-name{
                margin-top: -30px;
                margin-bottom: 20px;
            }
        }

    }

}
</style>