import { defineStore } from 'pinia'
import { getAccount, dologinOut, getUserPlayList, anonimousLogin } from '@/api/api_user'
import { getLikeIdList } from '@/api/api_music'
import { user } from '@/types/person'
import { playList, musicInfo,} from '@/types/music'
import { fa } from 'element-plus/lib/locale'


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
    //浏览器高度, drawerBar自适应
    clientHeight: 969,
    //windowSize是否是最大值
    windowIsMaximize: false,
    //登入状态
    login : window.sessionStorage.getItem('isLogin') !== 'true' ? false : true,
    //登录页面是否显示
    loginView: false,
    //账号信息
    account: {} as any,
    // 用户信息
    profile: {} as user,
    //游客
    anonimousUser: false,


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
    audioEffect: '',
    //fm next
    fmNext: false,



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

    async loginOut(){
      const res = await dologinOut()
      if(res.code!=200){

      }else{
        window.location.reload()
        this.setLogin(false)
        this.account = {}
        this.likeList = []
        this.myPlayList = []
        this.musicList = []
      }
    },

    async getAcount(){
      const res = await getAccount()
      if(res.code!=200){
        return false
      }
      else if(res.account!=null){
        if(res.account.anonimousUser){
          this.anonimousUser = true
          return 
        }
        this.anonimousUser = false
        this.setLogin(true)
        this.setLoginInfo(res.account,res.profile)
        this.getLikeList()
        this.getMyPlayList()
        return true
      } else {
        this.setLogin(false)
        anonimousLogin()
        return false
      }
    },
    async getLikeList(){
      if (!this.login) return
      getLikeIdList(this.profile.userId).then((res)=>{
        if(res.code!=200) return
        else if(res.ids instanceof Array){
          this.setLikeList({type:'get',data:res.ids})
        }
      })
    
    },

    async getMyPlayList(){
      
      if (!this.login) return
      getUserPlayList(this.profile.userId).then((res)=>{
        if(res.code!=200) return
        else {
          this.myPlayList = res.playlist
        }
      })
    },

    playMusic(payLoad:{list:musicInfo[],id:number}){
      this.playType = 'music'
      this.currentMusicId = payLoad.id
      this.currentIndex = payLoad.list.findIndex((item:any)=>item.id==payLoad.id)
      this.play=true
      this.musicList = payLoad.list 
    },
    playFmMusic(payLoad:{list:musicInfo[]}){
      this.playType = 'fm'
      this.currentMusicId = payLoad.list[0].id 
      this.currentIndex = 0
      this.musicList = payLoad.list 
    
    }
  },
})
