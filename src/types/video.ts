

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
    id: number,
    md5: string,
    msg: string,
    url: string,
    promotionVo: null
    r: number
    size: number
    st: number
}

export interface videoCreator{
    followed: boolean
    id: number
    img1v1Url: string
    name: string
}

export interface videoDetail {
    artistId: number
    artistName: string
    artists: videoCreator[]
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
    publishTime: string
    shareCount: number
    subCount: number
}

export interface videoLike{
    commentCount: number
    liked: boolean
    likedCount: number
    shareCount: number
}

export interface videoRelate{
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