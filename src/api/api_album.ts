import get from '@/service/get'
import {topAlbumQuery} from '@/types/album'


export const getTopAlbum = ({ limit, offset, area, type, year, month }:topAlbumQuery) => get('/top/album', { offset, limit, area, type, year, month })


/* 获取专辑内容 */
export const getAlbumDetail = (id:number|string) => get('/album', { id })