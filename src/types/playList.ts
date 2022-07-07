//歌单标签查询
export interface catQuery{
    limit:number,
    order:string,
    cat:string,
    offset:number
}

//高质量歌单标签查询
export interface highqualityQuery{
    limit:number,
    cat:string,
    before:number
}

export interface highInfo {
    coverImgUrl:string,
    name:string
    copywriter?:string
}


