<template>
    <div class="comment-edit-dialog-wrap" v-if="editVisiable && defaultEdit">
        <div class="comment-edit-dialog">
            <CommentEdit
            @closeDig='showEditComment'
            :commentInfo="commentInfo"
            :name="editName"
            :defaultEdit="props.defaultEdit"
            ></CommentEdit >
        </div>
    </div>
    <div class="comment-edit-dialog" v-if="!defaultEdit">
        <CommentEdit
        :commentInfo="commentInfo"
        :name="editName"
        :defaultEdit="props.defaultEdit"
        ></CommentEdit >
    </div>
    <div class="comment">
        <div class="hot-wrap mtop-20" v-if="hotList?.length !== 0">
            <div class="font-16 font-bold">全部评论({{total}})</div>
            <CommentItem
                v-for="item in hotList"
                :key="item.commentId"
                :item="item"
                @like="toLikeComment"
                @editComment="editComment"
            ></CommentItem>
            <div class="more-btn-wrap mtop-20">
                <button class="btn btn-white">更多精彩评论></button>
            </div>
        </div>
        <div 
        class="new-wrap mtop-20" 
        v-if="newList?.length !== 0"
        ref="newListRef"
        >
            <div class="font-16 font-bold">最新评论({{total}})</div>
            <CommentItem
            v-for="item in newList"
            :key="item.commentId"
            :item="item"
            @like="toLikeComment"
            @editComment="editComment"
            ></CommentItem>
        </div>
        <div class="comment-pagination" v-show="total>0">
            <el-pagination
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-size="query.limit"
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
import { getNewCommentAll, likeComment} from '@/api/api_comment'
import {commentQuery, commentItem,sendCommentPar } from '@/types/comment'
import { useMainStore } from '@/store';
import { ref, reactive,watch,} from 'vue';
import  CommentItem  from '@/components/comment/CommentItem.vue';
import {ElMessage} from 'element-plus'
import CommentEdit from '@/components/comment/CommentEdit.vue'
import {useAnimation} from '@/hooks/animation'

const animation = useAnimation()
const store  = useMainStore()
const props = defineProps({
    type:{
        type: Number,
        default:0
    },
    id:{
        type: String,
        default:"0"
    },
    scrollDom:{
        type: String,
        default: '.main-right'
    },
    defaultEdit:{
        type: Boolean,
        default: false
    }
})


watch(()=> props.id,()=>{
    query.value.id = props.id
    query.value.offset = 0
    currentPage.value = 1
    getComment()
})


// let commentEditRef = ref()

//获取评论参数
let query = ref<commentQuery>({
    id: props.id,
    limit:20,
    offset:0,
    before:0,
    type:props.type
} as commentQuery)

//当前页码
let currentPage = ref(1)

//评论总页数
let total = ref(0)
//热评
let hotList = ref<commentItem[]>([])
//最新评论
let newList = ref<commentItem[]>([])
//
let newListRef = ref<HTMLElement>()

const getComment = async ()=>{
    const res = await getNewCommentAll(query.value)

    if(res.code==200){
        if(res.hotComments==null) hotList.value = []
        else hotList.value = res.hotComments?.slice(0,10)
        newList.value = res.comments
        total.value = res.total
    }
}

//当前页数改变回调
const handleCurrentChange = (val:number)=>{
    query.value.offset = (val-1)*query.value.limit
    currentPage.value = val
    getComment()

    setScrollTop()
}

//设置滚动条到最新评论
const setScrollTop = ()=>{
    let sdom = document.querySelector(props.scrollDom)
    animation.scrollAnimation(sdom!.scrollTop, newListRef.value!.offsetTop, sdom as HTMLElement, 500)
}

//评论点赞
const toLikeComment = async (commentId:number,liked:boolean)=>{
    if(store.login==false) return ElMessage.error("请先登录")
    let obj = { id: store.currentMusicId+"", commentId:commentId, t: 1, type: query.value.type }
      if (liked) {
        obj.t = 0
    }
    const res = await likeComment(obj)
    if(res.code!=200) return ElMessage.error("点赞失败")
    let templist = newList.value
    let index = newList.value?.findIndex((item) => item.commentId == obj.commentId)
    if(index==-1){
        index = hotList.value?.findIndex((item) => item.commentId == obj.commentId)
        templist = hotList.value
    }
    templist[index].liked = !templist[index].liked
    if(obj.t) templist[index].likedCount++
    else templist[index].likedCount--
}



let commentInfo = reactive<sendCommentPar>({
    t:1,
    type: 0,
    id: "0",
    content: '',
    commentId: 0
})
/**

父孙组件调用子组件

DrawerViwe.showEditComment -->  Comment.editComment   <--CommentItem.repalyComment
                                    \\
                                     >
                                commentEdit

 */
//编辑评论
let editName = ref("")
let editVisiable = ref(false)
const editComment = (name:string,t:number,commentId:number=0)=>{
    // console.log("commentEditRef:",commentEditRef.value)
    commentInfo.id = props.id
    commentInfo.type = props.type
    commentInfo.t = t
    commentInfo.commentId = commentId
    commentInfo.content = "" 
    editName.value = name
    showEditComment()
    
}

//是否显示编辑评论
const showEditComment = ()=>{
    editVisiable.value = !editVisiable.value
}

defineExpose({ editComment })

getComment()
</script>

<style lang="scss" scoped>
.more-btn-wrap{
    display: flex;
    justify-content: center;
}
.comment-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
}

.comment-edit-dialog-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    z-index: 1024;

    .comment-edit-dialog{
        width: 480px;
        height: 260px;
        padding: 15px;
        background-color: #FFF;
        border-radius: 8px;
        box-shadow: 0px 0px 5px #bab8b8;
    }
}
</style>