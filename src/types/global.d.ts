export interface banner{
    imageUrl:string
}

export interface imgList{
    id:number,
    picUrl:string,
    playcount:string|number
    name:string
}



///////----------music------/////////////
export interface musicListInfo{
    id?: number|string,
    name: string,
    description: string,
    coverImgUrl: string,
    commentCount: number,
    creator:user,
    createTime: number,
    playCount: number
    trackCount: number
    tags: string[]
    [key: string]: any
}


export interface musicInfo{
    id: number,
    userId:number,
    name: string,
    alia: string[],
    ar: singer[],
    al: {picUrl:string},
    dt: number
    [key: string]: any
}

export interface playList extends musicListInfo{
    path:string,
    userId:number
}


///////----------person------/////////////
export interface user{
    userId: number,
    userType?: number,
    avatarUrl?:string,
    nickname:string,
    [key: string]: any
}


export interface singer{
    id?: number
    name: string
}