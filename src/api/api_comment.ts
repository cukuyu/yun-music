import get from '@/service/get'
import { commentInfo, commentQuery, likeCommentPar, sendCommentPar } from '@/types/comment'


export const getNewComment = ({id , type, pageNo ,pageSize ,sortType, cursor}:commentInfo) =>{
    return    get('/comment/new', { id, type, pageNo, pageSize, sortType, cursor,timestamp: Date.now()})
}

/* login 发送删除评论 */
/* 1评论 2回复 0删除 */
export const sendComment = ({ t, type, id, content, commentId }:sendCommentPar) => get('/comment', { t, type, id, content, commentId, timestamp: Date.now() })

/* login 给评论点赞 */
export const likeComment = ({ id, commentId, t, type }:likeCommentPar) =>{
   return  get('/comment/like', { id, cid:commentId, t, type})
} 


export const getNewCommentAll = ({id, limit, offset ,before, type}:commentQuery) =>{
    switch (type) {
        case 0: return get('/comment/music', { id, limit, offset, before, timestamp: Date.now() })
        case 1: return get('/comment/mv', { id, limit, offset, before, timestamp: Date.now() })
        case 2: return get('/comment/playlist', { id, limit, offset, before, timestamp: Date.now() })
        case 3: return get('/comment/album', { id, limit, offset, before, timestamp: Date.now() })
        case 4: return get('/comment/dj', { id, limit, offset, before, timestamp: Date.now() })
        case 5: return get('/comment/video', { id, limit, offset, before, timestamp: Date.now() })
    }
}




/* 获取专辑评论 */
// export const getAlbumComment = 
// ({ id:number, limit:number, offset:number, before:number }) =>
//  get('/comment/album', { id, limit, offset, before, timestamp: Date.now() })



/* 
接口地址 : /comment/new

id : 资源 id, 如歌曲 id,mv id

type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型

0: 歌曲

1: mv

2: 歌单

3: 专辑

4: 电台

5: 视频

6: 动态
可选参数 :
pageNo:分页参数,第 N 页,默认为 1

pageSize:分页参数,每页多少条数据,默认 20

sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序

cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time


调用例子 : /comment/new?type=0&id=1407551413&sortType=3, /comment/new?type=0&id=1407551413&sortType=3&cursor=1602072870260&pageSize=20&pageNo=2

*/