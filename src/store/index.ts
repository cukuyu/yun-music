import { defineStore } from 'pinia'
import { getAccount, loginOut, getUserPlayList } from '@/api/api_user'
import { getLikeIdList } from '@/api/api_music'
import { user } from '@/types/person'
import { playList, musicInfo} from '@/types/music'


export const useMainStore = defineStore({
  id: 'mian',
  state: () => ({
    musicList: [] as musicInfo[],
    // 是否在播放音乐
    play: false,
    // 当前音乐ID
    currentMusicId: 0,
    // 当前列表下标
    currentIndex: 0,
    // 播放列表抽屉状态
    drawer: false,
    // 播放唱片状态
    drawerView: false,
    // 播放音乐的总时长和当前时间
    currentMusicInfo: {
      totalTime: 0,
      currentTime: 0,
    },
    //浏览器高度
    clientHeight: 969,
    //登入状态
    login : window.sessionStorage.getItem('isLogin') !== 'true' ? false : true,
    //账号信息
    account: {} as any,
    // 用户信息
    profile: {} as user,
    // 历史播放列表
    historyList: [],
    // 喜欢音乐列表
    likeList:[] as number[],
    // 播放类型
    playType: 'music',
    //创建的歌单
    myPlayList: [] as playList[],
    //mv视图是否显示
    videoView: false,
    // 颜色主题
    pureColor: {backgroundColor:"#f5f5f5",color:"#ffffff"},
    //音效
    audioEffect: ''

  }),
  actions: {
    setLogin(login:boolean){
        this.login = login
        if(login) window.sessionStorage.setItem("isLogin","true")
        else  window.sessionStorage.removeItem("isLogin")
    },
    setLoginInfo(account:string, profile:user){
        this.account = account
        this.profile = profile
    },
    setLikeList(payLoad:{type:string,data:number[]|number}){
      if(payLoad.type==='get'){
        this.likeList = payLoad.data as number[]
      } else if(payLoad.type==='unshift'){
        this.likeList.unshift(payLoad.data as number)
      } else if(payLoad.type==='remove'){
        this.likeList.splice(this.likeList.indexOf(payLoad.data as number),1)
      }
    },

    async getAcount(){
      const res = await getAccount()
      console.log("getAcount123",res)
      console.log("login",this.login)
      if(res.code!=200) return
      else if(res.account!=null){
        this.setLogin(true)
        this.setLoginInfo(res.account,res.profile)
        console.log("getAcount123",res)
        this.getLikeList()
        this.getMyPlayList()
      } else {
        this.setLogin(false)
        // this.setLoginInfo({account: {} , profile: {} })
      }
    },
    async getLikeList(){
      if (!this.login) return
      const res = await getLikeIdList(this.profile.userId)
      if(res.code!=200) return
      else if(res.ids instanceof Array){
        this.setLikeList({type:'get',data:res.ids})
      }
    },

    async getMyPlayList(){
      
      if (!this.login) return
      const res = await getUserPlayList(this.profile.userId)
      if(res.code!=200) return
      else {
        this.myPlayList = res.playlist
      }
    },

    playMusic(payLoad:{list:musicInfo[],id:number}){
      this.musicList = payLoad.list
      this.currentMusicId = payLoad.id
      this.currentIndex = payLoad.list.findIndex((item:any)=>item.id==payLoad.id)
      this.playType = 'music'
      this.play=true
    }
  },
})
