import {user,singer} from '@/types/person'
import {album} from '@/types/album'

export interface musicListInfo{
    id: number|string,
    name: string,
    description: string,
    coverImgUrl: string,
    commentCount: number,
    creator:user,
    createTime: number,
    playCount: number
    trackCount: number
    tags: string[]
    tracks?: musicInfo[],
    [key: string]: any
}


export interface musicInfo{
    id: number,
    userId?:number,
    name: string,
    alia: string[],
    ar: singer[],
    al: album,
    dt: number,
    mv: string|number,
    fee:number,
    [key: string]: any
}

export interface playList extends musicListInfo{
    path:string,
    userId:number
}


export interface lyricLine{
    time: number
    txt: string
}

//歌词
export interface LyricBase{
    lines: lyricLine[]
    total: number
    curren:number
    errorLyric:boolean
}


