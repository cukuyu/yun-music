export interface artistQuery{
    limit: number,
    area: string,
    offset: number,
    type: string,
    initial: string
}


export interface artistTags{
    area: {id:string,value:string}[],
    type: {id:string,value:string}[],
    initial: { id: string; value: string; }[],
}
