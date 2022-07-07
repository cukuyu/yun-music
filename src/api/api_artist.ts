import get from '@/service/get'
import {artistQuery} from '@/types/artistList'

export const ToGetArtistList = ({ limit, offset, type, area, initial }:artistQuery)=> 
                            get('/artist/list', { limit, offset, type, area, initial })

// 获取歌手详情
export const getArtistDetail = (id:string) => get('/artist/detail', { id })                        

//歌手描述
export const getIntro = (id:string) => get('/artist/desc', { id })

// 歌手热门50首歌
export const getArtistTop = (id:string) => get('/artist/top/song', { id })

// 歌手专辑
export const getArtistAlbum = (id:string, limit = 50, offset = 0) => get('/artist/album', { id, limit, offset })

// 歌手MV
export const getArtistMv = (id:string) => get('/artist/mv', { id })

// 相似歌手
export const getArtistSame = (id:string) => get('/simi/artist', { id })

//收藏的歌手
export const getSubArtists = () => get('/artist/sublist', { timestamp: Date.now() })

//收藏歌手
export const subArtist = (id:string, t:string) => get('/artist/sub', { id, t, timestamp: Date.now() })