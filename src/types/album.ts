import {musicInfo} from '@/types/music'
import {artistInfo} from '@/types/person'

export interface topAlbumQuery{
    limit: number, 
    offset: number, 
    area: string, 
    type: string, 
    year: string, 
    month: string, 
}


export interface albumsInfo{
    album: album
    songs: musicInfo[]
}

export interface album{
    id:number
    name:string,
    artists: artistInfo[],
    publishTime: number
    picUrl:string
    description:string
}