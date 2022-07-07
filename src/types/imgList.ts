import {singer} from "@/types/person"

export interface imgList{
    id:number,
    picUrl?:string,
    playcount?:string|number,
    playCount?:string|number,
    coverImgUrl?:string,
    artist?:singer,
    name:string
}


export interface imgInfos{
    imgUrl:string,
    name:string,
    author:string    
}