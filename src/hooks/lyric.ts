/* 歌词提取 */
import { LyricBase, lyricLine } from '@/types/music'
import { ref, Ref } from 'vue'

export default function useLyric(str: string): Ref<LyricBase> {
    let lyricObj = ref<LyricBase>({
        lines: [{ time: 1, txt: '解析歌词失败' }],
        total: 1,
        curren: 0,
        errorLyric: true
    })
    if (typeof str === 'undefined') {
        return lyricObj
    }
    let arr = str.split('\n')
    const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
    try {
        lyricObj.value.lines.pop()
        arr.forEach(item => {
            if (item === '') return
            const obj: lyricLine = { txt: "", time: 0 }
            const time = item.match(regTime)
            const itemSplit = item.split(']')
            obj.txt = itemSplit[itemSplit.length-1].trim() === '' ? '' :  itemSplit[itemSplit.length-1].trim()
            obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
            if (obj.txt !== '') {
                lyricObj.value.lines.push(obj)
            }
        })
    } catch (error) {
        return lyricObj
    }
    lyricObj.value.errorLyric = false
    lyricObj.value.total = lyricObj.value.lines.length
    lyricObj.value.curren = 0
    return lyricObj
}

export const formatLyricTime = (time: string): number => {
    const regMin: RegExp = /.*:/
    const regSec: RegExp = /:.*\./
    const regMs: RegExp = /\./
    let min: number = 0, sec: number = 0, ms
    /* 歌词的格式有些有问题 */
    try {
        min = parseInt(time.match(regMin)![0].slice(0, 2))
        /* 这里有个BUG 歌词时间格式不对的话 */
        sec = parseInt(time.match(regSec)![0].slice(1, 3))
        ms = time.slice(time.match(regMs)!.index! + 1, time.match(regMs)!.index! + 3)
    } catch (error) {
        console.log('出错啦');
    }

    if (min !== 0) {
        sec += min * 60
    }
    return Number(sec + '.' + ms)
}


// export default class Lyric implements LyricBase{
//     public lines = [{ time: 1, txt: '解析歌词失败' }]
//     public total = 1
//     public curren = 0
//     public errorLyric = true

//     static formatLyricTime(time:string) { // 格式化歌词的时间 转换成 sss:ms
//         const regMin:RegExp = /.*:/
//         const regSec:RegExp = /:.*\./
//         const regMs:RegExp = /\./
//         let min:number=0, sec:number=0, ms
//         /* 歌词的格式有些有问题 */
//         try {
//             min = parseInt(time.match(regMin)![0].slice(0, 2))
//             /* 这里有个BUG 歌词时间格式不对的话 */
//             sec = parseInt(time.match(regSec)![0].slice(1, 3))
//             ms = time.slice(time.match(regMs)!.index! + 1, time.match(regMs)!.index! + 3)
//         } catch (error) {
//             console.log('出错啦');
//         }

//         if (min !== 0) {
//             sec += min * 60
//         }
//         return Number(sec + '.' + ms)
//     }
//     constructor(str:string) {
//         if (typeof str === 'undefined') {
//             return this
//         }
//         let arr = str.split('\n')
//         const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
//         try {
//             arr.forEach(item => {
//                 if (item === '') return
//                 const obj:lyricLine = {txt:"",time:0}
//                 const time = item.match(regTime)
//                 obj.txt = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
//                 obj.time = time ? Lyric.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
//                 if (obj.txt !== '') {
//                     this.lines.push(obj)
//                 }
//             })
//         } catch (error) {
//             return this
//         }
//         this.errorLyric = false
//         this.total = this.lines.length
//         this.curren = 0
//     }
// }