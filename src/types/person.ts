export interface user {
    userId: number,
    userType: number,
    avatarUrl: string,
    nickname: string,
    vipType: number,
    level: number,

    // [key: string]: any
}

export interface userDetail extends user {
    authority: number,
    authStatus: number,
    birthday: number,
    backgroundUrl: string,
    city: number,
    createTime: number,
    detailDescription: string,
    description: string,
    followeds: number,
    follows: number,
    gender: number,
    eventCount: number, //动态
    listenSongs: number,
    province: number,
    playlistBeSubscribedCount: number,
    playlistCount: number,
    signature:string,

}


export interface singer {
    id?: number,
    name: string
}

export interface artistInfo{
    name:string,
    id:number,
    briefDesc: string,
    cover: string,
    albumSize:number,
    musicSize: number,
    mvSize: number,
    transNames: string[]
    // videoCount:number
    // secondaryExpertIdentiy: Array(3)
    // 0: {expertIdentiyId: 10, expertIdentiyName: '演唱', expertIdentiyCount: 18}
    // 1: {expertIdentiyId: 11, expertIdentiyName: '作词', expertIdentiyCount: 18}
    // 2: {expertIdentiyId: 12, expertIdentiyName: '作曲', expertIdentiyCount: 18}
}

export interface artistIntro{
    ti:string
    txt:string[]
}

export interface artist {
    name:string,
    id:number,
    accountId: null|number,
    albumSize: number,
    briefDesc: string
    fansCount: number
    followed: boolean
    musicSize: number
    mvSize: null|number
    picUrl: string
    trans: ""
}