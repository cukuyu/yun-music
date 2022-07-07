
function useFormat(){

    //将视频或歌曲的时长转换为 分:秒
    const timeFormat = (time:number)=>{
        if(!time) return "00:00"
        let minutes = Math.floor(time/60)
        let seconds = Math.floor(time%60)
        let minutes1:string  = minutes<=9?"0"+minutes: minutes +"" 
        let seconds1:string = seconds<=9?"0"+seconds: seconds +""
        return minutes1 +":"+seconds1
    }

    //转换视频或歌曲的点击数的单位      10000 --> 1万
    const transNumber = (num:number|string|undefined)=>{
        if(typeof num == 'undefined') return undefined
        if(typeof num == 'string') num = parseInt(num)
        let ans:string = num + ""
        if( num>=1e8)  ans = Math.floor(num/1e8) +"亿"
        else if( num>=1e4)  ans = Math.floor(num/1e4) +"万"
        return ans
    }

    //转换日期格式
    const dateFormat = (time:number,fmt:string='yyyy-MM-dd')=>{
        let date = new Date(time)
        let o :{ [key: string]: any } = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (const k in o){
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.
                replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k] ) : 
                (("00" + o[k]).substr(("" + o[k]).length)));
            }   
            return fmt;
    }
    return {
        timeFormat,
        transNumber,
        dateFormat
    }
}

export default useFormat
