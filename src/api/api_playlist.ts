import get from '@/service/get'
import {catQuery,highqualityQuery} from '@/types/playList'

// 个性推荐
export const getRecommend = () => get('/recommend/resource')


export const getPersonalized = (limit: number) => get('/personalized', { limit })


//歌单详情
export const getPlayListDetail = (id: string) => get('/playlist/detail', { id, timestamp: Date.now() })


// 歌单收藏者
export const getSuberList = ({ id, limit = 30, offset }: { id: number, limit: number, offset: number }) => get('/playlist/subscribers', { id, limit, offset })

// 收藏/取消收藏 歌单
export const setPlaylistSub = (id: string, t: number) => get('/playlist/subscribe', { id, t, timestamp: Date.now() })

//调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
export const getPlayListDynamic = (id: string) => get('/playlist/detail/dynamic', { id })

//获取歌单分类
export const getAllCat = () => get('/playlist/catlist')


//获取热门歌单分类
export const getHotCat = () => get('/playlist/hot')

//根据分类标签得到歌单列表
export const getPlayListByCat =  ({ limit, order, cat, offset }:catQuery) => get('/top/playlist', { limit, order, cat, offset })

//获取精品歌单标签
export const getHighqualityTags = () => get('/playlist/highquality/tags')

//获取精品歌单
export const getHighquality = ({limit, cat, before}:highqualityQuery) => get('/top/playlist/highquality', { limit, cat, before })

//获取排行榜
export const getToplist = () => get('/toplist')