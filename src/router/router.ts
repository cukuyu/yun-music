import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'


const Layout = () => import('@/views/LayOut.vue')


const HomePage = () => import('@/views/home/HomePage.vue')
const PersonalRecom = () => import('@/views/home/homepageview/PersonalRecom.vue')
const PersonalCustom = () => import('@/views/home/homepageview/PersonalCustom.vue')
const PlayListDetail = () => import('@/views/playlist/PlayListDetail.vue')
const UserDetail = () => import('@/views/user/UserDetail.vue')
const PlayList = () => import('@/views/home/homepageview/PlayList.vue')
const RankList = () => import('@/views/home/homepageview/RankList.vue')
const ArtistList = () => import('@/views/home/homepageview/ArtistList.vue')
const NewMusic = () => import('@/views/home/homepageview/NewMusic.vue')
const ArtistDetail = () => import('@/views/artist/ArtistDetail.vue')
const AlbumDetail = () => import('@/views/album/AlbumDetail.vue')
const PersonalFM = () => import('@/views/user/PersonalFM.vue')

const VideoView = () => import('@/views/video/VideoView.vue')
const VideoDetail = () => import('@/views/video/VideoDetail.vue')
const VideoList = () => import('@/views/video/VideoView/VideoPage.vue')
const MVList = () => import('@/views/video/VideoView/MVPage.vue')
const AllMv = () => import('@/views/video/VideoView/AllMvPage.vue')
const TopMv = () => import('@/views/video/VideoView/TopMvPage.vue')


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/homepage',
    children: [
      {
        path: '/homepage',
        component: HomePage,
        redirect: '/personalrecom',
        children: [
          { path: '/personalrecom', component: PersonalRecom, meta: { title: "个性推荐" } },
          { path: '/personalcustom', component: PersonalCustom, meta: { title: "专属定制" } },
          { path: '/playlist', component: PlayList, meta: { title: "歌单分类" } },
          { path: '/ranklist', component: RankList, meta: { title: "排行榜" } },
          { path: '/artistlist', component: ArtistList, meta: { title: "歌手" } },
          { path: '/newmusic', component: NewMusic, meta: { title: "最新音乐" } },
        ]
      },

      {
        path: '/videoview',
        component: VideoView,
        redirect: '/video',
        children: [
          { path: '/video', component: VideoList },
          { path: '/mv', component: MVList },
        ]
      },
      { path: '/allmv/', component: AllMv },
      { path: '/topmv', component: TopMv },
      { path: '/playlistdetail/:id', props: true, component: PlayListDetail, meta: { title: "歌单" } },
      { path: '/userdetail/:uid', props: true, component: UserDetail, meta: { title: "用户详情" } },
      { path: '/artistdetail/:id', props: true, component: ArtistDetail, meta: { title: "歌手详情" } },
      { path: '/albumdetail/:id', props: true, component: AlbumDetail, meta: { title: "专辑详情" } },
      { path: '/videodetail/:type/:id', props: true, component: VideoDetail, meta: { title: "视频/MV详情" } },
      { path: '/personalfm/', component: PersonalFM, meta: { title: "私人FM" } },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})


router.beforeEach((to, from, next) => {
  next()
})

export default router
