

export interface mvUrl{
    id: number,
    md5: string,
    msg: string,
    url: string,
    promotionVo: null
    r: number
    size: number
    st: number
}

export interface videoUrl{
    id: string
    needPay: false
    payInfo: string|null
    r: number
    size: number
    url: string
    validityTime: number
}

export interface MVCreator{
    followed: boolean
    id: number
    img1v1Url: string
    name: string
}

export interface MVDetail {
    artistId: number
    artistName: string
    artists: MVCreator[]
    briefDesc: string
    commentCount: number
    commentThreadId: string
    cover: string
    coverId: number
    coverId_str: string
    desc: string
    duration: number
    id: number
    nType: number
    name: string
    playCount: number
    // price: null
    lastRank?: number
    score?: number
    publishTime: string
    shareCount: number
    subCount: number
}


export interface videoCreator {
    avatarUrl: "http://p1.music.126.net/qbuPbdFf1SVz9OOAz6wl8g==/109951165357910515.jpg"
    followed: false
    nickname: string
    userId: number
}


export interface videoDetail {
    avatarUrl: string
    commentCount: number
    coverUrl: string
    creator: videoCreator
    description: string
    durationms: number
    hasRelatedGameAd: false
    height: number
    playTime: number
    praisedCount: number
    publishTime: number
    shareCount: number
    subscribeCount: number
    title: "穿越火线怒海狙击"
    width: number
    videoGroup: videoTag[]
}




export interface videoLike{
    commentCount: number
    liked: boolean
    likedCount: number
    shareCount: number
}

export interface videoRelate{
    alg: string
    coverUrl: string
    creator: {userId: number, userName: string}[]
    durationms: number
    playTime: number
    title:string
    vid:string
}

export interface mvRelate {
    alg: string
    artistId: number
    artistName: string
    canDislike: true
    copywriter: string
    duration: number
    id: number
    name: string
    picUrl: string
    playCount: number
    subed: false
    trackNumberUpdateTime: number|string|null
    type: number
}


export interface videoQuery{
    area:string|number, 
    limit:number, 
    offset:number,
    order:number,
    type:number
}

export interface mvQuery{
    area:string, 
    limit:number, 
    offset:number,
}


export interface videoTag{
    id:number
    name:string
}

export interface videoInfo{
    commentCount: number
    coverUrl: string
    creator:{
        nickname: string
        userId: number
    }
    durationms: number  
    playTime: number
    vid: string
    title:string
}

