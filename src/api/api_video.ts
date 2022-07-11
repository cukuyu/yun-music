import get from '@/service/get'
import {videoQuery,mvQuery} from '@/types/video'

/* 视频/mv 详情 */
export const getVideoDetail = (type:string, id:string) => {
    if (type === 'vi') {
        return get('/video/detail', { id, timestamp: Date.now() })
    } else if (type === 'mv') {
        return get('/mv/detail', { mvid: id, timestamp: Date.now() })
    } else {
        return { code: 404 }
    }
}

/* 视频/mv url */
export const getVideoUrl = (type:string, id:string) => {
    if (type === 'vi') {
        return get('/video/url', { id })
    } else if (type === 'mv') {
        return get('/mv/url', { id })
    } else {
        return { code: 404 }
    }
}


/* 相关视频/mv */
export const getRelatedVideo = (type:string, id:string) => {
    if (type === 'vi') {
        return get('/related/allvideo', { id })
    } else if (type === 'mv') {
        return get('/personalized/mv')
    } else {
        return { code: 404 }
    }
}

/* 视频/mv点赞评论数据 */
export const getVideoLike = (type:string, id:string) => {
    if (type === 'vi') {
        return get('/video/detail/info', { vid: id, timestamp: Date.now() })
    } else if (type === 'mv') {
        return get('/mv/detail/info', { mvid: id, timestamp: Date.now() })
    } else {
        return { code: 404 }
    }
}

// 给资源点赞
export const likeVideo = ({ type, t = 1, id }:{type:number,t:number,id:number}) => get('/resource/like', { type, t, id,timestamp:Date.now()})

// 收藏资源
export const subVideo = ({ type, t, id }:{type:string,t:number,id:number}) => {
    if (type === 'vi') {
        return get('/video/sub', { t, id, timestamp: Date.now() })
    } else if (type === 'mv') {
        return get('/mv/sub', { mvid: id, t, timestamp: Date.now() })
    } else {
        return { code: 404 }
    }
}


/* 视频分类 */
export const getVideoAlltag = () => get('/video/group/list')

/* 视频热门分类 */
export const getVideoHotTag = () => get('/video/category/list')

/* 全部视频列表 */
export const getAllVideo = (offset:number) => get('/video/timeline/all', { offset })

/* 根据标签获取视频列表 */
export const getVideoByTag = (id:number, offset:number) => get('/video/group', { id, offset })

/* 获取全部MV area limit offset order type*/
export const getAllMv = ({ area, limit, offset, order ,type}:videoQuery) => get('/mv/all', { area, limit, offset, order,type })

/* 获取最新MV */
export const getNewMv = (area:string, limit:number) => get('/mv/first', { area, limit })

/* 获取网易出品Mv */
export const getNetEasyMv = (limit:number, offset:number) => get('/mv/exclusive/rcmd', { limit, offset })

/* mv 排行 area, limit,offset */
export const getTopMv = ({ area, limit, offset}:mvQuery) => get('/top/mv', { area, limit, offset })