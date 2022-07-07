import get from '@/service/get'


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