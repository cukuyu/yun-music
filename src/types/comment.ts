import {user} from '@/types/person'

export interface commentInfo{
    id:number, 
    type:number,
    pageNo?:number,
    pageSize?:number,
    sortType?:number,
    cursor?:number
}


export interface commentQuery{
    id:number, 
    limit:number, 
    offset:number, 
    before?:number
    type:number
}

export interface beReplied{
    beRepliedCommentId:number,
    content:string,
    user:user,
}



export interface commentItem{
    user:user,
    content:string,
    beReplied: beReplied[],
    timeStr:string
    likedCount: number
    liked:boolean
    commentId:number
}

export interface likeCommentPar{
    id:number,
    commentId:number,
    t:number,
    type:number
}

export interface sendCommentPar{
    id:number,
    content:string,
    t:number,
    type:number,
    commentId:number,
}


