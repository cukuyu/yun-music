import get from '@/service/get'


export const getLikeIdList = (uid:number)=>{ return get('likelist',{uid,timestamp: Date.now()})}


export const getMusicUrl = (id:number) => get('/song/url', { id })



export const getLyric = (id:number) =>get('/lyric',{id})



export const  checkMusic = (id:number):{success:boolean}=> get('/check/music',{id}) as any

//新歌速递
//全部:0 华语:7 欧美:96 日本:8 韩国:16
export const getTopMusic = (type:string|number) => get('/top/song', { type })


// login 私人FM 
export const getPersonalFm = () => get('/personal_fm', { timestamp: Date.now() })